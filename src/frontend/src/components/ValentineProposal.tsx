import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Sparkles } from 'lucide-react';
import { valentineContent } from '@/content/valentineCopy';
import { useEvasiveButton } from '@/hooks/useEvasiveButton';
import InteractiveLoveLetter from '@/components/InteractiveLoveLetter';
import FloatingThoughts from '@/components/FloatingThoughts';
import LastChanceNoModal from '@/components/LastChanceNoModal';

export default function ValentineProposal() {
  const [answered, setAnswered] = useState(false);
  const [showNoModal, setShowNoModal] = useState(false);
  const [visibleProgressiveNotes, setVisibleProgressiveNotes] = useState<number>(0);
  const evasionArenaRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  const { position, scale, evade } = useEvasiveButton({
    containerRef: evasionArenaRef,
    buttonRef: noButtonRef,
    obstacleRefs: [yesButtonRef],
    enabled: !answered
  });

  // Progressive reveal of notes after Yes
  useEffect(() => {
    if (answered && visibleProgressiveNotes < valentineContent.progressiveNotes.length) {
      const timer = setTimeout(() => {
        setVisibleProgressiveNotes(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [answered, visibleProgressiveNotes]);

  const handleYes = () => {
    setAnswered(true);
  };

  const handleNoHover = () => {
    evade();
  };

  const handleNoTouch = (e: React.TouchEvent) => {
    e.preventDefault();
    evade();
  };

  const handleNoPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') {
      e.preventDefault();
      evade();
    }
  };

  const handleNoClick = () => {
    if (!answered) {
      setShowNoModal(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start p-4 overflow-y-auto">
      {/* Hearts background pattern */}
      <div className="fixed inset-0 hearts-background pointer-events-none z-0" />
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial opacity-40 pointer-events-none z-0" />
      
      <div className="relative z-10 w-full max-w-4xl py-8 space-y-6">
        {!answered ? (
          <>
            {/* Main proposal card */}
            <Card className="backdrop-blur-sm bg-card/95 shadow-2xl border-2 border-primary/20">
              <CardHeader className="text-center space-y-4 pb-4">
                {/* Illustration */}
                <div className="flex justify-center mb-4">
                  <img
                    src="/assets/generated/valentine-envelope-illustration.dim_1024x1024.png"
                    alt="Valentine illustration"
                    className="w-48 h-48 md:w-64 md:h-64 object-contain animate-float"
                  />
                </div>

                <CardTitle className="text-3xl md:text-5xl font-bold text-primary flex items-center justify-center gap-3 flex-wrap">
                  <Heart className="w-8 h-8 md:w-10 md:h-10 fill-primary animate-pulse" />
                  <span>{valentineContent.proposalQuestion}</span>
                  <Heart className="w-8 h-8 md:w-10 md:h-10 fill-primary animate-pulse" />
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Buttons container - responsive layout */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-8">
                  {/* Yes button - in normal flow */}
                  <div className="flex-shrink-0">
                    <Button
                      ref={yesButtonRef}
                      size="lg"
                      onClick={handleYes}
                      className="text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    >
                      <Heart className="w-5 h-5 md:w-6 md:h-6 mr-2 fill-current" />
                      Yes! 💖
                    </Button>
                  </div>

                  {/* Evasion arena for No button */}
                  <div
                    ref={evasionArenaRef}
                    className="relative flex-shrink-0 w-[200px] h-[80px] sm:w-[240px] sm:h-[100px]"
                  >
                    {/* No button with evasive behavior */}
                    <Button
                      ref={noButtonRef}
                      size="lg"
                      variant="outline"
                      onMouseEnter={handleNoHover}
                      onTouchStart={handleNoTouch}
                      onPointerDown={handleNoPointerDown}
                      onClick={handleNoClick}
                      className="text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 font-bold shadow-lg transition-all duration-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
                        touchAction: 'none'
                      }}
                    >
                      No 💔
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Persistent love notes section - visible before answering */}
            <Card className="backdrop-blur-sm bg-card/95 shadow-xl border-2 border-primary/10">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {valentineContent.loveNotes.map((note, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-sm md:text-base text-foreground/90 bg-secondary/50 rounded-lg p-4"
                    >
                      <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="leading-relaxed">{note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Success message card */}
            <Card className="backdrop-blur-sm bg-card/95 shadow-2xl border-2 border-primary/20 animate-scale-in">
              <CardContent className="text-center space-y-6 py-12 px-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <Heart className="w-24 h-24 md:w-32 md:h-32 text-primary fill-primary animate-heart-beat" />
                    <Sparkles className="w-8 h-8 text-accent absolute -top-2 -right-2 animate-spin-slow" />
                    <Sparkles className="w-6 h-6 text-accent absolute -bottom-1 -left-1 animate-spin-slow" />
                  </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-primary">
                  {valentineContent.confirmationMessage}
                </h2>

                <div className="flex justify-center gap-2 pt-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart
                      key={i}
                      className="w-6 h-6 text-primary fill-primary animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interactive love letter - replaces static letter */}
            <InteractiveLoveLetter />

            {/* Persistent love notes - still visible after answering */}
            <Card className="backdrop-blur-sm bg-card/95 shadow-xl border-2 border-primary/10">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {valentineContent.loveNotes.map((note, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-sm md:text-base text-foreground/90 bg-secondary/50 rounded-lg p-4"
                    >
                      <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="leading-relaxed">{note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progressive floating notes */}
            {visibleProgressiveNotes > 0 && (
              <div className="flex flex-wrap gap-3 justify-center">
                {valentineContent.progressiveNotes.slice(0, visibleProgressiveNotes).map((note, index) => (
                  <div
                    key={index}
                    className="animate-float-in bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-sm md:text-base text-foreground/90 shadow-md"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {note}
                  </div>
                ))}
              </div>
            )}

            {/* Floating thoughts at bottom */}
            <FloatingThoughts />
          </>
        )}
      </div>

      {/* Last Chance No Modal */}
      <LastChanceNoModal
        open={showNoModal}
        onOpenChange={setShowNoModal}
        onConfirmYes={handleYes}
      />
    </div>
  );
}
