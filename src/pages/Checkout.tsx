import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const Checkout = () => {
  const { items, total } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setIsProcessing(true);
    // Cash on Delivery only
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/order-success');
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-8 shadow-[var(--shadow-soft)]">
          <h1 className="text-4xl font-bold text-foreground mb-6 font-display">Checkout</h1>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Order Total: <span className="text-primary">₹{total.toFixed(2)}</span></h2>
            <ul className="mb-4 list-disc list-inside text-muted-foreground">
              {items.map(item => (
                <li key={item.id}>{item.name} x {item.quantity}</li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked
                  readOnly
                /> Cash on Delivery
              </label>
            </div>
          </div>
          <Button size="lg" className="w-full rounded-full" onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Confirm Order'}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
