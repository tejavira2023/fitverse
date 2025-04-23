
import { Link, useLocation } from "react-router-dom";
import { Home, Award, User, Activity, MessageSquare } from "lucide-react";
import { useAiAssistant } from "@/contexts/AiAssistantContext";

export const BottomNav = () => {
  const location = useLocation();
  const { toggleAssistant } = useAiAssistant();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t shadow-lg pb-safe">
      <div className="container mx-auto p-2">
        <div className="grid grid-cols-5 gap-1">
          <NavItem 
            to="/" 
            icon={<Home size={24} />}
            label="Home"
            active={isActive("/")}
          />
          <NavItem 
            to="/fitness" 
            icon={<Activity size={24} />}
            label="Fitness"
            active={isActive("/fitness")}
          />
          <NavItem 
            to="/rewards" 
            icon={<Award size={24} />}
            label="Rewards"
            active={isActive("/rewards")}
          />
          <NavItem 
            to="/consult" 
            icon={<MessageSquare size={24} />}
            label="Consult"
            active={isActive("/consult")}
          />
          <NavItem 
            to="/account" 
            icon={<User size={24} />}
            label="Account"
            active={isActive("/account")}
          />
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active, onClick }) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
        active 
          ? "text-primary bg-primary/10 scale-110" 
          : "text-gray-500 hover:text-primary hover:bg-primary/5"
      }`}
      onClick={onClick}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};
