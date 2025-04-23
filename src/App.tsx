
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FitnessProvider } from "./contexts/FitnessContext";
import { AiAssistantProvider } from "./contexts/AiAssistantContext";

// Layout
import { AppLayout } from "./components/layout/AppLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AccountSetup from "./pages/AccountSetup";
import Fitness from "./pages/Fitness";
import FitnessCategory from "./pages/FitnessCategory";
import LevelDetail from "./pages/LevelDetail";
import Rewards from "./pages/Rewards";
import Consult from "./pages/Consult";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <FitnessProvider>
          <AiAssistantProvider>
            <Toaster />
            <Sonner position="top-center" />
            <BrowserRouter>
              <Routes>
                {/* Auth routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/account/setup" element={<AccountSetup />} />
                
                {/* App routes - protected by AppLayout */}
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/fitness" element={<Fitness />} />
                  <Route path="/fitness/:categoryId" element={<FitnessCategory />} />
                  <Route path="/fitness/:categoryId/level/:levelNum" element={<LevelDetail />} />
                  <Route path="/rewards" element={<Rewards />} />
                  <Route path="/consult" element={<Consult />} />
                  <Route path="/account" element={<Account />} />
                </Route>
                
                {/* Default route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AiAssistantProvider>
        </FitnessProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
