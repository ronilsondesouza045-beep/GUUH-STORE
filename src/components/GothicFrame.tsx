import { ReactNode, Key } from 'react';
import { cn } from '../lib/utils';

interface GothicFrameProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: 'gold' | 'blood' | 'simple';
  key?: Key;
}

export default function GothicFrame({ children, className, contentClassName, variant = 'gold' }: GothicFrameProps) {
  return (
    <div className={cn(
      "relative p-0.5 overflow-hidden transition-all duration-500",
      variant === 'gold' && "bg-gradient-to-br from-gold/50 via-gold/10 to-gold/50",
      variant === 'blood' && "bg-gradient-to-br from-blood/50 via-blood/10 to-blood/50",
      variant === 'simple' && "border border-white/10 bg-card/50",
      className
    )}>
      {/* Corner ornaments for gold/blood variants */}
      {variant !== 'simple' && (
        <>
          <div className={cn("absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 z-20", variant === 'gold' ? 'border-gold' : 'border-blood')} />
          <div className={cn("absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 z-20", variant === 'gold' ? 'border-gold' : 'border-blood')} />
          <div className={cn("absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 z-20", variant === 'gold' ? 'border-gold' : 'border-blood')} />
          <div className={cn("absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 z-20", variant === 'gold' ? 'border-gold' : 'border-blood')} />
        </>
      )}
      
      <div className={cn("bg-dark/95 h-full w-full relative z-10", contentClassName || "p-4")}>
        {children}
      </div>
    </div>
  );
}
