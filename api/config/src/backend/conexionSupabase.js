import { createClient } from "https://esm.sh/@supabase/supabase-js"; 

// Conectar con Supabase
const SUPABASE_URL = "https://kputtxpmbmvdnbfptusv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwdXR0eHBtYm12ZG5iZnB0dXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5OTYxMzQsImV4cCI6MjA3OTU3MjEzNH0.4xQNPnAIVn7GxRt0gwyrNnGiOd8XvgVzrESLya72LIw";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
