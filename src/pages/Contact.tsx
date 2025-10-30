import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Decorative background */}
      <div 
        className="fixed inset-0 -z-10 opacity-30"
        style={{
          background: 'var(--gradient-hero)',
        }}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 font-display">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Have questions? We'd love to hear from you!
          </p>
        </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-full"
        >
          <Card className="p-8 shadow-[var(--shadow-soft)] font-sans h-full flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 font-sans">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full bg-sky-100 focus:bg-sky-200 border-0"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2 font-sans">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-sky-100 focus:bg-sky-200 border-0"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2 font-sans">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  required
                  rows={6}
                  className="w-full resize-none bg-sky-100 focus:bg-sky-200 border-0"
                />
              </div>
              <Button type="submit" size="lg" className="w-full rounded-full bg-black text-white hover:bg-gray-900">
                Send Message
              </Button>
            </form>
          </Card>
        </motion.div>
        {/* New Follow Us / Get in Touch Section + Business Hours */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-full flex flex-col justify-between"
        >
          <Card className="p-6 shadow-[var(--shadow-hover)] mb-4 font-sans border-0 rounded-2xl bg-gradient-to-br from-purple-100 via-pickle-lavender to-pink-100 backdrop-blur-xl w-full flex-1 flex flex-col justify-center bg-white/60 bg-clip-padding backdrop-filter">
            <h3 className="text-2xl md:text-3xl font-extrabold text-primary mb-6 text-center font-display tracking-wide drop-shadow-lg" style={{letterSpacing: '0.04em'}}>Follow Us / Get in Touch</h3>
            <div className="flex flex-col gap-4">
              {/* Mail Us */}
              <a
                href="mailto:hello@pickleco.com"
                className="flex items-center gap-3 group rounded-xl px-4 py-3 bg-white/60 hover:bg-primary/20 transition-all shadow-[var(--shadow-soft)] border border-primary/10"
              >
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-200 group-hover:bg-pink-300 transition-all shadow-md">
                  <Mail className="h-5 w-5 text-pink-500 group-hover:scale-110 transition-transform" />
                </span>
                <span className="font-bold text-pink-500 group-hover:underline font-display text-base">Mail Us</span>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/thetastykitchen_?igsh=amwwNGV6MTEwejNn" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group rounded-xl px-4 py-3 bg-white/60 hover:bg-pink-100 transition-all shadow-[var(--shadow-soft)] border border-pink-200"
              >
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-200 group-hover:bg-pink-300 transition-all shadow-md">
                  <span className="text-lg text-pink-500 group-hover:scale-110 transition-transform">📸</span>
                </span>
                <span className="font-bold text-pink-500 group-hover:underline font-display text-base">Follow Us</span>
              </a>
              {/* Phone */}
              <a
                href="tel:+917085227322"
                className="flex items-center gap-3 group rounded-xl px-4 py-3 bg-white/60 hover:bg-primary/20 transition-all shadow-[var(--shadow-soft)] border border-primary/10"
              >
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-200 group-hover:bg-pink-300 transition-all shadow-md">
                  <Phone className="h-5 w-5 text-pink-500 group-hover:scale-110 transition-transform" />
                </span>
                <span className="font-bold text-pink-500 group-hover:underline font-display text-base">+91 7085227322</span>
              </a>
              {/* Google Maps */}
              <a
                href="https://maps.app.goo.gl/xUGrSDYDFgYg7wUx7"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group rounded-xl px-4 py-3 bg-white/60 hover:bg-green-100 transition-all shadow-[var(--shadow-soft)] border border-green-200"
              >
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-200 group-hover:bg-pink-300 transition-all shadow-md">
                  <MapPin className="h-5 w-5 text-pink-500 group-hover:scale-110 transition-transform" />
                </span>
                <span className="font-bold text-pink-500 group-hover:underline font-display text-base">Visit Us</span>
              </a>
            </div>
          </Card>
          <Card className="p-8 shadow-[var(--shadow-soft)] font-sans border-0 rounded-2xl bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-lg flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-foreground mb-4 font-display">
              🕒 Business Hours
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-semibold">9:00 AM - 6:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-semibold">10:00 AM - 4:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-semibold">Closed</span>
              </p>
            </div>
          </Card>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
