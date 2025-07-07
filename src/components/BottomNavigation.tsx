import { Home, Users, Trophy, BarChart, MessageCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'players', label: 'Igrači', icon: Users, path: '/igraci' },
    { id: 'tournaments', label: 'Lige/Turniri', icon: Trophy, path: '/turniri' },
    { id: 'ranking', label: 'Ranking', icon: BarChart, path: '/ranking' },
    { id: 'messages', label: 'Poruke', icon: MessageCircle, path: '/poruke' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex-1 py-3 px-1 flex flex-col items-center justify-center transition-colors ${
                isActive 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={{
                minHeight: 'max(75px, calc(env(safe-area-inset-bottom) + 65px))'
              }}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className={`text-xs font-medium leading-tight text-center ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
