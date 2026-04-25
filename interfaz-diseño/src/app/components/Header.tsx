import { Search, ShoppingCart, Heart, User } from 'lucide-react';
import { Input } from './ui/input';
import { IconButton } from './design-system/IconButton';
import { Avatar, AvatarFallback } from './ui/avatar';

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/30 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--lime)] to-[var(--blue)] flex items-center justify-center">
            <span className="text-black font-bold">S</span>
          </div>
          <span className="font-semibold">Sequoia</span>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <Input
              variant="default"
              inputSize="md"
              placeholder="Search for products..."
              className="pl-12"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <IconButton variant="default" badge={3} badgeColor="var(--orange)">
            <Heart className="w-6 h-6" />
          </IconButton>

          <IconButton variant="default" badge={2} badgeColor="var(--lime)">
            <ShoppingCart className="w-6 h-6" />
          </IconButton>

          <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
            <Avatar size="md">
              <AvatarFallback>
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <div className="text-sm font-medium">Alex</div>
              <div className="text-xs text-gray-500">Premium</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
