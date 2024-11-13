"use client";

import { Button } from "@/components/ui/button";
import { Menu, User, Search } from "lucide-react";
import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent, type: 'login' | 'register') => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsDialogOpen(false);
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com'
      });
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
    setIsOpen(false);
    router.push('/');
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { title: "Hem", href: "/" },
    ...(user ? [{ title: "Min Profil", href: "/profile" }] : []),
    { title: "Restauranger", href: "/?scrollTo=restaurants" },
    ...(user ? [{ title: "Mina ordrar", href: "/orders" }] : []),
    { type: 'separator' },
    {
      title: "Allmän Information",
      items: [
        { title: "Om oss", href: "/about" },
        { title: "Allmänna villkor", href: "/terms" },
        { title: "Policy", href: "/policy" },
        { title: "Hjälpcenter", href: "/help" }
      ]
    },
    { type: 'separator' },
    {
      title: "Partners",
      items: [
        { title: "Bli restaurangägare", href: "/partner" },
        { title: "Bli ASAP-bud", href: "/delivery-partner" }
      ]
    }
  ];

  return (
    <header className="border-b border-primary/20 bg-gradient-to-b from-background to-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 -ml-3 md:ml-0">
                  <Menu className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className="w-[280px] p-0 bg-gradient-to-b from-background to-card border-r border-primary/20 flex flex-col"
              >
                <SheetHeader className="p-4 border-b border-primary/10">
                  <SheetTitle>Meny</SheetTitle>
                </SheetHeader>
                <nav className="p-2 flex-1">
                  {menuItems.map((item, index) => {
                    if (item.type === 'separator') {
                      return <div key={index} className="my-2 border-t border-primary/10" />;
                    }
                    if ('items' in item) {
                      return (
                        <div key={index} className="space-y-1">
                          <h3 className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                            {item.title}
                          </h3>
                          {item.items.map((subItem) => (
                            <Button
                              key={subItem.title}
                              variant="ghost"
                              className="w-full justify-start text-left pl-4"
                              onClick={() => {
                                router.push(subItem.href);
                                handleLinkClick();
                              }}
                            >
                              {subItem.title}
                            </Button>
                          ))}
                        </div>
                      );
                    }
                    return (
                      <Button
                        key={item.title}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          if ('href' in item) {
                            router.push(item.href);
                            handleLinkClick();
                          }
                        }}
                      >
                        {item.title}
                      </Button>
                    );
                  })}
                </nav>
                {user && (
                  <div className="mt-auto p-4 border-t border-primary/10">
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-semibold text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      onClick={handleLogout}
                    >
                      Logga ut
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>

          <Link 
            href="/" 
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent hover:scale-105 transition-transform absolute left-1/2 -translate-x-1/2"
          >
            ASAP FOOD
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              <Search className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </Button>

            {!user && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                    <User className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Logga in eller skapa konto</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Logga in</TabsTrigger>
                      <TabsTrigger value="register">Skapa konto</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
                        <div>
                          <Input
                            placeholder="E-post"
                            type="email"
                            name="email"
                            required
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Lösenord"
                            type="password"
                            name="password"
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? "Loggar in..." : "Logga in"}
                        </Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="register">
                      <form onSubmit={(e) => handleSubmit(e, 'register')} className="space-y-4">
                        <div>
                          <Input
                            placeholder="Namn"
                            name="name"
                            required
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="E-post"
                            type="email"
                            name="email"
                            required
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Lösenord"
                            type="password"
                            name="password"
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? "Skapar konto..." : "Skapa konto"}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            )}

            <CartButton />
          </div>
        </div>

        <AnimatePresence>
          {isSearchVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="py-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Sök efter restauranger eller maträtter..."
                    className="pl-10 bg-card/50 border-primary/20 focus:border-primary transition-colors"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}