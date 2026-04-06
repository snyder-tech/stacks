/// <reference types="vite/client" />

declare module 'md4x/build/md4x.wasm?module' {
  const wasmModule: WebAssembly.Module;
  export default wasmModule;
}
