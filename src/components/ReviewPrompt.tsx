import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Copy, CheckCircle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewPromptProps {
  rating: number;
  language: 'en' | 'fr' | 'ar';
  googleReviewUrl: string;
}

const translations = {
  en: {
    title: "Thank you for the great rating!",
    subtitle: "Would you mind sharing your experience on Google?",
    reviewButton: "Leave a Google Review",
    copyButton: "Click to Copy",
    copied: "Copied!",
    suggestions: "Suggested review comments:",
    comments: [
      "Absolutely loved the service and food!",
      "One of the best experiences I've had lately.",
      "The team was very friendly and professional.", 
      "Highly recommend this place.",
      "Great value and fast service."
    ]
  },
  fr: {
    title: "Merci pour cette excellente note!",
    subtitle: "Pourriez-vous partager votre expérience sur Google?",
    reviewButton: "Laisser un avis Google",
    copyButton: "Cliquer pour copier",
    copied: "Copié!",
    suggestions: "Commentaires suggérés:",
    comments: [
      "Service et nourriture incroyables !",
      "Une excellente expérience du début à la fin.",
      "Personnel très professionnel et accueillant.",
      "Je recommande vivement cet endroit.",
      "Rapide, propre, et très bon."
    ]
  },
  ar: {
    title: "شكراً لك على هذا التقييم الرائع!",
    subtitle: "هل يمكنك مشاركة تجربتك على جوجل؟",
    reviewButton: "اترك مراجعة على جوجل",
    copyButton: "انقر للنسخ",
    copied: "تم النسخ!",
    suggestions: "تعليقات مقترحة:",
    comments: [
      "الخدمة والطعام كانا رائعين!",
      "من أفضل التجارب التي مررت بها.",
      "الموظفون كانوا محترفين وودودين.",
      "أنصح بهذا المكان بشدة.",
      "سعر مناسب وخدمة سريعة."
    ]
  }
};

export const ReviewPrompt: React.FC<ReviewPromptProps> = ({
  rating,
  language,
  googleReviewUrl
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showEmbed, setShowEmbed] = useState(false);
  const t = translations[language];

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleGoogleReview = () => {
    setShowEmbed(true);
  };

  return (
    <Card className="w-full max-w-2xl animate-slide-up">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-6 h-6 mx-1",
                i < rating ? "text-star-5 fill-current" : "text-muted-foreground"
              )}
            />
          ))}
        </div>
        <CardTitle className="text-xl font-bold text-foreground">
          {t.title}
        </CardTitle>
        <p className="text-muted-foreground">
          {t.subtitle}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <Button
            onClick={handleGoogleReview}
            variant="gradient"
            size="lg"
            className="gap-2 text-lg px-8 py-3"
          >
            <ExternalLink className="w-5 h-5" />
            {t.reviewButton}
          </Button>
        </div>

        {showEmbed && (
          <div className="w-full animate-fade-in">
            <iframe
              src={googleReviewUrl}
              width="100%"
              height="600"
              frameBorder="0"
              className="rounded-lg border"
              title="Google Review"
            />
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-4 text-center text-foreground">
            {t.suggestions}
          </h3>
          <div className="space-y-3">
            {t.comments.map((comment, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                <div className="flex-1">
                  <p className="text-sm text-foreground leading-relaxed">
                    "{comment}"
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(comment, index)}
                  className={cn(
                    "gap-2 min-w-[100px] transition-all duration-200",
                    copiedIndex === index && "bg-success text-white border-success"
                  )}
                >
                  {copiedIndex === index ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      {t.copied}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {t.copyButton}
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};