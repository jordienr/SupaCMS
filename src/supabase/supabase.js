import { createClient } from "@supabase/supabase-js";
import config from '../../supacms.config'

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
