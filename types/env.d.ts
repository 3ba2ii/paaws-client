declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_API_KEY: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_HOST_URL: string;
      NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID: string;
      NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET: string;
    }
  }
}

export {}
