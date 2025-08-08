import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart, Star } from 'lucide-react';

interface ThankYouMessageProps {
  language: 'en' | 'fr' | 'ar';
  isPositive: boolean;
  onGoogleReview?: () => void;
}

const translations = {
  en: {
    positive: {
      title: "Thank you so much!",
      message: "Your positive feedback means the world to us. We're thrilled that you had a great experience!"
    },
    negative: {
      title: "Thank you for your feedback",
      message: "We're truly sorry your experience wasn't perfect, and we'll work to make it better. Your input helps us improve."
    }
  },
  fr: {
    positive: {
      title: "Merci beaucoup!",
      message: "Vos commentaires positifs nous font énormément plaisir. Nous sommes ravis que vous ayez eu une excellente expérience!"
    },
    negative: {
      title: "Merci pour vos commentaires",
      message: "Nous sommes vraiment désolés que votre expérience n'ait pas été parfaite, et nous allons travailler pour l'améliorer. Vos commentaires nous aident à nous améliorer."
    }
  },
  ar: {
    positive: {
      title: "شكراً جزيلاً لك!",
      message: "تعليقاتك الإيجابية تعني لنا الكثير. نحن سعداء جداً لأنك حصلت على تجربة رائعة!"
    },
    negative: {
      title: "شكراً لك على تعليقاتك",
      message: "نحن آسفون حقاً لأن تجربتك لم تكن مثالية، وسنعمل على تحسينها. ملاحظاتك تساعدنا على التحسن."
    }
  }
};

export const ThankYouMessage: React.FC<ThankYouMessageProps> = ({ 
  language, 
  isPositive,
  onGoogleReview 
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
            className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            {t.message}
          </p>
        </CardContent>
      </Card>
      
      {isPositive && onGoogleReview && (
        <Button
          onClick={onGoogleReview}
          className="w-full max-w-md bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          size="lg"
        >
          <Star className="w-5 h-5 mr-2" />
          {language === 'en' ? 'Leave a Google Review' : 
           language === 'fr' ? 'Laisser un avis Google' : 
           'ترك تقييم على جوجل'}
        </Button>
      )}
    </div>
  );
};