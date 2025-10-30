import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SmokedPork from '@/assets/smoked-pork.png';
import PorkPickle from '@/assets/pork-pickle.png';
import SmokedChicken from '@/assets/smoked-chicken.png';
import ChickenPickle from '@/assets/chicken-pickle.png';
import garlicDill from '@/assets/product-garlic-dill.png';
import jalapeno from '@/assets/product-jalapeno.png';
import ChilliPickle from '@/assets/chilli-pickle.png';
import KingChilli from '@/assets/king-chilli.png';

const Index = () => {
  const featuredProducts = [
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
    <div className="min-h-screen">
      <Hero />

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2             className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-display">
              Bestsellers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our most loved pickles, crafted with organic ingredients and traditional recipes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link to="/shop">
              <Button size="lg" className="rounded-full px-8">
                View All Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Happy Thoughts Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-display">
              Happy Thoughts from Happy Customers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What our pickle-loving community has to say
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "These pickles remind me of my grandmother's recipe. Pure nostalgia in every bite!",
                author: "Niru",
                location: "Shillong",
                rating: "⭐⭐⭐⭐⭐",
              },
              {
                quote: "The Tasty Kitchen are out of this world! Perfect crunch and kick of heat.",
                author: "Ryntih",
                location: "Jaintia Hills",
                rating: "⭐⭐⭐⭐⭐",
              },
              {
                quote: "Finally found my go-to pickle brand. The quality and taste are unmatched!",
                author: "Carl",
                location: "Shillong",
                rating: "⭐⭐⭐⭐⭐",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 bg-card rounded-2xl shadow-[var(--shadow-soft)]"
              >
                <div className="text-xl mb-4 text-primary">{testimonial.rating}</div>
                <p className="text-lg text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="text-muted-foreground">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
