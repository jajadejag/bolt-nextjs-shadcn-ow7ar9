import { HeroSection } from "@/components/home/HeroSection";
import { RestaurantSlider } from "@/components/home/RestaurantSlider";
import { restaurants } from "@/data/restaurants";
import Image from "next/image";
import { Star, Clock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Kiosk Advertisement */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative h-[200px] md:h-[300px] rounded-lg overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1920&h=800"
            alt="ASAP MARKET"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-4xl font-bold">
                  ASAP MARKET
                  <span className="block text-base md:text-lg font-normal text-muted-foreground mt-2">
                    Öppet dygnet runt
                  </span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full" />
              </div>
              <p className="text-muted-foreground max-w-md">
                Snacks, drycker och annat gott levererat direkt till din dörr, när som helst på dygnet.
              </p>
              <Button 
                className="w-fit bg-primary/90 hover:bg-primary transition-colors backdrop-blur-sm"
                asChild
              >
                <Link href="/restaurant/2">
                  Beställ nu
                </Link>
              </Button>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-1/2 right-[10%] -translate-y-1/2 hidden md:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-full animate-pulse" />
              <div className="relative w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                <ShoppingBag className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <RestaurantSlider restaurants={restaurants} />
      
      {/* Info Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Leverans i hela Sverige</h2>
              <p className="text-muted-foreground mb-8">
                Vi levererar mat från de bästa restaurangerna direkt till din dörr. Med vårt nätverk
                av frilansande bud kan vi garantera snabb och pålitlig leverans var du än befinner
                dig i Sverige.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Öppettider</h3>
                <div className="space-y-2">
                  {[
                    { day: "Måndag", hours: "10:00 - 22:00" },
                    { day: "Tisdag", hours: "10:00 - 22:00" },
                    { day: "Onsdag", hours: "10:00 - 22:00" },
                    { day: "Torsdag", hours: "10:00 - 22:00" },
                    { day: "Fredag", hours: "10:00 - 23:00" },
                    { day: "Lördag", hours: "11:00 - 23:00" },
                    { day: "Söndag", hours: "11:00 - 22:00" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex items-center text-muted-foreground">
                      <span className="w-24">{day}</span>
                      <span className="font-medium">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1562524864-e27e5d4f1c1d?q=80&w=1200&h=800"
                alt="Utsikt över Sörmland"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              {/* GPS Location Indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Outer Pulse Ring */}
                  <div className="absolute -inset-8 bg-primary/5 rounded-full animate-pulse" />
                  {/* Middle Ring */}
                  <div className="absolute -inset-4 bg-primary/10 rounded-full" />
                  {/* Inner Ring */}
                  <div className="relative w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                    {/* Center Dot */}
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  {/* Location Details */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/95 px-4 py-2 rounded-full border border-primary/20 shadow-lg">
                    <p className="text-sm font-medium text-primary">Sörmland, Sverige</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="bg-card/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Vad våra kunder säger
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Anna Lindström",
                role: "Stamkund",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200",
                text: "ASAP FOOD har revolutionerat hur jag beställer mat. Snabb leverans och alltid varm mat!",
                rating: 5
              },
              {
                name: "Erik Johansson",
                role: "Företagskund",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200",
                text: "Perfekt för våra lunchmöten på kontoret. Stort utbud och pålitlig service varje gång.",
                rating: 5
              },
              {
                name: "Maria Santos",
                role: "Food Blogger",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200",
                text: "Som matbloggare uppskattar jag verkligen kvaliteten på leveranserna. Alltid färsk och välpresenterad mat.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-lg border border-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}