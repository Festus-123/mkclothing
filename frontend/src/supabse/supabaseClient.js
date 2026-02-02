// setting up the superbase client 
// import dotenv from "dotenv";
// dotenv.config();
import { createClient } from "@supabase/supabase-js";

// const supabase_Url = import.meta.env.SUPABASE_URL;
const supabase_Url = import.meta.env.VITE_SUPABASE_URL
const supabase_API = import.meta.env.VITE_SUPABASE_ANON_KEY

// console.log(import.meta.env.VITE_SUPABASE_URL)
// console.log(supabase_Url)

export const supabase = createClient(
    supabase_Url,
    supabase_API
)