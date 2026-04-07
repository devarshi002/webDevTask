import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hlluvxjbfvrwbjqsqano.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_Q-3IIbikdS47zx1knIxvfQ_-XC1dNXS'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)