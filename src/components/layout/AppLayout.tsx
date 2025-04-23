
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AiAssistant } from "@/components/AiAssistant";
import { BottomNav } from "@/components/layout/BottomNav";

export const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <main className="flex-1 container mx-auto p-4 pb-24">
        <Outlet />
      </main>
      <BottomNav />
      <AiAssistant />
    </div>
  );
};
