import { createClient } from "@supabase/supabase-js";

const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNTk1NDE4OSwiZXhwIjoxOTUxNTMwMTg5fQ.51SbJOXQgmDQT7Y71fcbuDkZ5l_5sgoSzRedYHSajLE";

const url = "https://gitzljhscwbaduvntpjr.supabase.co";

export const supabase = createClient(url, anonKey);
