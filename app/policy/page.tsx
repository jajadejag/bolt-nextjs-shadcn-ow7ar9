export default function PolicyPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Integritetspolicy
        </h1>
        
        <div className="grid gap-6">
          {/* Inledning */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Inledning</h2>
            <p className="text-muted-foreground">
              Vi på Asap Food tar din integritet på största allvar. Denna integritetspolicy beskriver hur vi samlar in, använder, delar och skyddar din personliga information.
            </p>
          </div>

          {/* Insamlad data */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Insamlad data</h2>
            <p className="text-muted-foreground">Vi samlar in följande typer av data:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Namn och kontaktinformation</li>
              <li>Leveransadresser</li>
              <li>Betalningsuppgifter</li>
              <li>Orderhistorik</li>
              <li>Användningsstatistik</li>
            </ul>
          </div>

          {/* Användning av data */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Användning av data</h2>
            <p className="text-muted-foreground">Din data används för att:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Bearbeta och leverera dina beställningar</li>
              <li>Förbättra vår tjänst och användarupplevelse</li>
              <li>Skicka relevanta erbjudanden (med ditt godkännande)</li>
              <li>Förhindra bedrägerier och öka säkerheten</li>
            </ul>
          </div>

          {/* Datasäkerhet */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Datasäkerhet</h2>
            <p className="text-muted-foreground">
              Vi använder branschledande säkerhetsåtgärder för att skydda din data, inklusive:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Kryptering av känslig information</li>
              <li>Säkra servrar och databaser</li>
              <li>Regelbundna säkerhetsgranskningar</li>
              <li>Strikt åtkomstkontroll</li>
            </ul>
          </div>

          {/* Delning av data */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Delning av data</h2>
            <p className="text-muted-foreground">
              Vi delar endast data med:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Restaurangpartners (för orderhantering)</li>
              <li>Leveranspartners (för leverans av beställningar)</li>
              <li>Betalningsleverantörer (för betalningshantering)</li>
              <li>Myndigheter (när lagen kräver det)</li>
            </ul>
          </div>

          {/* Användarnas rättigheter */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Dina rättigheter</h2>
            <p className="text-muted-foreground">Som användare har du rätt att:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Begära tillgång till din data</li>
              <li>Korrigera felaktig information</li>
              <li>Radera din data ("rätten att bli glömd")</li>
              <li>Begära dataportabilitet</li>
              <li>Invända mot databehandling</li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              För att utöva dessa rättigheter, kontakta oss via{" "}
              <a href="mailto:support@asapfood.se" className="text-primary hover:underline">
                support@asapfood.se
              </a>
            </p>
          </div>

          {/* Cookies och spårning */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Cookies och spårning</h2>
            <p className="text-muted-foreground">Vi använder cookies för att:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Förbättra webbplatsens funktionalitet</li>
              <li>Analysera användarbeteende</li>
              <li>Anpassa innehåll och erbjudanden</li>
              <li>Spara dina preferenser</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}