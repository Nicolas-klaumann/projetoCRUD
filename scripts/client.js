// Dados necessarios para realizar a conexão com o supabase
const SUPABASE_URL = 'https://jehgafzazfusghbsktep.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplaGdhZnphemZ1c2doYnNrdGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU3NzEzNTIsImV4cCI6MTk5MTM0NzM1Mn0.XNzTm6XsVKOkKbnV0EHL4M_q_D-Bvvbd1snJs0_Yl-c';

// Conexão com o supabase
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
