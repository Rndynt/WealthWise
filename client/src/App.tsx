import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./lib/auth";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Accounts from "@/pages/accounts";
import Categories from "@/pages/categories";
import Transactions from "@/pages/transactions";
import Budget from "@/pages/budget";
import Reports from "@/pages/reports";
import Debts from "@/pages/debts";
import Collaboration from "@/pages/collaboration";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";

function AppRouter() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentWorkspace, setCurrentWorkspace] = useState<any>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        open={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentWorkspace={currentWorkspace}
        onWorkspaceChange={setCurrentWorkspace}
      />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-6">
          <Switch>
            <Route path="/" component={() => <Dashboard workspaceId={currentWorkspace?.id} />} />
            <Route path="/dashboard" component={() => <Dashboard workspaceId={currentWorkspace?.id} />} />
            <Route path="/accounts" component={() => <Accounts workspaceId={currentWorkspace?.id} />} />
            <Route path="/categories" component={() => <Categories workspaceId={currentWorkspace?.id} />} />
            <Route path="/transactions" component={() => <Transactions workspaceId={currentWorkspace?.id} />} />
            <Route path="/budget" component={() => <Budget workspaceId={currentWorkspace?.id} />} />
            <Route path="/reports" component={() => <Reports workspaceId={currentWorkspace?.id} />} />
            <Route path="/debts" component={() => <Debts workspaceId={currentWorkspace?.id} />} />
            <Route path="/collaboration" component={() => <Collaboration workspaceId={currentWorkspace?.id} />} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppRouter />
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
