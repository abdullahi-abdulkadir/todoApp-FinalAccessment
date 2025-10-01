// import { createClient } from "@supabase/supabase-js";
// import type { Database } from "@/integrations/supabase/types"; // keep your types

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
//   auth: {
//     persistSession: true,
//     autoRefreshToken: true,
//   },
// });


import { createClient } from "@supabase/supabase-js";
// import type { Database } from "./types";
import type { Database } from "@/integrations/supabase/types";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string;

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
