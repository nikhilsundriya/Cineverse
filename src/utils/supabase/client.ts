import { createBrowserClient } from "@supabase/ssr";
import { env } from "../env";
import { Database } from "./types";

console.log("BROWSER ENV:", {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

export function createClient() {
  return createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}