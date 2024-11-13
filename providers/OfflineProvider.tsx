"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface OfflineContextType {
  isOnline: boolean;
  pendingOrders: any[];
  addPendingOrder: (order: any) => void;
  syncPendingOrders: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType>({
  isOnline: true,
  pendingOrders: [],
  addPendingOrder: () => {},
  syncPendingOrders: async () => {},
});

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Ladda sparade ordrar från localStorage
    const savedOrders = localStorage.getItem("pendingOrders");
    if (savedOrders) {
      setPendingOrders(JSON.parse(savedOrders));
    }

    // Lyssna på online/offline-status
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Online igen",
        description: "Du är nu ansluten till internet",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Offline-läge",
        description: "Du kan fortfarande bläddra och lägga till i varukorgen",
        variant: "destructive",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [toast]);

  const addPendingOrder = (order: any) => {
    const updatedOrders = [...pendingOrders, order];
    setPendingOrders(updatedOrders);
    localStorage.setItem("pendingOrders", JSON.stringify(updatedOrders));
  };

  const syncPendingOrders = async () => {
    if (!isOnline || pendingOrders.length === 0) return;

    try {
      // Här skulle vi synka med backend
      // För demo, simulera en API-anrop
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPendingOrders([]);
      localStorage.removeItem("pendingOrders");
      
      toast({
        title: "Synkronisering klar",
        description: `${pendingOrders.length} order(s) har synkroniserats`,
      });
    } catch (error) {
      toast({
        title: "Synkroniseringsfel",
        description: "Kunde inte synka ordrar. Försök igen senare.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isOnline && pendingOrders.length > 0) {
      syncPendingOrders();
    }
  }, [isOnline]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <OfflineContext.Provider 
      value={{ 
        isOnline, 
        pendingOrders, 
        addPendingOrder, 
        syncPendingOrders 
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
}

export const useOffline = () => useContext(OfflineContext);