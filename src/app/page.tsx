import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to the Frontend Challenge!</CardTitle>
          <CardDescription className="text-center">
            Build an advanced CRUD operations dashboard with Next.js and Shadcn UI.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild>
            <a href="/login">Get Started</a>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}