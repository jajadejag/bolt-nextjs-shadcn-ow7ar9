"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CartSkeleton() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Skeleton className="h-24 w-24 rounded-md flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-[1px] w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}