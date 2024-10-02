import React, { createContext, useContext, useRef } from 'react';
import { gsap } from 'gsap';

export const GsapTimelineContext = createContext<gsap.core.Timeline | null>(null);

export const GsapTimelineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const timelineRef = useRef<gsap.core.Timeline>(gsap.timeline());

  return (
    <GsapTimelineContext.Provider value={timelineRef.current}>
      {children}
    </GsapTimelineContext.Provider>
  );
};

export const useGsapTimeline = () => {
  const context = useContext(GsapTimelineContext);
  if (!context) {
    throw new Error('useGsapTimeline must be used within a GsapTimelineProvider');
  }
  return context;
};