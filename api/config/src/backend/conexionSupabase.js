import { createClient } from "https://esm.sh/@supabase/supabase-js"; 
import bcrypt from "https://esm.sh/bcryptjs";

// Conectar con Supabase
const SUPABASE_URL = "https://wszzuzsuciipkjggymmi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzenp1enN1Y2lpcGtqZ2d5bW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2OTUzODcsImV4cCI6MjA1OTI3MTM4N30.k0_WUwnfXqBon3h9Tpr6D1VEo1SNV1J0qJ2lE6jPUSU";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
