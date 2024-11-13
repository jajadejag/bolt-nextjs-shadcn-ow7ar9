export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-card border-t border-primary/20 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:pl-12 lg:pl-16">
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              ASAP FOOD
            </h3>
            <ul className="space-y-2 text-muted-foreground text-sm md:text-base pl-4">
              <li>
                <a href="/about" className="hover:text-primary transition-colors cursor-pointer">
                  Om oss
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-primary transition-colors cursor-pointer">
                  Allmänna villkor
                </a>
              </li>
              <li>
                <a href="/policy" className="hover:text-primary transition-colors cursor-pointer">
                  Policy
                </a>
              </li>
              <li>
                <a href="/help" className="hover:text-primary transition-colors cursor-pointer">
                  Hjälpcenter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Jobba hos oss
            </h3>
            <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
              <li>
                <a href="/partner" className="hover:text-primary transition-colors cursor-pointer">
                  Bli restaurangpartner
                </a>
              </li>
              <li>
                <a href="/delivery" className="hover:text-primary transition-colors cursor-pointer">
                  Bli ASAP-bud
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-primary transition-colors cursor-pointer">
                  Lediga tjänster
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Kontakt
            </h3>
            <div className="space-y-3 text-muted-foreground text-sm md:text-base">
              <a href="mailto:info@asapfood.se" className="flex items-center hover:text-primary transition-colors">
                <span className="text-primary mr-2">✉</span> info@asapfood.se
              </a>
              <a href="tel:081234567" className="flex items-center hover:text-primary transition-colors">
                <span className="text-primary mr-2">☏</span> 08-123 45 67
              </a>
              <p className="flex items-center">
                <span className="text-primary mr-2">⌂</span> Matgatan 1, 123 45 Stockholm
              </p>
              <div className="pt-2">
                <p className="text-sm">
                  Kundtjänst öppen alla dagar
                  <br />
                  09:00 - 22:00
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-primary/10">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground text-sm md:text-base">
              © 2024 <span className="text-primary">ASAP FOOD</span>. Alla rättigheter förbehållna.
            </p>
            
            {/* Payment Method Logos */}
            <div className="flex justify-center items-center gap-6">
              <div className="bg-[#FFB3C7] rounded-md px-2 py-1">
                <img 
                  src="https://cdn.klarna.com/1.0/shared/image/generic/logo/sv_se/basic/logo_black.png?width=100" 
                  alt="Klarna" 
                  className="h-4 opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
              <img 
                src="https://www.swish.nu/favicon.png" 
                alt="Swish" 
                className="h-6 opacity-70 hover:opacity-100 transition-opacity"
              />
              <div className="flex gap-2">
                <img 
                  src="https://www.mastercard.se/content/dam/public/mastercardcom/eu/se/logos/mc-logo-52.svg" 
                  alt="Mastercard" 
                  className="h-6 opacity-70 hover:opacity-100 transition-opacity"
                />
                <img 
                  src="https://www.visa.se/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg" 
                  alt="Visa" 
                  className="h-6 opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}