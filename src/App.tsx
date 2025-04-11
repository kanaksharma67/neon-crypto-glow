
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import History from "./pages/History";
import MakePayment from "./pages/MakePayment";
import Convert from "./pages/Convert";
import SplitBill from "./pages/SplitBill";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
 
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Dashboard />} />

          <Route path="/home" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/make-payment" element={<MakePayment />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/split-bill" element={<SplitBill />} />
          <Route path="/profile" element={<NotFound />} />
          <Route path="/receive" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  //   </TooltipProvider>
  // </QueryClientProvider>
);

export default App;
