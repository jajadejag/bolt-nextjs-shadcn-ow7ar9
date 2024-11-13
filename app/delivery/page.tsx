import { DeliveryContent } from "@/components/delivery/DeliveryContent";

export default function DeliveryPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Leveransinformation
        </h1>
        <DeliveryContent />
      </div>
    </main>
  );
}