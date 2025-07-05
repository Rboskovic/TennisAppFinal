import { Settings } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  return (
    <div className="flex justify-between items-start mb-4">
      <div className="flex flex-col">
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%23E5E7EB'/%3E%3Cpath d='M30 15c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15zm0 22.5c-4.142 0-7.5-3.358-7.5-7.5s3.358-7.5 7.5-7.5 7.5 3.358 7.5 7.5-3.358 7.5-7.5 7.5z' fill='%236B7280'/%3E%3C/svg%3E"
          alt="Profile"
          className="w-12 h-12 rounded-full mb-3 shadow-lg"
        />
        <div className="space-y-0">
          <div className="text-lg font-medium opacity-90 tracking-wide">Hello, 👋</div>
          <div className="text-4xl font-black leading-tight text-white tracking-tight">{user.name}</div>
        </div>
      </div>
      <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
        <Settings className="w-5 h-5 text-white" />
      </div>
    </div>
  );
}
