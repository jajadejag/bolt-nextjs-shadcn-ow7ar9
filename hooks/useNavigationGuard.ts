"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

interface NavigationGuardProps {
  hasChanges: boolean;
  onSave?: () => Promise<boolean>;
}

export function useNavigationGuard({ hasChanges, onSave }: NavigationGuardProps) {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handleRouteChange = async (url: string) => {
      if (hasChanges) {
        const confirmed = window.confirm(
          'Du har osparade ändringar. Vill du fortsätta utan att spara?'
        );

        if (!confirmed) {
          router.back();
          return;
        }

        if (onSave) {
          try {
            const saved = await onSave();
            if (!saved) {
              router.back();
              return;
            }
          } catch (error) {
            toast({
              title: "Kunde inte spara ändringar",
              description: "Ett fel uppstod när ändringarna skulle sparas",
              variant: "destructive"
            });
            router.back();
            return;
          }
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasChanges, onSave, router, toast]);
}