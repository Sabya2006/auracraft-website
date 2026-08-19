const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

let supabase = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('⚡ Supabase Client initialized from environment variables');
} else {
  console.warn('[Database Notice] SUPABASE_URL or SUPABASE_KEY environment variables not set.');
}

const getSupabaseClient = () => supabase;

module.exports = {
  getSupabaseClient,
  supabase
};
