export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Om oss
        </h1>
        
        <div className="grid gap-6">
          {/* Vår Vision */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Vår Vision</h2>
            <p className="text-muted-foreground">
              ASAP FOOD grundades med en enkel vision: att göra det enkelt för människor att njuta av 
              sina favoritrestauranger i bekvämligheten av sitt eget hem. Vi är stolta över att 
              leverera mat från de bästa restaurangerna i Sverige, direkt till din dörr.
            </p>
          </div>

          {/* Vår Historia */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Vår Historia</h2>
            <p className="text-muted-foreground">
              Sedan starten har vi vuxit till att bli en av Sveriges ledande 
              matleveranstjänster. Vi samarbetar med hundratals restauranger och har 
              ett nätverk av dedikerade bud som säkerställer snabba och pålitliga leveranser.
            </p>
          </div>

          {/* Våra Värderingar */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Våra Värderingar</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Kvalitet i varje leverans</li>
              <li>Pålitlighet och punktlighet</li>
              <li>Kundnöjdhet i fokus</li>
              <li>Hållbarhet och miljöansvar</li>
            </ul>
          </div>

          {/* Vårt Löfte */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Vårt Löfte</h2>
            <p className="text-muted-foreground">
              Vi strävar efter att erbjuda den bästa möjliga servicen till både våra kunder 
              och restaurangpartners. Kvalitet, snabbhet och kundnöjdhet står alltid i centrum 
              för allt vi gör.
            </p>
          </div>

          {/* Vårt Team */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Vårt Team</h2>
            <p className="text-muted-foreground">
              Bakom ASAP FOOD står ett dedikerat team av experter inom tech, logistik och 
              kundservice. Tillsammans arbetar vi för att leverera den bästa möjliga 
              matupplevelsen till dig som kund.
            </p>
          </div>

          {/* Hållbarhet */}
          <div className="bg-card/50 rounded-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-3">Hållbarhet</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Miljövänliga förpackningar</li>
              <li>Optimerade leveransrutter</li>
              <li>Samarbete med lokala restauranger</li>
              <li>Minskat matsvinn genom smart planering</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}