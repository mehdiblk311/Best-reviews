import React, { useState, useEffect } from 'react';
import { StarRating } from './StarRating';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { FeedbackForm } from './FeedbackForm';
import { ReviewPrompt } from './ReviewPrompt';
import { ThankYouMessage } from './ThankYouMessage';
import { FloatingParticles } from './FloatingParticles';
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
    <div className="min-h-screen bg-background transition-colors duration-300 relative">
      <FloatingParticles />
      {/* Header */}
      <header className="flex justify-between items-center p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl sm:rounded-2xl blur-lg"></div>
            <div className="relative bg-card rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-lg border">
              <img 
                src={appleLogoUrl} 
                alt="Apple Logo" 
                className="h-8 w-8 sm:h-12 sm:w-12 object-contain transition-all duration-300"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
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
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 py-4 sm:py-8">
        <div className="w-full max-w-4xl">
          {appState === 'rating' && (
            <div className="relative">
              {/* Decorative background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/10 rounded-2xl sm:rounded-3xl blur-3xl"></div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-secondary/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-32 sm:h-32 bg-primary/10 rounded-full blur-2xl"></div>
              
              <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-border/50 p-6 sm:p-8 md:p-12 shadow-xl">
                <div className="text-center space-y-6 sm:space-y-8 animate-fade-in">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="w-12 h-0.5 sm:w-16 sm:h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
                    <h1 
                      className="text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight"
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                    >
                      {t.title}
                    </h1>
                    <p 
                      className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto px-2 sm:px-0"
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
              </div>
            </div>
          )}

          {appState === 'feedback' && (
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 via-warning/5 to-secondary/10 rounded-2xl sm:rounded-3xl blur-3xl"></div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 bg-warning/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-28 sm:h-28 bg-destructive/10 rounded-full blur-2xl"></div>
              
              <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-border/50 p-6 sm:p-8 md:p-12 shadow-xl">
                <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                  <button
                    onClick={handleReset}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-all duration-300 underline decoration-primary/50 hover:decoration-primary underline-offset-4 flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-primary/5"
                  >
                    ← {language === 'en' ? 'Back to rating' : language === 'fr' ? 'Retour à la notation' : 'العودة إلى التقييم'}
                  </button>
                  <FeedbackForm
                    rating={rating}
                    language={language}
                    onSubmit={handleFeedbackSubmit}
                  />
                </div>
              </div>
            </div>
          )}

          {appState === 'review' && (
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-star-4/5 to-star-5/10 rounded-2xl sm:rounded-3xl blur-3xl"></div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-star-5/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-32 sm:h-32 bg-success/10 rounded-full blur-2xl"></div>
              
              <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-border/50 p-6 sm:p-8 md:p-12 shadow-xl">
                <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                  <button
                    onClick={handleReset}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-all duration-300 underline decoration-primary/50 hover:decoration-primary underline-offset-4 flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-primary/5"
                  >
                    ← {language === 'en' ? 'Back to rating' : language === 'fr' ? 'Retour à la notation' : 'العودة إلى التقييم'}
                  </button>
                  <ReviewPrompt
                    rating={rating}
                    language={language}
                    googleReviewUrl={GOOGLE_REVIEW_URL}
                  />
                </div>
              </div>
            </div>
          )}

          {appState === 'thankyou' && (
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-success/10 rounded-2xl sm:rounded-3xl blur-3xl"></div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 bg-secondary/10 rounded-full blur-2xl animate-pulse-slow"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-28 sm:h-28 bg-primary/10 rounded-full blur-2xl animate-pulse-slow"></div>
              
              <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-border/50 p-6 sm:p-8 md:p-12 shadow-xl">
                <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                  <ThankYouMessage
                    language={language}
                    isPositive={rating >= 4}
                  />
                  <button
                    onClick={handleReset}
                    className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-all duration-300 underline decoration-primary/50 hover:decoration-primary underline-offset-4 font-medium px-4 sm:px-6 py-2 rounded-full hover:bg-primary/10"
                  >
                    {language === 'en' ? 'Leave another review' : language === 'fr' ? 'Laisser un autre avis' : 'ترك تقييم آخر'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 sm:p-6 text-xs sm:text-sm text-muted-foreground">
        <p dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {language === 'en' ? 'Thank you for taking the time to share your feedback.' : 
           language === 'fr' ? 'Merci de prendre le temps de partager vos commentaires.' : 
           'شكراً لك على أخذ الوقت لمشاركة ملاحظاتك.'}
        </p>
      </footer>
    </div>
  );
};