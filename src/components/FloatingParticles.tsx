import React from 'react';

export const FloatingParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating particles for ambiance */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-floating" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary/30 rounded-full animate-floating" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-star-4/25 rounded-full animate-floating" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-star-5/20 rounded-full animate-floating" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-accent/30 rounded-full animate-floating" style={{ animationDelay: '4s' }}></div>
    </div>
  );
};