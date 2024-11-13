import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/careers/JobCard";
import { Mail, Phone, MapPin } from "lucide-react";

const jobs = [
  {
    title: "Restaurangpartneransvarig",
    location: "Stockholm",
    type: "Heltid",
    description: "Som restaurangpartneransvarig kommer du att arbeta med att utveckla och underhålla relationer med våra restaurangpartners.",
    requirements: [
      "3+ års erfarenhet av account management eller liknande roll",
      "Utmärkta kommunikationsförmågor",
      "Erfarenhet från restaurangbranschen är meriterande",
      "Flytande svenska och engelska"
    ]
  },
  {
    title: "Leveranskoordinator",
    location: "Stockholm",
    type: "Heltid",
    description: "Vi söker en leveranskoordinator som kan optimera och övervaka våra leveransprocesser för att säkerställa effektiv leverans.",
    requirements: [
      "Erfarenhet av logistik eller leveranskoordinering",
      "Analytisk förmåga och problemlösningskompetens",
      "God datorvana och teknisk förståelse",
      "Flexibel och stresstålig"
    ]
  },
  {
    title: "Kundtjänstmedarbetare",
    location: "Stockholm",
    type: "Deltid/Heltid",
    description: "Som kundtjänstmedarbetare är du vår första kontakt med kunder och ansvarar för att ge excellent service.",
    requirements: [
      "Tidigare erfarenhet av kundservice",
      "Utmärkt kommunikationsförmåga",
      "Förmåga att hantera flera uppgifter samtidigt",
      "Tillgänglig för kvälls- och helgarbete"
    ]
  }
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
        <div className="max-w-4xl mx-auto px-4 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Jobba hos oss
          </h1>
          <p className="text-lg md:text-xl text-center text-muted-foreground mb-8">
            Bli en del av framtidens matleveranstjänst och hjälp oss revolutionera hur människor upplever mat
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-primary hover:bg-primary/90">
              Se lediga tjänster
            </Button>
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
              Kontakta rekrytering
            </Button>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Lediga tjänster</h2>
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-card/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Kontakta rekrytering
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-lg bg-background">
              <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">E-post</h3>
              <p className="text-muted-foreground">rekrytering@asapfood.se</p>
            </div>
            <div className="p-6 rounded-lg bg-background">
              <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Telefon</h3>
              <p className="text-muted-foreground">08-123 45 67</p>
            </div>
            <div className="p-6 rounded-lg bg-background">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Besöksadress</h3>
              <p className="text-muted-foreground">Matgatan 1, Stockholm</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}