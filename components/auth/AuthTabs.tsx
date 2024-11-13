"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { SocialLogin } from "./SocialLogin";

export function AuthTabs() {
  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Logga in</TabsTrigger>
        <TabsTrigger value="register">Skapa konto</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login" className="space-y-6">
        <LoginForm />
        <SocialLogin />
      </TabsContent>
      
      <TabsContent value="register" className="space-y-6">
        <RegisterForm />
        <SocialLogin />
      </TabsContent>
    </Tabs>
  );
}