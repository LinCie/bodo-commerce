declare namespace NodeJS {
  interface ProcessEnv {
    FRONTEND_URL: string
    NODE_ENV: "development" | "production" | "staging" | "test"
    PORT?: string
  }
}
