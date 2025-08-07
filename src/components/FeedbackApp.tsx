import React, { useState, useEffect } from 'react';
import { StarRating } from './StarRating';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { FeedbackForm } from './FeedbackForm';
import { ReviewPrompt } from './ReviewPrompt';
import { ThankYouMessage } from './ThankYouMessage';
import appleLogoUrl from '@/assets/apple-logo.png';

type Language = 'en' | 'fr' | 'ar';
type AppState = 'rating' | 'feedback' | 'review' | 'thankyou';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdb3lxEa2QdG5ve13vM3uij-utYWdUu8gi50PxId1ite-twjg/formResponse';
const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJ8Y_Ze2xtpw0RzNsj4JY_suc';

const translations = {
  en: {
    title: "How was your experience?",
    subtitle: "Your feedback helps us serve you better"
  },
  fr: {
    title: "Comment était votre expérience?",
    subtitle: "Vos commentaires nous aident à mieux vous servir"
  },
  ar: {
    title: "كيف كانت تجربتك؟",
    subtitle: "تعليقاتك تساعدنا في تقديم خدمة أفضل"
  }
};

export const FeedbackApp: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [appState, setAppState] = useState<AppState>('rating');

  // Load saved preferences
  useEffect(() => {
    const savedLanguage = localStorage.getItem('feedback-language') as Language;
    const savedTheme = localStorage.getItem('feedback-theme');
    
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('feedback-language', newLanguage);
    
    // Update document direction for Arabic
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };

  const handleThemeToggle = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('feedback-theme', newTheme ? 'dark' : 'light');
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    
    // Determine next state based on rating
    if (newRating <= 3) {
      setAppState('feedback');
    } else {
      setAppState('review');
    }
  };

  const handleFeedbackSubmit = async (comment: string) => {
    try {
      // Submit to Google Forms
      const formData = new FormData();
      formData.append('entry.781153381', rating.toString());
      formData.append('entry.1124057666', comment);

      // Use a hidden iframe to submit the form
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.name = 'hidden_iframe';
      document.body.appendChild(iframe);

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_FORM_URL;
      form.target = 'hidden_iframe';
      
      formData.forEach((value, key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value.toString();
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);

      setAppState('thankyou');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setAppState('thankyou'); // Still show thank you even if submission fails
    }
  };

  const handleReset = () => {
    setRating(0);
    setAppState('rating');
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <img 
            src={appleLogoUrl} 
            alt="Apple Logo" 
            className="h-12 w-12 object-contain"
          />
        </div>
        <div className="flex items-center gap-3">
          <LanguageToggle 
            currentLanguage={language}
            onLanguageChange={handleLanguageChange}
          />
          <ThemeToggle 
            isDark={isDarkMode}
            onToggle={handleThemeToggle}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="w-full max-w-4xl">
          {appState === 'rating' && (
            <div className="text-center space-y-8 animate-fade-in">
              <div>
                <h1 
                  className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  {t.title}
                </h1>
                <p 
                  className="text-lg text-muted-foreground"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  {t.subtitle}
                </p>
              </div>
              <StarRating
                rating={rating}
                onRatingChange={handleRatingChange}
                language={language}
              />
            </div>
          )}

          {appState === 'feedback' && (
            <div className="flex flex-col items-center space-y-6">
              <button
                onClick={handleReset}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
              >
                ← {language === 'en' ? 'Back to rating' : language === 'fr' ? 'Retour à la notation' : 'العودة إلى التقييم'}
              </button>
              <FeedbackForm
                rating={rating}
                language={language}
                onSubmit={handleFeedbackSubmit}
              />
            </div>
          )}

          {appState === 'review' && (
            <div className="flex flex-col items-center space-y-6">
              <button
                onClick={handleReset}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
              >
                ← {language === 'en' ? 'Back to rating' : language === 'fr' ? 'Retour à la notation' : 'العودة إلى التقييم'}
              </button>
              <ReviewPrompt
                rating={rating}
                language={language}
                googleReviewUrl={GOOGLE_REVIEW_URL}
              />
            </div>
          )}

          {appState === 'thankyou' && (
            <div className="flex flex-col items-center space-y-6">
              <ThankYouMessage
                language={language}
                isPositive={rating >= 4}
              />
              <button
                onClick={handleReset}
                className="text-sm text-primary hover:text-primary/80 transition-colors underline font-medium"
              >
                {language === 'en' ? 'Leave another review' : language === 'fr' ? 'Laisser un autre avis' : 'ترك تقييم آخر'}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 text-sm text-muted-foreground">
        <p dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {language === 'en' ? 'Thank you for taking the time to share your feedback.' : 
           language === 'fr' ? 'Merci de prendre le temps de partager vos commentaires.' : 
           'شكراً لك على أخذ الوقت لمشاركة ملاحظاتك.'}
        </p>
      </footer>
    </div>
  );
};