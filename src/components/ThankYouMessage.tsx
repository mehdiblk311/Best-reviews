import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart, Star } from 'lucide-react';

interface ThankYouMessageProps {
  language: 'en' | 'fr' | 'ar';
  isPositive: boolean;
  showRedirectMessage?: boolean;
}

const translations = {
  en: {
    positive: {
      title: "Thank you so much!",
      message: "Your positive feedback means the world to us. We're thrilled that you had a great experience!",
      redirectMessage: "Redirecting you to Google Reviews in a moment..."
    },
    negative: {
      title: "Thank you for your feedback",
      message: "We're truly sorry your experience wasn't perfect, and we'll work to make it better. Your input helps us improve.",
      redirectMessage: undefined
    }
  },
  fr: {
    positive: {
      title: "Merci beaucoup!",
      message: "Vos commentaires positifs nous font énormément plaisir. Nous sommes ravis que vous ayez eu une excellente expérience!",
      redirectMessage: "Redirection vers Google Avis dans un instant..."
    },
    negative: {
      title: "Merci pour vos commentaires",
      message: "Nous sommes vraiment désolés que votre expérience n'ait pas été parfaite, et nous allons travailler pour l'améliorer. Vos commentaires nous aident à nous améliorer.",
      redirectMessage: undefined
    }
  },
  ar: {
    positive: {
      title: "شكراً جزيلاً لك!",
      message: "تعليقاتك الإيجابية تعني لنا الكثير. نحن سعداء جداً لأنك حصلت على تجربة رائعة!",
      redirectMessage: "سيتم تحويلك إلى تقييمات جوجل خلال لحظات..."
    },
    negative: {
      title: "شكراً لك على تعليقاتك",
      message: "نحن آسفون حقاً لأن تجربتك لم تكن مثالية، وسنعمل على تحسينها. ملاحظاتك تساعدنا على التحسن.",
      redirectMessage: undefined
    }
  }
};

export const ThankYouMessage: React.FC<ThankYouMessageProps> = ({ 
  language, 
  isPositive,
  showRedirectMessage = false 
}) => {
  const t = translations[language][isPositive ? 'positive' : 'negative'];

  return (
    <div className="w-full flex flex-col items-center space-y-4 sm:space-y-6">
      <Card className="w-full max-w-md animate-bounce-in">
        <CardContent className="pt-6 pb-6 sm:pt-8 sm:pb-8 text-center px-4 sm:px-6">
          <div className="flex justify-center mb-3 sm:mb-4">
            {isPositive ? (
              <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-success fill-current animate-pulse-slow" />
            ) : (
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-primary animate-pulse-slow" />
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground leading-tight">
            {t.title}
          </h2>
          <p 
            className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2 mb-4"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            {t.message}
          </p>
          
          {showRedirectMessage && isPositive && t.redirectMessage && (
            <div className="flex items-center justify-center space-x-2 text-primary animate-pulse">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <p className="text-sm ml-2" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {t.redirectMessage}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};