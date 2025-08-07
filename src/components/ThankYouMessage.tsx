import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Heart } from 'lucide-react';

interface ThankYouMessageProps {
  language: 'en' | 'fr' | 'ar';
  isPositive: boolean;
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
  isPositive
}) => {
  const t = translations[language][isPositive ? 'positive' : 'negative'];

  return (
    <Card className="w-full max-w-md animate-bounce-in">
      <CardContent className="pt-8 pb-8 text-center">
        <div className="flex justify-center mb-4">
          {isPositive ? (
            <Heart className="w-16 h-16 text-success fill-current animate-pulse-slow" />
          ) : (
            <CheckCircle className="w-16 h-16 text-primary animate-pulse-slow" />
          )}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          {t.title}
        </h2>
        <p 
          className="text-muted-foreground leading-relaxed"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {t.message}
        </p>
      </CardContent>
    </Card>
  );
};