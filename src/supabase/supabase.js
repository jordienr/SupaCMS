import { createClient } from "@supabase/supabase-js";
import config from '../../supacms.config'

export const supa = createClient(config.supabaseUrl, config.supabaseAnonKey);
