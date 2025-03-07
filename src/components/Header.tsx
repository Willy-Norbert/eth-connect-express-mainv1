import React, { useState } from "react";
import { Wallet } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  const [titleHovered, setTitleHovered] = useState(false);
  
  return (
    <header className="w-full py-6 animate-slide-down">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-rwanda-green rounded-lg p-2 shadow-md hover:scale-110 transition-transform duration-200">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <h1 
            className={`text-2xl font-semibold tracking-tight transition-all duration-300 ${
              titleHovered ? "text-rwanda-blue scale-105" : ""
            }`}
            onMouseEnter={() => setTitleHovered(true)}
            onMouseLeave={() => setTitleHovered(false)}
          >
            ETH Connect
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
