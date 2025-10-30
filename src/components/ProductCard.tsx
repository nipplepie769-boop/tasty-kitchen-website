import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  backgroundColor?: string;
}

const ProductCard = ({ id, name, price, image, description, backgroundColor }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <Card className="overflow-hidden h-full flex flex-col shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300">
        <div
          className="relative aspect-square overflow-hidden"
          style={{ backgroundColor: backgroundColor || 'hsl(var(--muted))' }}
        >
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover p-8"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-foreground mb-2">{name}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
          )}
            <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-primary">₹{price.toFixed(2)}</span>
            </div>
            <Button
              onClick={handleAddToCart}
              className="w-full rounded-full"
              size="lg"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
