import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  currentLanguage: 'en' | 'fr' | 'ar';
  onLanguageChange: (language: 'en' | 'fr' | 'ar') => void;
}

const languages = [
  { code: 'en' as const, label: 'English', flag: '🇺🇸' },
  { code: 'fr' as const, label: 'Français', flag: '🇫🇷' },
  { code: 'ar' as const, label: 'العربية', flag: '🇸🇦' }
];

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 min-w-[120px] justify-start"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">
          {languages.find(lang => lang.code === currentLanguage)?.flag}{' '}
          {languages.find(lang => lang.code === currentLanguage)?.label}
        </span>
      </Button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-card border rounded-lg shadow-lg z-50 animate-fade-in">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg",
                currentLanguage === language.code && "bg-muted"
              )}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium">{language.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};