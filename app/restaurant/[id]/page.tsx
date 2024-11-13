"use client";

import { restaurants } from "@/data/restaurants";
import { notFound, useRouter } from "next/navigation";
import { Clock, MapPin, Star, Truck } from "lucide-react";
import { MenuSection } from "@/components/restaurant/MenuSection";
import { RestaurantHeader } from "@/components/restaurant/RestaurantHeader";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function RestaurantPage() {
  const params = useParams();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState(() => 
    restaurants.find((r) => r.id === parseInt(params.id as string, 10))
  );

  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (!restaurant) {
      router.push("/");
    }
  }, [restaurant, router]);

  if (!restaurant) {
    return null;
  }

  const scrollToSection = (categoryId: string) => {
    const element = menuRefs.current[categoryId];
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let currentSection = "";

      Object.entries(menuRefs.current).forEach(([id, element]) => {
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= 200 && bottom >= 200) {
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <RestaurantHeader restaurant={restaurant} />
      
      <div className="sticky top-14 z-40 bg-background/95 backdrop-blur-sm border-b border-primary/10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto py-4 custom-scrollbar">
            {restaurant.menu.map((category, index) => (
              <div key={category.id} className="flex items-center">
                <Button
                  variant="ghost"
                  className={`
                    flex-none px-4 py-2 text-base font-medium relative
                    ${activeSection === category.id 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                    }
                    hover:bg-transparent
                  `}
                  onClick={() => scrollToSection(category.id)}
                >
                  {category.name}
                  {activeSection === category.id && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                  )}
                </Button>
                {index < restaurant.menu.length - 1 && (
                  <div className="h-4 w-px bg-primary/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {restaurant.menu.map((category) => (
              <div
                key={category.id}
                ref={(el) => (menuRefs.current[category.id] = el)}
                id={category.id}
              >
                <MenuSection category={category} />
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 p-6 space-y-6">
                <div className="space-y-4">
                  <div className="relative pb-3">
                    <h3 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      Information
                    </h3>
                    <div className="absolute -bottom-1 left-0 w-1/3 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{restaurant.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{restaurant.openingHours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Star className="h-4 w-4 text-primary" />
                      <span>{restaurant.rating} / 5</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Leveransavgift</h3>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-muted-foreground">Fast avgift</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        49 kr
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t border-primary/10">
                      <Clock className="h-4 w-4 text-primary" />
                      <div className="text-sm">
                        <span className="text-muted-foreground">Leveranstid ca: </span>
                        <span className="font-medium text-foreground">{restaurant.deliveryTime} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}