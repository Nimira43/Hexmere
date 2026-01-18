// declarations.d.ts
declare module 'three/addons/misc/Timer.js' {
  export default class Timer {
    start(): void;
    stop(): void;
    update(): void;
    getElapsed(): number;
    getDelta(): number;
  }
}
