import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import AuthService from '@/services/auth';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, completeLoginFromToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState<'info' | 'otp'>('info');
  const [otp, setOtp] = useState('');
  const googleButtonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load Google button if GIS is available
    // @ts-ignore
    if (window.google && googleButtonRef.current) {
      // @ts-ignore
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          try {
            const data = await AuthService.googleLogin(response.credential);
            completeLoginFromToken(data.token, { email, name });
            toast({ title: 'Signed in with Google' });
            const from = (location.state as any)?.from?.pathname || '/';
            navigate(from, { replace: true });
          } catch (e) {
            toast({ title: 'Google sign-in failed', variant: 'destructive' });
          }
        },
      });
      // @ts-ignore
      window.google.accounts.id.renderButton(googleButtonRef.current, { theme: 'outline', size: 'large', shape: 'pill' });
    }
  }, [location.state, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use request-otp to create/prepare the account and send code.
      // The server's /request-otp endpoint will create a placeholder user if needed.
      const resp: any = await AuthService.requestOtp(email);
      setStep('otp');
      if (resp && resp.code) {
        toast({ title: 'Verify your email', description: `Dev OTP: ${resp.code}`, });
        if (resp.previewUrl) {
          toast({ title: 'Email preview', description: resp.previewUrl });
        }
      } else {
        toast({ title: 'Verify your email', description: 'We sent a 6-digit code to your email.' });
      }
    } catch (error: any) {
      const msg = (error && error.message) ? error.message : 'Signup failed. Try again.';
      toast({ title: 'Error', description: msg, variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-20">
      <div className="bg-card p-10 rounded-2xl shadow-[var(--shadow-soft)] w-full max-w-md">
        <h1 className="text-4xl font-bold text-primary mb-6 font-display">Create account</h1>
        {step === 'info' && (
          <>
            <div className="mb-4 flex justify-center">
              <div ref={googleButtonRef} />
            </div>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or</span></div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Min 6 characters" />
              </div>
              <Button type="submit" className="w-full rounded-full">Sign up</Button>
            </form>
          </>
        )}

        {step === 'otp' && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const data = await AuthService.verifyOtp(email, otp, password);
                completeLoginFromToken(data.token, { email, name });
                toast({ title: 'Verified', description: 'Your account is verified and password set.' });
                const from = (location.state as any)?.from?.pathname || '/';
                navigate(from, { replace: true });
              } catch (err) {
                toast({ title: 'Invalid code', description: 'Please try again', variant: 'destructive' });
              }
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="otp" className="block text-sm font-medium mb-2">Enter 6-digit code</label>
              <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} required placeholder="123456" />
            </div>
            <Button type="submit" className="w-full rounded-full">Verify</Button>
            <Button type="button" variant="ghost" className="w-full" onClick={async () => { await AuthService.requestOtp(email); toast({ title: 'Code resent' }); }}>Resend code</Button>
          </form>
        )}

        <div className="mt-4 text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary underline">Log in</Link>
        </div>
      </div>
    </div>
  );
}


