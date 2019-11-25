/*!
 * Dida.js v1.0.1
 * Github: https://github.com/zhw2590582/dida.js#readme
 * (c) 2017-2019 Harvey Zack
 * Released under the MIT License.
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).Dida=e()}(this,function(){"use strict";var o=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t};var i=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var t=function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t};var e,u=(function(t,e){t.exports=function(){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var r=Object.prototype.toString,c=function(t){if(void 0===t)return"undefined";if(null===t)return"null";var e=n(t);if("boolean"===e)return"boolean";if("string"===e)return"string";if("number"===e)return"number";if("symbol"===e)return"symbol";if("function"===e)return function(t){return"GeneratorFunction"===o(t)}(t)?"generatorfunction":"function";if(function(t){return Array.isArray?Array.isArray(t):t instanceof Array}(t))return"array";if(function(t){if(t.constructor&&"function"==typeof t.constructor.isBuffer)return t.constructor.isBuffer(t);return!1}(t))return"buffer";if(function(t){try{if("number"==typeof t.length&&"function"==typeof t.callee)return!0}catch(t){if(-1!==t.message.indexOf("callee"))return!0}return!1}(t))return"arguments";if(function(t){return t instanceof Date||"function"==typeof t.toDateString&&"function"==typeof t.getDate&&"function"==typeof t.setDate}(t))return"date";if(function(t){return t instanceof Error||"string"==typeof t.message&&t.constructor&&"number"==typeof t.constructor.stackTraceLimit}(t))return"error";if(function(t){return t instanceof RegExp||"string"==typeof t.flags&&"boolean"==typeof t.ignoreCase&&"boolean"==typeof t.multiline&&"boolean"==typeof t.global}(t))return"regexp";switch(o(t)){case"Symbol":return"symbol";case"Promise":return"promise";case"WeakMap":return"weakmap";case"WeakSet":return"weakset";case"Map":return"map";case"Set":return"set";case"Int8Array":return"int8array";case"Uint8Array":return"uint8array";case"Uint8ClampedArray":return"uint8clampedarray";case"Int16Array":return"int16array";case"Uint16Array":return"uint16array";case"Int32Array":return"int32array";case"Uint32Array":return"uint32array";case"Float32Array":return"float32array";case"Float64Array":return"float64array"}if(function(t){return"function"==typeof t.throw&&"function"==typeof t.return&&"function"==typeof t.next}(t))return"generator";switch(e=r.call(t)){case"[object Object]":return"object";case"[object Map Iterator]":return"mapiterator";case"[object Set Iterator]":return"setiterator";case"[object String Iterator]":return"stringiterator";case"[object Array Iterator]":return"arrayiterator"}return e.slice(8,-1).toLowerCase().replace(/\s/g,"")};function o(t){return t.constructor?t.constructor.name:null}function s(t,e){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:["option"];return f(t,e,n),h(t,e,n),function(i,u,a){var t=c(u),e=c(i);if("object"===t){if("object"!==e)throw new Error("[Type Error]: '".concat(a.join("."),"' require 'object' type, but got '").concat(e,"'"));Object.keys(u).forEach(function(t){var e=i[t],n=u[t],r=a.slice();r.push(t),f(e,n,r),h(e,n,r),s(e,n,r)})}if("array"===t){if("array"!==e)throw new Error("[Type Error]: '".concat(a.join("."),"' require 'array' type, but got '").concat(e,"'"));i.forEach(function(t,e){var n=i[e],r=u[e]||u[0],o=a.slice();o.push(e),f(n,r,o),h(n,r,o),s(n,r,o)})}}(t,e,n),t}function f(t,e,n){if("string"===c(e)){var r=c(t);if(!(-1<e.indexOf("|")?e.split("|").map(function(t){return t.toLowerCase().trim()}).filter(Boolean).some(function(t){return r===t}):e.toLowerCase().trim()===r))throw new Error("[Type Error]: '".concat(n.join("."),"' require '").concat(e,"' type, but got '").concat(r,"'"))}}function h(t,e,n){if("function"===c(e)){var r=e(t,c(t),n);if(!0!==r){var o=c(r);throw"string"===o?new Error(r):"error"===o?r:new Error("[Validator Error]: The scheme for '".concat(n.join("."),"' validator require return true, but got '").concat(r,"'"))}}}return s.kindOf=c,s}()}(e={exports:{}},e.exports),e.exports);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function c(t,e,n){return Math.max(Math.min(t,Math.max(e,n)),Math.min(e,n))}function s(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];var r=e[0].constructor;return e.reduce(function(t,e){var n=new r((0|t.byteLength)+(0|e.byteLength));return n.set(t,0),n.set(e,0|t.byteLength),n},new r)}return function(){function r(){var e=this,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if(i(this,r),this.option=u(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach(function(t){o(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},r.option,{},t),r.scheme),this.option.volume=c(this.option.volume,0,1),this.option.chunk=c(this.option.chunk,0,1/0),this.option.maxTimeDiff=c(this.option.maxTimeDiff,0,1/0),this.option.autoEndTime=c(this.option.autoEndTime,0,1/0),this.context=new(window.AudioContext||window.webkitAudioContext),this.gainNode=this.context.createGain(),this.gainNode.gain.value=this.option.volume,this.source=null,this.decoding=!1,this.playing=!1,this.loadLength=0,this.loadByteSize=0,this.audioDuration=0,this.pcmLength=0,this.timestamps=[],this.audiobuffers=[],this.timestampTmp=[],this.decodeErrorBuffer=new Uint8Array,this.decodeWaitingBuffer=new Uint8Array,this.autoEndDebounce=function(r,o,i){var u;return function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];clearTimeout(u),u=setTimeout(function(){u=null,r.apply(i,e)},o)}}(function(){e.end()},this.option.autoEndTime),this.option.touchResume&&"suspended"===this.context.state&&"ontouchstart"in window){var n=function t(){e.context.resume(),e.volume=1,document.body.removeEventListener("touchstart",t,!1),document.body.removeEventListener("click",t,!1)};document.body.addEventListener("touchstart",n,!1),document.body.addEventListener("click",n,!1)}}return t(r,[{key:"destroy",value:function(){return this.stop(),this.context=null,this.gainNode=null,this.source=null,this.timestamps=[],this.audiobuffers=[],this.timestampTmp=[],this.decodeErrorBuffer=new Uint8Array,this.decodeWaitingBuffer=new Uint8Array,this.option.onDestroy(),this}},{key:"load",value:function(t,e){var n=this;if(this.decoding=!0,this.loadLength+=1,this.loadByteSize+=t.byteLength,this.option.onLoad(t,e),this.decodeWaitingBuffer.byteLength>=this.option.chunk){this.timestamps.push(this.timestampTmp[0]),this.timestampTmp=[];var r=s(this.decodeErrorBuffer,this.decodeWaitingBuffer).buffer;this.decodeWaitingBuffer=new Uint8Array,this.context.decodeAudioData(r,function(t){n.audioDuration+=t.duration,n.pcmLength+=t.length,n.audiobuffers.push(t),n.decodeErrorBuffer=new Uint8Array,n.option.onDecodeDone(t)},function(t){n.decodeErrorBuffer=s(n.decodeErrorBuffer,n.decodeWaitingBuffer),n.option.onDecodeError(t)})}else this.timestampTmp.push(e),this.decodeWaitingBuffer=s(this.decodeWaitingBuffer,t);return this.option.autoEnd&&this.autoEndDebounce(),this}},{key:"end",value:function(){var e=this;if(this.decodeWaitingBuffer.length){this.timestamps.push(this.timestampTmp[0]),this.timestampTmp=[];var t=this.decodeWaitingBuffer.buffer;this.decodeWaitingBuffer=new Uint8Array,this.decodeErrorBuffer=new Uint8Array,this.context.decodeAudioData(t,function(t){e.audioDuration+=t.duration,e.pcmLength+=t.length,e.audiobuffers.push(t),e.decoding=!1,e.option.onEnd()})}return this}},{key:"findIndex",value:function(r){var o=this;return this.timestamps.findIndex(function(t,e){var n=o.audiobuffers[e];return n&&t+1e3*n.duration>=r})}},{key:"play",value:function(t){var o=this,e=0<arguments.length&&void 0!==t?t:0;this.source&&(this.source.onended=null,this.source.stop(),this.source=null),e+=1,this.playing=!0;var i=this.findIndex(e),u=this.timestamps[i],n=this.audiobuffers[i];if(void 0===u||void 0===n)return this.stop(i,u);var r=Math.max(0,(e-u)/1e3);return this.source=this.context.createBufferSource(),this.source.connect(this.gainNode),this.gainNode.connect(this.context.destination),this.source.buffer=n,this.option.onPlay(n,e,r),this.source.start(0,r),this.source.onended=function(){var t=o.timestamps[i+1],e=o.audiobuffers[i+1];if(void 0!==t&&void 0!==e){var n=o.option.onNext(t),r=o.findIndex(n);!o.option.cache&&0<r&&(o.option.onFreeMemory({total:o.pcmLength,pcm:o.audiobuffers.reduce(function(t,e){return t+=e.length},0),index:r}),o.audiobuffers.splice(0,r),o.timestamps.splice(0,r)),o.play(n)}else o.stop(i,u)},this}},{key:"stop",value:function(t,e){return this.playing=!1,this.source&&(this.source.onended=null,this.source.stop(),this.source=null),this.option.onStop(t,e),this}},{key:"volume",get:function(){return this.gainNode.gain.value},set:function(t){this.gainNode.gain.value=c(t,0,1),this.option.onVolumeChange(t)}},{key:"duration",get:function(){return this.audiobuffers.reduce(function(t,e){return t+=e.duration},0)}}],[{key:"option",get:function(){return{volume:.7,cache:!0,chunk:65536,maxTimeDiff:200,autoEnd:!0,autoEndTime:5e3,touchResume:!0,onNext:function(t){return t},onLoad:function(){return null},onStop:function(){return null},onPlay:function(){return null},onEnd:function(){return null},onDestroy:function(){return null},onDecodeDone:function(){return null},onDecodeError:function(){return null},onVolumeChange:function(){return null},onFreeMemory:function(){return null}}}},{key:"scheme",get:function(){return{volume:"number",cache:"boolean",chunk:"number",maxTimeDiff:"number",autoEnd:"boolean",autoEndTime:"number",touchResume:"boolean",onNext:"function",onLoad:"function",onStop:"function",onPlay:"function",onEnd:"function",onDestroy:"function",onDecodeDone:"function",onDecodeError:"function",onVolumeChange:"function",onFreeMemory:"function"}}}]),r}()});
