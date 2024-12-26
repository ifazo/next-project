'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-success">Payment Canceled</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            Your payment has been canceled. If you encountered any issues, feel free to try again.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="secondary"
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
            <Button
              variant="default"
              onClick={() => router.push('/products')}
            >
              Buy Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
