"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, Facebook, Twitter } from "lucide-react";

interface SocialShareProps {
  title: string;
  url: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const shareData = {
    title: title,
    text: "Kolla in den här restaurangen på ASAP FOOD!",
    url: url
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback för webbläsare som inte stödjer Web Share API
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleShare}
          className="flex-1"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Dela
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')}
        >
          <Facebook className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')}
        >
          <Twitter className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}