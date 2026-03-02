"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SessionManager() {
  useEffect(() => {
    const existingTabs = sessionStorage.getItem("openTabs");

    // If no tab exists → browser was fully closed
    if (existingTabs == null) {
      signOut({ redirect: true });
    }
    const tabs = Number(existingTabs || "0");
    sessionStorage.setItem("openTabs", String(tabs + 1));

    const handleUnload = () => {
      const currentTabs = Number(localStorage.getItem("openTabs") || "1");
      const newCount = currentTabs - 1;

      if (newCount <= 0) {
        localStorage.removeItem("openTabs");
      } else {
        localStorage.setItem("openTabs", String(newCount));
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      handleUnload();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return null;
}