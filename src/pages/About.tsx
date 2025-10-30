import React from 'react';
import { motion } from 'framer-motion';

const FloralPattern: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] z-0">
    <div className="absolute w-full h-full">
      {[...Array(20)].map((_, i) => (
        <svg
          key={i}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          width="40"
          height="40"
          viewBox="0 0 40 40"
        >
          <path
            d="M20 1C14 1 9 6 9 12c0 4 2 7 5 9-3 2-5 5-5 9 0 6 5 11 11 11s11-5 11-11c0-4-2-7-5-9 3-2 5-5 5-9 0-6-5-11-11-11z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  </div>
);

const DecorativeLine: React.FC = () => (
  <div className="flex items-center justify-center my-8">
    <div className="h-px bg-primary/20 w-16" />
    <div className="mx-4 text-primary opacity-60">✦</div>
    <div className="h-px bg-primary/20 w-16" />
  </div>
);

const About: React.FC = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen pt-24 pb-20 font-['Gabriola'] relative overflow-hidden"
    >
      <FloralPattern />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold text-foreground mb-4 tracking-tight relative"
          >
            Our Story
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary/20 rounded-full" />
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-12 text-xl text-foreground"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card/90 backdrop-blur-sm p-10 rounded-3xl shadow-[var(--shadow-soft)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-3xl font-bold text-primary mb-4">🌿 How It All Began</h2>
            <p className="text-muted-foreground leading-relaxed text-lg tracking-wide">
              Our journey began in a small kitchen in the heart of East Jaintia Hills,
              Meghalaya — where passion met flavor and a dream took shape. What
              started as a humble home venture by a few food-loving friends soon
              became the first cloud kitchen in East Jaintia Hills. We began by
              crafting delicious homemade pickles using fresh local ingredients,
              organic spices, and traditional recipes passed down through
              generations. Each jar carries the warmth of home, the richness of
              local produce, and the love of our small 2–3 member team who pour
              their hearts into every batch.

              From our kitchen to yours — every bite tells the story of our land,
              our people, and our love for good food.
            </p>
          </motion.div>

          <DecorativeLine />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card/90 backdrop-blur-sm p-10 rounded-3xl shadow-[var(--shadow-soft)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-3xl font-bold text-primary mb-4">🌱 Our Philosophy</h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-lg tracking-wide">
              We believe in keeping things simple and authentic. Every jar of our
              pickles is made with:
            </p>
            <ul className="space-y-4 text-muted-foreground pl-4 text-lg">
              <li>🌶️ Homemade spices for that authentic, unforgettable flavor</li>
              <li>🥩 Fresh meat and organic vegetables, locally sourced for purity and freshness</li>
              <li>🍋 Traditional fermentation methods for authentic flavor</li>
              <li>🫙 Small-batch production to ensure quality</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-6 text-lg tracking-wide">
              And while pickles are our pride, you'll also find delicious burgers,
              pizzas, and refreshing drinks — all made with the same homemade touch
              that makes our food truly special. Come, taste the difference of
              homemade goodness — crafted with love, care, and a hint of the
              hills. 💚
            </p>
          </motion.div>

          <DecorativeLine />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card/90 backdrop-blur-sm p-10 rounded-3xl shadow-[var(--shadow-soft)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-3xl font-bold text-primary mb-4">💚 Our Commitment</h2>
            <p className="text-muted-foreground leading-relaxed text-lg tracking-wide">
              We're committed to delivering not just food, but a taste of home.
              Every jar of pickle, every bite of our food, reflects our promise
              of freshness, authenticity, and care. We make everything in small
              batches using locally sourced ingredients, homemade spices, and
              traditional recipes that bring out the real flavors of Meghalaya.

              As the first cloud kitchen in East Jaintia Hills, we take pride in
              supporting local farmers and using eco-friendly packaging to keep
              our food — and our planet — pure. Every order we prepare is made
              with love, honesty, and the warmth of a homemade meal shared with
              family. 💙✨
            </p>
          </motion.div>

          <DecorativeLine />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card/90 backdrop-blur-sm p-10 rounded-3xl shadow-[var(--shadow-soft)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-3xl font-bold text-primary mb-4">🌟 Why Choose Our Pickles?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[
                {
                  icon: '🌱',
                  title: 'Organic Ingredients',
                  description: 'We use only the finest organic cucumbers and spices',
                },
                {
                  icon: '👨‍🍳',
                  title: 'Traditional Recipes',
                  description: 'Time-tested family recipes passed down through generations',
                },
                {
                  icon: '💚',
                  title: 'Made with Love',
                  description: 'Every jar is handcrafted with care and attention to detail',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-8 bg-muted/50 backdrop-blur-sm rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-6xl mb-4 transform hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default About;
