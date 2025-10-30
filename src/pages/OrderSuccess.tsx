import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const OrderSuccess = () => {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-20">
      <div className="bg-card p-10 rounded-2xl shadow-[var(--shadow-soft)] text-center">
        <h1 className="text-5xl font-bold text-primary mb-6 font-display">Order Successful!</h1>
        <p className="text-xl text-muted-foreground mb-8">Thank you for your purchase. Your order has been placed and will be processed soon.</p>
        <Link to="/shop">
          <Button size="lg" className="rounded-full">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
