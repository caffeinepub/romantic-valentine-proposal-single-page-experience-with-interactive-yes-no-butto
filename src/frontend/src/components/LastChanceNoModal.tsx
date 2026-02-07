import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, X } from 'lucide-react';

interface LastChanceNoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmYes: () => void;
}

export default function LastChanceNoModal({
  open,
  onOpenChange,
  onConfirmYes,
}: LastChanceNoModalProps) {
  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open, onOpenChange]);

  const handleConfirm = () => {
    onConfirmYes();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg backdrop-blur-sm bg-card/98 border-2 border-destructive/30">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <DialogHeader className="space-y-4">
          <div className="flex justify-center">
            <img
              src="/assets/generated/angry-sideeye-panda.dim_768x768.png"
              alt="Cute little angry panda"
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
            />
          </div>

          <DialogTitle className="text-2xl md:text-3xl font-bold text-center text-destructive">
            Really? 🐼
          </DialogTitle>

          <DialogDescription className="text-center text-base md:text-lg space-y-3">
            <p className="text-foreground/90">
              This is your <span className="font-bold text-destructive">last chance</span> to press the correct button!
            </p>
            <p className="text-sm text-muted-foreground italic">
              (Hint: It's the one with the heart 💖)
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-row gap-3 sm:justify-center">
          <Button
            size="lg"
            onClick={handleConfirm}
            className="text-lg px-8 py-6 font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <Heart className="w-5 h-5 mr-2 fill-current" />
            Yes! 💖
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-base px-6 py-6 w-full sm:w-auto"
          >
            Let me think again...
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
