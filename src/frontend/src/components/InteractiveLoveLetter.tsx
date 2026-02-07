import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ChevronRight } from 'lucide-react';
import { valentineContent } from '@/content/valentineCopy';

export default function InteractiveLoveLetter() {
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [revealedParagraphs, setRevealedParagraphs] = useState<Set<number>>(new Set([0]));

  // Split letter into paragraphs, preserving structure
  const paragraphs = valentineContent.loveLetter
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 0);

  const handleRevealNext = () => {
    if (currentParagraph < paragraphs.length - 1) {
      const nextIndex = currentParagraph + 1;
      setCurrentParagraph(nextIndex);
      setRevealedParagraphs(prev => new Set([...prev, nextIndex]));
    }
  };

  const handleParagraphClick = (index: number) => {
    if (revealedParagraphs.has(index)) {
      setCurrentParagraph(index);
    }
  };

  const isLastParagraph = currentParagraph === paragraphs.length - 1;

  return (
    <Card className="backdrop-blur-sm bg-card/95 shadow-xl border-2 border-primary/10 animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl text-primary text-center flex items-center justify-center gap-2">
          <Heart className="w-6 h-6 fill-primary" />
          A Letter For You
          <Heart className="w-6 h-6 fill-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 md:px-12 py-6 space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {paragraphs.map((_, index) => (
            <button
              key={index}
              onClick={() => handleParagraphClick(index)}
              disabled={!revealedParagraphs.has(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                revealedParagraphs.has(index)
                  ? index === currentParagraph
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-primary/50 hover:bg-primary/70 cursor-pointer'
                  : 'w-2 bg-muted cursor-not-allowed'
              }`}
              aria-label={`Go to paragraph ${index + 1}`}
            />
          ))}
        </div>

        {/* Current paragraph display */}
        <div className="min-h-[200px] md:min-h-[300px]">
          <div
            className="prose prose-pink max-w-none animate-fade-in-up"
            key={currentParagraph}
          >
            <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed text-foreground/90 p-6 bg-secondary/30 rounded-lg border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-md">
              {paragraphs[currentParagraph]}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            {currentParagraph + 1} of {paragraphs.length}
          </div>
          
          {!isLastParagraph && (
            <Button
              onClick={handleRevealNext}
              className="group"
              size="lg"
            >
              Continue Reading
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
          
          {isLastParagraph && (
            <div className="flex items-center gap-2 text-primary animate-heart-beat">
              <Heart className="w-5 h-5 fill-primary" />
              <span className="text-sm font-medium">With all my love</span>
              <Heart className="w-5 h-5 fill-primary" />
            </div>
          )}
        </div>

        {/* Previously revealed paragraphs preview */}
        {revealedParagraphs.size > 1 && (
          <div className="pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3 text-center">
              Tap to revisit previous parts
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from(revealedParagraphs)
                .filter(idx => idx !== currentParagraph)
                .sort((a, b) => a - b)
                .map(idx => (
                  <button
                    key={idx}
                    onClick={() => handleParagraphClick(idx)}
                    className="px-3 py-1.5 text-xs bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-full transition-all duration-200 hover:scale-105"
                  >
                    Part {idx + 1}
                  </button>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
