import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const CircularMenu = () => {
  const menuItems = [
    { icon: 'Newspaper', label: 'Новости', href: '#news' },
    { icon: 'Video', label: 'Медиа', href: '#media' },
    { icon: 'Info', label: 'Об игре', href: '#about' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <TooltipProvider>
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-50">
        {menuItems.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <button
                onClick={() => scrollToSection(item.href)}
                className="w-14 h-14 rounded-full bg-game-purple hover:bg-game-purple/80 flex items-center justify-center text-white shadow-lg animate-float transition-all hover:scale-110"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Icon name={item.icon as any} size={24} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="pixel-font text-xs">{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};
