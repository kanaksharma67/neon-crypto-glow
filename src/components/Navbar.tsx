
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, History, Users, RefreshCw, User, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: History, label: 'History', path: '/history' },
    { icon: Users, label: 'Split Bill', path: '/split-bill' },
    { icon: RefreshCw, label: 'Convert', path: '/convert' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 px-4 pb-2 md:top-0 md:bottom-auto md:pb-0 md:pt-2">
      <div className="glass-card mx-auto max-w-5xl px-2 py-3 md:py-2 flex items-center justify-between">
        <motion.div 
          className="flex-none hidden md:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" className="text-xl font-display font-bold flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-neon">
              <span className="text-white">Σ</span>
            </div>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CryptoFlow
            </span>
          </Link>
        </motion.div>
        
        <div className="flex items-center justify-around md:justify-center gap-1 sm:gap-3 w-full md:w-auto">
          {navItems.map((item) => (
            <TooltipProvider key={item.path} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to={item.path}
                    className="group p-2 sm:p-3 rounded-xl flex flex-col items-center justify-center text-xs"
                  >
                    <motion.div
                      className={`relative mb-1 rounded-lg p-2 ${
                        isActive(item.path) 
                          ? 'text-white bg-primary shadow-neon' 
                          : 'text-crypto-text-secondary hover:text-white'
                      }`}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <item.icon size={20} />
                      {isActive(item.path) && (
                        <motion.div
                          className="absolute inset-0 bg-primary rounded-lg -z-10"
                          layoutId="navbar-indicator"
                          transition={{ duration: 0.3, type: "spring" }}
                        />
                      )}
                    </motion.div>
                    <span className={isActive(item.path) ? "text-white" : ""}>
                      {item.label}
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        
        <DropdownMenu>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <motion.button 
                    className="p-2 rounded-lg text-crypto-text-secondary hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Settings className="h-5 w-5" />
                  </motion.button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">
                Settings
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <DropdownMenuContent align="end" className="glass-card border-white/10 w-56">
            <DropdownMenuItem className="flex items-center gap-2 focus:bg-primary/20">
              <span className="flex-1">Theme</span>
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-1 rounded-md bg-muted"
              >
                {isDark ? <Moon size={16} /> : <Sun size={16} />}
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 focus:bg-primary/20">
              <LogOut size={16} className="text-crypto-error" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
