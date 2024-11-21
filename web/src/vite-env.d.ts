/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOCKET_URL: string
  readonly VITE_API_ORIGIN: string
  // add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}