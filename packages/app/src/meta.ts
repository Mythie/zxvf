/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_EMULATORS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
