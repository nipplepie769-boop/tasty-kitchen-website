import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';

const Layout = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <footer className="bg-background py-3 mt-30">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>The Tasty Kitchen. Made with ❤</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
