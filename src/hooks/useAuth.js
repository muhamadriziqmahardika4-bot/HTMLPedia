// Hook sesi Supabase — dipakai AuthGate & owner mode.
import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, OWNER_EMAIL } from "../lib/supabase.js";

export function useAuth() {
  const [session, setSession] = useState(undefined); // undefined = masih memuat

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setSession(null);
      return;
    }
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSession(data?.session ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next ?? null);
    });
    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe();
    };
  }, []);

  const user = session?.user ?? null;
  const isOwner = Boolean(user?.email && OWNER_EMAIL && user.email.toLowerCase() === OWNER_EMAIL);

  return { session, user, isOwner, loading: session === undefined };
}
