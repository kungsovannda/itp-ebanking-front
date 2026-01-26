import { useEffect, useState } from "react";

type Session = {
  accessToken?: string;
  subject?: string;
  name?: string;
  email?: string;
};

export default function useSession() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/auth/is-authenticated", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data === "null" || data === null) {
            setSession(null);
            setAuthenticated(false);
          } else {
            setSession(data);
            setAuthenticated(true);
          }
        } else {
          setSession(null);
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
        setSession(null);
        setAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []); // Empty dependency array - only run once on mount

  return { session, isLoading, authenticated };
}
