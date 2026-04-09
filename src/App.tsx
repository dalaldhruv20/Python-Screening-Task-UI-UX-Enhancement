import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { UserProvider } from "@/contexts/UserContext";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Workshops from "./pages/Workshops";
import WorkshopDetails from "./pages/WorkshopDetails";
import ProposeWorkshop from "./pages/ProposeWorkshop";
import CreateWorkshop from "./pages/CreateWorkshop";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import ProposedWorkshops from "./pages/ProposedWorkshops";
import Comments from "./pages/Comments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/home" element={<Index />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/workshops/:id" element={<WorkshopDetails />} />
              <Route path="/propose" element={<ProposeWorkshop />} />
              <Route path="/create-workshop" element={<CreateWorkshop />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/proposed" element={<ProposedWorkshops />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
