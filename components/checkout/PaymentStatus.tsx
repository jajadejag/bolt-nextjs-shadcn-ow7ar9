"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Smartphone, 
  Shield,
  Share2,
  Star,
  ThumbsUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface PaymentStatusProps {
  step: 'initial' | 'processing' | 'confirming' | 'completed' | 'failed';
  paymentMethod?: 'card' | 'swish' | 'klarna' | 'apple-pay' | 'google-pay';
  redirectUrl?: string;
  onReset?: () => void;
  orderId?: string;
}

export function PaymentStatus({
  step,
  paymentMethod,
  redirectUrl,
  onReset,
  orderId
}: PaymentStatusProps) {
  const [rating, setRating] = useState(0);
  const { toast } = useToast();

  const getProgressValue = () => {
    switch (step) {
      case 'initial': return 0;
      case 'processing': return 33;
      case 'confirming': return 66;
      case 'completed': return 100;
      case 'failed': return 100;
      default: return 0;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Min beställning från ASAP FOOD',
          text: `Kolla in min beställning! Order #${orderId}`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      toast({
        title: "Delning inte tillgänglig",
        description: "Din enhet stödjer inte delning.",
      });
    }
  };

  const handleRating = (value: number) => {
    setRating(value);
    toast({
      title: "Tack för ditt betyg!",
      description: "Din feedback hjälper oss att bli bättre.",
    });
  };

  const renderContent = () => {
    switch (step) {
      case 'processing':
        return (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">Bearbetar betalning</h3>
            <p className="text-muted-foreground mb-4">
              Vänligen vänta medan vi behandlar din betalning...
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Säker betalning via {paymentMethod}</span>
            </div>
          </div>
        );

      case 'confirming':
        if ((paymentMethod === 'swish' || paymentMethod === 'klarna') && redirectUrl) {
          return (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Smartphone className="h-16 w-16 text-primary mx-auto mb-4" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">
                Öppna {paymentMethod === 'swish' ? 'Swish' : 'Klarna'}
              </h3>
              <p className="text-muted-foreground mb-4">
                Öppna appen för att slutföra betalningen
              </p>
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => window.location.href = redirectUrl}
              >
                Öppna {paymentMethod === 'swish' ? 'Swish' : 'Klarna'}
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Om appen inte öppnas automatiskt, kontrollera dina inställningar
              </p>
            </div>
          );
        }
        return null;

      case 'completed':
        return (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">Betalning genomförd</h3>
            <p className="text-muted-foreground mb-4">
              Din betalning har genomförts framgångsrikt!
            </p>
            
            <div className="space-y-4">
              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                Orderbekräftelse skickas via e-post
              </Badge>

              <div className="flex justify-center gap-2 mt-6">
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Dela
                </Button>
                <Button variant="outline" onClick={() => handleRating(5)}>
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Gilla
                </Button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Betygsätt din upplevelse
                </p>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Button
                      key={value}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRating(value)}
                      className={`p-1 ${rating >= value ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      <Star className="h-5 w-5" fill={rating >= value ? 'currentColor' : 'none'} />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'failed':
        return (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">Betalningen misslyckades</h3>
            <p className="text-muted-foreground mb-4">
              Det gick inte att genomföra betalningen. Vänligen försök igen.
            </p>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                onClick={onReset}
                className="w-full"
              >
                Försök igen
              </Button>
              <p className="text-sm text-muted-foreground">
                Om problemet kvarstår, kontakta vår kundtjänst
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {step !== 'initial' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="p-4">
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Betalningsprocess</span>
                <span className="text-primary font-medium">{getProgressValue()}%</span>
              </div>
              <Progress 
                value={getProgressValue()} 
                className={`h-2 ${
                  step === 'failed' ? 'bg-destructive' : 
                  step === 'completed' ? 'bg-green-500' : ''
                }`}
              />
            </div>
            {renderContent()}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}