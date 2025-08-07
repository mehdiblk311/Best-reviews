import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, CheckCircle } from 'lucide-react';

interface FeedbackFormProps {
  rating: number;
  language: 'en' | 'fr' | 'ar';
  onSubmit: (comment: string) => void;
}

const translations = {
  en: {
    title: "Help us improve",
    placeholder: "Please tell us what went wrong and how we can make your experience better...",
    submit: "Send Feedback",
    submitting: "Sending..."
  },
  fr: {
    title: "Aidez-nous à nous améliorer",
    placeholder: "Veuillez nous dire ce qui n'a pas fonctionné et comment nous pouvons améliorer votre expérience...",
    submit: "Envoyer les commentaires",
    submitting: "Envoi en cours..."
  },
  ar: {
    title: "ساعدنا في التحسين",
    placeholder: "يرجى إخبارنا بما حدث خطأ وكيف يمكننا تحسين تجربتك...",
    submit: "إرسال التعليقات",
    submitting: "جاري الإرسال..."
  }
};

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  rating,
  language,
  onSubmit
}) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    
    try {
      await onSubmit(comment);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md animate-slide-up">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold text-foreground">
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t.placeholder}
            className="min-h-[120px] resize-none"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            required
          />
          <Button
            type="submit"
            className="w-full gap-2"
            disabled={!comment.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                {t.submitting}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {t.submit}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};