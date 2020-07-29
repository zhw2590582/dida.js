import validator from 'option-validator';

function clamp(num, a, b) {
  return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
}

function mergeBuffer(...buffers) {
  const Cons = buffers[0].constructor;
  return buffers.reduce((pre, val) => {
    const merge = new Cons((pre.byteLength | 0) + (val.byteLength | 0));
    merge.set(pre, 0);
    merge.set(val, pre.byteLength | 0);
    return merge;
  }, new Cons());
}

function debounce(func, wait, context) {
  let timeout;
  return function fn(...args) {
    const later = function later() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default class Dida {
  constructor(option = {}) {
    this.option = validator(
      {
        ...Dida.option,
        ...option,
      },
      Dida.scheme,
    );

    this.option.volume = clamp(this.option.volume, 0, 1);
    this.option.chunk = clamp(this.option.chunk, 0, Infinity);
    this.option.maxTimeDiff = clamp(this.option.maxTimeDiff, 0, Infinity);
    this.option.autoEndTime = clamp(this.option.autoEndTime, 0, Infinity);

    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.gainNode = this.context.createGain();
    this.gainNode.gain.value = this.option.volume;
    this.source = null;

    this.decoding = false;
    this.playing = false;
    this.loadLength = 0;
    this.loadByteSize = 0;
    this.audioDuration = 0;
    this.pcmLength = 0;

    this.timestamps = [];
    this.audiobuffers = [];
    this.timestampTmp = [];
    this.adjustNextTimestamp = 0;
    this.decodeErrorBuffer = new Uint8Array();
    this.decodeWaitingBuffer = new Uint8Array();

    this.autoEndDebounce = debounce(() => {
      this.end();
    }, this.option.autoEndTime);

    if (this.option.touchResume) {
      if (this.context.state === 'suspended' && 'ontouchstart' in window) {
        const unlock = () => {
          this.context.resume();
          this.volume = 1;
          document.body.removeEventListener('touchstart', unlock, false);
          document.body.removeEventListener('click', unlock, false);
        };
        document.body.addEventListener('touchstart', unlock, false);
        document.body.addEventListener('click', unlock, false);
      }
    }
  }

  static get option() {
    return {
      volume: 0.7,
      cache: true,
      chunk: 64 * 1024,
      maxTimeDiff: 200,
      autoEnd: true,
      autoEndTime: 5000,
      touchResume: true,
      onNext: (t) => t,
      onLoad: () => null,
      onStop: () => null,
      onPlay: () => null,
      onEnd: () => null,
      onDestroy: () => null,
      onDecodeDone: () => null,
      onDecodeError: () => null,
      onVolumeChange: () => null,
      onFreeMemory: () => null,
    };
  }

  static get scheme() {
    return {
      volume: 'number',
      cache: 'boolean',
      chunk: 'number',
      maxTimeDiff: 'number',
      autoEnd: 'boolean',
      autoEndTime: 'number',
      touchResume: 'boolean',
      onNext: 'function',
      onLoad: 'function',
      onStop: 'function',
      onPlay: 'function',
      onEnd: 'function',
      onDestroy: 'function',
      onDecodeDone: 'function',
      onDecodeError: 'function',
      onVolumeChange: 'function',
      onFreeMemory: 'function',
    };
  }

  get volume() {
    return this.gainNode.gain.value;
  }

  set volume(value) {
    this.gainNode.gain.value = clamp(value, 0, 1);
    this.option.onVolumeChange(value);
  }

  get duration() {
    return this.audiobuffers.reduce((result, item) => {
      result += item.duration;
      return result;
    }, 0);
  }

  get currentTime() {
    return this.adjustNextTimestamp;
  }

  destroy() {
    this.stop();
    this.context = null;
    this.gainNode = null;
    this.source = null;
    this.timestamps = [];
    this.audiobuffers = [];
    this.timestampTmp = [];
    this.decodeErrorBuffer = new Uint8Array();
    this.decodeWaitingBuffer = new Uint8Array();
    this.option.onDestroy();
    return this;
  }

  load(uint8, timestamp) {
    this.decoding = true;
    this.loadLength += 1;
    this.loadByteSize += uint8.byteLength;
    this.option.onLoad(uint8, timestamp);
    if (this.decodeWaitingBuffer.byteLength >= this.option.chunk) {
      this.timestamps.push(this.timestampTmp[0]);
      this.timestampTmp = [];
      const { buffer } = mergeBuffer(this.decodeErrorBuffer, this.decodeWaitingBuffer);
      this.decodeWaitingBuffer = new Uint8Array();
      this.context.decodeAudioData(
        buffer,
        (audiobuffer) => {
          this.audioDuration += audiobuffer.duration;
          this.pcmLength += audiobuffer.length;
          this.audiobuffers.push(audiobuffer);
          this.decodeErrorBuffer = new Uint8Array();
          this.option.onDecodeDone(audiobuffer);
        },
        (error) => {
          this.decodeErrorBuffer = mergeBuffer(this.decodeErrorBuffer, this.decodeWaitingBuffer);
          this.option.onDecodeError(error);
        },
      );
    } else {
      this.timestampTmp.push(timestamp);
      this.decodeWaitingBuffer = mergeBuffer(this.decodeWaitingBuffer, uint8);
    }
    if (this.option.autoEnd) {
      this.autoEndDebounce();
    }
    return this;
  }

  end() {
    if (this.decodeWaitingBuffer.length) {
      this.timestamps.push(this.timestampTmp[0]);
      this.timestampTmp = [];
      const { buffer } = this.decodeWaitingBuffer;
      this.decodeWaitingBuffer = new Uint8Array();
      this.decodeErrorBuffer = new Uint8Array();
      this.context.decodeAudioData(buffer, (audiobuffer) => {
        this.audioDuration += audiobuffer.duration;
        this.pcmLength += audiobuffer.length;
        this.audiobuffers.push(audiobuffer);
        this.decoding = false;
        this.option.onEnd();
      });
    }
    return this;
  }

  findIndex(startTime) {
    return this.timestamps.findIndex((timestamp, i) => {
      const audiobuffer = this.audiobuffers[i];
      return audiobuffer && timestamp + audiobuffer.duration * 1000 >= startTime;
    });
  }

  play(startTime = 0) {
    if (this.source) {
      this.source.onended = null;
      this.source.stop();
      this.source = null;
    }

    startTime += 1;
    this.playing = true;
    const index = this.findIndex(startTime);
    const timestamp = this.timestamps[index];
    const audiobuffer = this.audiobuffers[index];
    if (timestamp === undefined || audiobuffer === undefined) return this.stop(index, timestamp);
    const offset = Math.max(0, (startTime - timestamp) / 1000);
    this.source = this.context.createBufferSource();
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.source.buffer = audiobuffer;
    this.option.onPlay(audiobuffer, startTime, offset);
    this.source.start(0, offset);
    this.source.onended = () => {
      const nextTimestamp = this.timestamps[index + 1];
      const nextAudiobuffer = this.audiobuffers[index + 1];
      if (nextTimestamp !== undefined && nextAudiobuffer !== undefined) {
        this.adjustNextTimestamp = this.option.onNext(nextTimestamp);
        const adjustIndex = this.findIndex(this.adjustNextTimestamp);
        if (!this.option.cache && adjustIndex > 0) {
          this.option.onFreeMemory({
            total: this.pcmLength,
            pcm: this.audiobuffers.reduce((result, item) => {
              result += item.length;
              return result;
            }, 0),
            index: adjustIndex,
          });
          this.audiobuffers.splice(0, adjustIndex);
          this.timestamps.splice(0, adjustIndex);
        }
        this.play(this.adjustNextTimestamp);
      } else {
        this.stop(index, timestamp);
      }
    };
    return this;
  }

  stop(index, timestamp) {
    this.playing = false;
    if (this.source) {
      this.source.onended = null;
      this.source.stop();
      this.source = null;
    }
    this.option.onStop(index, timestamp);
    return this;
  }
}
