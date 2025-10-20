

import { createClient } from '@supabase/supabase-js'
import type { Database } from "@/integrations/supabase/types";

// CORRECT: Read the key variables from process.env that NEXT.JS exposes.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Pass the key and URL directly to the client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);