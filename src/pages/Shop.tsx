import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import SmokedPork from '@/assets/smoked-pork.png';
import PorkPickle from '@/assets/pork-pickle.png';
import SmokedChicken from '@/assets/smoked-chicken.png';
import ChickenPickle from '@/assets/chicken-pickle.png';
import garlicDill from '@/assets/product-garlic-dill.png';
import jalapeno from '@/assets/product-jalapeno.png';
import ChilliPickle from '@/assets/chilli-pickle.png';
import KingChilli from '@/assets/king-chilli.png';

const Shop = () => {
  const products = [
    {
      id: '1',
      name: 'Smoked Pork Pickles',
      price: 390,
      image: SmokedPork,
      description: 'Slow-cooked pork infused with authentic Northeast spices and a smoky aroma that melts in your mouth.',
      backgroundColor: 'hsl(45, 90%, 85%)',
    },
    {
      id: '2',
      name: 'Smoked Chicken Pickles',
      price: 350,
      image: SmokedChicken,
      description: 'Tender chicken chunks blended with rich spices and a hint of smoky flavor — perfect for every meal.',
      backgroundColor: 'hsl(155, 40%, 85%)',
    },
    {
      id: '3',
      name: 'Pork Pickles',
      price: 340,
      image: PorkPickle,
      description: 'Juicy pork bites tossed in a tangy, spicy mix that brings the real homemade taste to your plate.',
      backgroundColor: 'hsl(15, 75%, 88%)',
    },
    {
      id: '4',
      name: 'Chicken Pickles',
      price: 320,
      image: ChickenPickle,
      description: 'Soft, spicy chicken pieces marinated in flavorful herbs and oil — a true homemade delight.',
      backgroundColor: 'hsl(270, 40%, 88%)',
    },
    {
      id: '5',
      name: 'King Chilli Pickles',
      price: 200,
      image: KingChilli,
      description: 'Made with fiery Bhut Jolokia (King Chilli) and aromatic herbs — a bold taste for true spice lovers.',
      backgroundColor: 'hsl(155, 40%, 85%)',
    },
    {
      id: '6',
      name: 'Chilli Pickles',
      price: 180,
      image: ChilliPickle,
      description: 'Crispy green chillies soaked in tangy spices — the perfect kick to your everyday food.',
      backgroundColor: 'hsl(45, 90%, 85%)',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 font-display">
            Our Pickles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Explore our full collection of handcrafted, organic pickles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
