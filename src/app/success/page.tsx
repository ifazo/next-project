'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-success">Payment Successful</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            Thank you for your payment! Your order is being processed and you will receive a confirmation email shortly.
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
              onClick={() => router.push('/dashboard/orders')}
            >
              View Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
