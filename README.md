# Dida.js

> An audio stream blender for the browser.

## Install

Install with `npm`

```bash
$ npm install dida.js
```

Or install with `yarn`

```bash
$ yarn add dida.js
```

```js
import Dida from 'dida.js';
```

Or umd builds are also available

```html
<script src="path/to/dida.js"></script>
```

Will expose the global variable to `window.Dida`.

## Usage

```js
const dida = new Dida({
  // Default volume
  volume: 0.7,

  // Whether to cache the played audio data
  cache: true,

  // Audio segment size
  chunk: 64 * 1024,

  // Maximum time difference between audio and video synchronization
  maxTimeDiff: 200,

  // Whether to automatically terminate the audio stream
  autoEnd: true,

  // Automatically terminate the audio stream
  autoEndTime: 5000,

  // Activate audio after trying to touch the screen on the mobile
  touchResume: true,

  // Time stamp calibration can be returned when preparing to play the next audio segment
  onNext: t => t,

  // When loading into an audio stream
  onLoad: () => null,

  // Stop playing
  onStop: () => null,

  // When starting to play
  onPlay: () => null,

  // When terminating loading
  onEnd: () => null,

  // When destroyed
  onDestroy: () => null,

  // When audio segmentation decoding is completed
  onDecodeDone: () => null,

  // When decoding is wrong
  onDecodeError: () => null,

  // When the volume changes
  onVolumeChange: () => null,

  // When freeing memory
  onFreeMemory: () => null,
});
```

## Api

```js
// getter and setter of the volume from 0 to 1;
dida.volume;

// Load a Uint8Array and a corresponding timestamp
dida.load(uint8, timestamp);

// Manually terminate loading
dida.end();

// Play by the specified timestamp
dida.play(timestamp);

// Stop play
dida.stop();
```

## License

MIT © [Harvey Zack](https://sleepy.im/)
