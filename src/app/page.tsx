"use client";  

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {api} from "@/trpc/react";

export default function Home() {
  const [exponent, setExponent] = useState<number>(2);
  const [result, setResult] = useState<string>("");

  const calculateMutation = api.newtonBinomial.calculate.useMutation({
    onSuccess: (data) => {
      setResult(data);
    },
    onError: (error) => {
      console.error("Errore nel calcolo:", error.message);
    }
  });

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 antialiased">
      <div className="w-full max-w-3xl space-y-8">
        
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tighter">
            Newton's Binomial
          </h1>
        </header>

        <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Configura Espansione</CardTitle>
            <CardDescription>Inserisci l'esponente n per (a + b)^n</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="exponent">Esponente (n)</Label>
              <div className="flex gap-4">
                <Input 
                  type="number" 
                  id="exponent" 
                  value={exponent} 
                  onChange={(e) => setExponent(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-24"
                />
                <Button onClick={() => calculateMutation.mutate({exponent})} className="flex-1">Espandi</Button>
              </div>
            </div>

            {result && (
              <div className="mt-6 p-4 bg-muted rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2 italic">Risultato:</p>
                <p className="text-xl font-mono text-primary break-all">
                  {result}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}