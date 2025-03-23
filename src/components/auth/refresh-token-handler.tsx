// components/auth/refresh-token-handler.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import api from "@/lib/api";

export default function RefreshTokenHandler() {
  const { data: session, update } = useSession();

  useEffect(() => {
    if (session?.refreshToken) {
      const interval = setInterval(async () => {
        try {
          const response = await api.post("/auth/refresh-token", {
            refreshToken: session.refreshToken,
          });

          await update({
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
          });
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      }, 10 * 60 * 1000); // Refresh every 10 minutes

      return () => clearInterval(interval);
    }
  }, [session?.refreshToken, update]);

  return null;
}