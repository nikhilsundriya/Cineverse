import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * ================================
   * SERVER VARIABLES
   * ================================
   */
  server: {
    PROTECTED_PATHS: z.string().default(""),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  },

  /**
   * ================================
   * CLIENT VARIABLES
   * ================================
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),

    NEXT_PUBLIC_TMDB_ACCESS_TOKEN: z.string().min(1),
    NEXT_PUBLIC_AVATAR_PROVIDER_URL: z.string().url(),
    NEXT_PUBLIC_CAPTCHA_SITE_KEY: z.string().min(1),
  },

  /**
   * ================================
   * RUNTIME ENV (VERY IMPORTANT)
   * ================================
   */
  runtimeEnv: {
    // server
    PROTECTED_PATHS: process.env.PROTECTED_PATHS,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,

    // client
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

    NEXT_PUBLIC_TMDB_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN,
    NEXT_PUBLIC_AVATAR_PROVIDER_URL:
      process.env.NEXT_PUBLIC_AVATAR_PROVIDER_URL,
    NEXT_PUBLIC_CAPTCHA_SITE_KEY:
      process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY,
  },

  /**
   * ================================
   * IMPORTANT FOR NEXT 16
   * ================================
   */
  skipValidation: false,
  emptyStringAsUndefined: true,
});