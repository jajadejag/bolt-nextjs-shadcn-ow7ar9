export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Allmänna villkor
        </h1>
        
        <div className="grid gap-6">
          {/* Tjänstens omfattning */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Tjänstens omfattning</h2>
            <p className="text-muted-foreground">
              ASAP FOOD erbjuder användare möjligheten att beställa mat och dryck från våra 
              samarbetspartnerrestauranger. Tjänsten inkluderar beställning, betalning och 
              leverans av mat från anslutna restauranger.
            </p>
          </div>

          {/* Användarnas ansvar */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Användarnas ansvar</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Ange korrekta personuppgifter och leveransinformation</li>
              <li>Säkerställa att någon kan ta emot leveransen på angiven adress</li>
              <li>Inte missbruka tjänsten genom falska beställningar</li>
              <li>Följa våra användarvillkor och riktlinjer</li>
            </ul>
          </div>

          {/* Betalning och priser */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Betalning och priser</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Alla priser anges i svenska kronor inklusive moms</li>
              <li>Betalning sker vid beställning via godkända betalningsmetoder</li>
              <li>Leveransavgift tillkommer och visas tydligt före beställning</li>
              <li>Eventuella kampanjkoder måste anges före beställning</li>
            </ul>
          </div>

          {/* Leverans */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Leverans</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Leveranstiden är en uppskattning och kan påverkas av externa faktorer</li>
              <li>Vi ansvarar för leveransen fram till angiven leveransadress</li>
              <li>Kontaktfri leverans finns tillgänglig på begäran</li>
              <li>Vid misslyckad leverans kontaktas kunden via telefon</li>
            </ul>
          </div>

          {/* Avbokning och återbetalning */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Avbokning och återbetalning</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Avbokning kan göras innan restaurangen påbörjar tillagningen</li>
              <li>Återbetalningar behandlas inom 5-10 arbetsdagar</li>
              <li>Anspråk på ersättning måste göras inom 24 timmar efter leverans</li>
              <li>Vid kvalitetsproblem krävs fotodokumentation för återbetalning</li>
            </ul>
          </div>

          {/* Ansvarsbegränsning */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Ansvarsbegränsning</h2>
            <p className="text-muted-foreground">
              ASAP FOOD ansvarar inte för:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
              <li>Förseningar orsakade av trafikförhållanden eller väder</li>
              <li>Kvalitetsbrister i mat från restaurangpartners</li>
              <li>Tekniska problem utanför vår kontroll</li>
              <li>Indirekta skador eller följdskador</li>
            </ul>
          </div>

          {/* Immateriella rättigheter */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Immateriella rättigheter</h2>
            <p className="text-muted-foreground">
              Allt innehåll i appen, inklusive men inte begränsat till logotyper, texter, bilder och 
              varumärken, tillhör ASAP FOOD eller dess partners och får inte användas utan tillstånd.
            </p>
          </div>

          {/* Ändringar i villkor */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Ändringar i villkor</h2>
            <p className="text-muted-foreground">
              Vi förbehåller oss rätten att uppdatera dessa villkor. Vid väsentliga ändringar 
              informeras användare via e-post eller i appen. Fortsatt användning av tjänsten efter 
              ändringar innebär att du accepterar de nya villkoren.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}