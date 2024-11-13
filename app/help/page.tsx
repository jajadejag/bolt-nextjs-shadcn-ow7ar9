export default function HelpPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Hjälpcenter
        </h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Kundsupport</h2>
            <div className="bg-card/50 p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Öppettider</h3>
                  <p className="text-muted-foreground">
                    Vår kundtjänst är tillgänglig alla dagar mellan 09:00 - 22:00
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Kontaktvägar</h3>
                  <div className="space-y-2">
                    <p className="flex items-center text-muted-foreground">
                      <span className="text-primary mr-2">✉</span>
                      <a href="mailto:support@asapfood.se" className="hover:text-primary transition-colors">
                        support@asapfood.se
                      </a>
                    </p>
                    <p className="flex items-center text-muted-foreground">
                      <span className="text-primary mr-2">☏</span>
                      <a href="tel:081234567" className="hover:text-primary transition-colors">
                        08-123 45 67
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Leveransinformation</h2>
            <div className="bg-card/50 p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Spårning av beställning</h3>
                  <p className="text-muted-foreground">
                    Du kan spåra din beställning i realtid genom att klicka på "Spåra Order" 
                    i din orderbekräftelse eller i din orderhistorik.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Vid leveransproblem</h3>
                  <p className="text-muted-foreground">
                    Om din leverans är försenad eller om det uppstår andra problem, 
                    kontakta vår kundtjänst omedelbart.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Återbetalningar</h2>
            <div className="bg-card/50 p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Process för återbetalning</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Anspråk måste göras inom 24 timmar efter leverans</li>
                    <li>• Återbetalningar behandlas inom 5-10 arbetsdagar</li>
                    <li>• Kontakta kundtjänst för att påbörja processen</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}