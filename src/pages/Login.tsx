import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import AuthService from '@/services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, googleInitReady, completeLoginFromToken } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<'password' | 'email-otp' | 'phone-otp'>('password');
  const [otpEmail, setOtpEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);

  useEffect(() => {
    // render Google button when ready
    // @ts-ignore
    if (googleInitReady && (window as any).google && googleButtonRef.current) {
      // @ts-ignore
      (window as any).google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          try {
            await AuthService.googleLogin(response.credential);
            toast({ title: 'Signed in with Google' });
            const from = (location.state as any)?.from?.pathname || '/';
            navigate(from, { replace: true });
          } catch (e) {
            toast({ title: 'Google sign-in failed', variant: 'destructive' });
          }
        },
      });
      // @ts-ignore
      (window as any).google.accounts.id.renderButton(googleButtonRef.current, { theme: 'outline', size: 'large', shape: 'pill' });
    }
  }, [googleInitReady, location.state, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Login failed. Please check your credentials.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-20">
      <div className="bg-card p-10 rounded-2xl shadow-[var(--shadow-soft)] w-full max-w-md">
        <h1 className="text-4xl font-bold text-primary mb-6 font-display">Login</h1>
        <div className="mb-4 flex justify-center">
          <div ref={googleButtonRef} />
        </div>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or login with email</span></div>
        </div>
        <div className="mb-4 flex gap-2">
          <Button variant={mode==='password'?'default':'outline'} size="sm" className="rounded-full" onClick={()=>setMode('password')}>Password</Button>
          <Button variant={mode==='email-otp'?'default':'outline'} size="sm" className="rounded-full" onClick={()=>setMode('email-otp')}>Email OTP</Button>
          <Button variant={mode==='phone-otp'?'default':'outline'} size="sm" className="rounded-full" onClick={()=>setMode('phone-otp')}>Phone OTP</Button>
        </div>

        {mode === 'password' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="Enter your email" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
              <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required placeholder="Enter your password" />
            </div>
            <Button type="submit" className="w-full rounded-full">Login</Button>
          </form>
        )}

        {mode === 'email-otp' && (
          <EmailOtpBlock
            otpEmail={otpEmail}
            setOtpEmail={setOtpEmail}
            otpSent={otpSent}
            setOtpSent={setOtpSent}
            otpCode={otpCode}
            setOtpCode={setOtpCode}
            navigate={navigate}
            location={location}
            toast={toast}
            completeLoginFromToken={completeLoginFromToken}
          />
        )}

        {mode === 'phone-otp' && (
          <PhoneOtpBlock
            phone={phone}
            setPhone={setPhone}
            phoneOtpSent={phoneOtpSent}
            setPhoneOtpSent={setPhoneOtpSent}
            otpCode={otpCode}
            setOtpCode={setOtpCode}
            navigate={navigate}
            location={location}
            toast={toast}
            completeLoginFromToken={completeLoginFromToken}
          />
        )}

        <div className="mt-4 text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

function EmailOtpBlock({ otpEmail, setOtpEmail, otpSent, setOtpSent, otpCode, setOtpCode, navigate, location, toast, completeLoginFromToken }: any) {
  return (
    <div className="space-y-4">
          {!otpSent ? (
        <>
          <div>
            <label htmlFor="otpEmail" className="block text-sm font-medium mb-2">Email</label>
            <Input id="otpEmail" type="email" value={otpEmail} onChange={(e)=>setOtpEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <Button className="w-full rounded-full" onClick={async ()=>{ try { const resp = await AuthService.requestOtp(otpEmail); setOtpSent(true); if (resp && resp.code) { toast({ title: 'OTP sent (dev)', description: `Code: ${resp.code}` }); if (resp.previewUrl) toast({ title: 'Email preview', description: resp.previewUrl }); } else { toast({ title: 'OTP sent to email' }); } } catch (err: any) { const msg = (err && err.message) ? err.message : 'Failed to send OTP'; toast({ title: 'Failed to send OTP', description: msg, variant: 'destructive' }); } }}>Send OTP</Button>
        </>
      ) : (
        <>
          <div>
            <label htmlFor="otp" className="block text-sm font-medium mb-2">Enter 6-digit code</label>
            <Input id="otp" value={otpCode} onChange={(e)=>setOtpCode(e.target.value)} maxLength={6} placeholder="123456" />
          </div>
          <Button className="w-full rounded-full" onClick={async ()=>{ try { const data = await AuthService.verifyOtp(otpEmail, otpCode); completeLoginFromToken(data.token, { email: otpEmail, name: 'User' }); toast({ title: 'Logged in' }); const from = (location.state as any)?.from?.pathname || '/'; navigate(from, { replace: true }); } catch { toast({ title: 'Invalid code', variant: 'destructive' }); } }}>Verify & Login</Button>
          <Button variant="ghost" className="w-full" onClick={async ()=>{ try { await AuthService.requestOtp(otpEmail); toast({ title: 'Code resent' }); } catch {} }}>Resend code</Button>
        </>
      )}
    </div>
  );
}

function PhoneOtpBlock({ phone, setPhone, phoneOtpSent, setPhoneOtpSent, otpCode, setOtpCode, navigate, location, toast, completeLoginFromToken }: any) {
  return (
    <div className="space-y-4">
      {!phoneOtpSent ? (
        <>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone number</label>
            <Input id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="e.g. +15551234567" />
          </div>
          <Button className="w-full rounded-full" onClick={async ()=>{ try { const resp = await AuthService.requestPhoneOtp(phone); setPhoneOtpSent(true); if (resp && resp.code) { toast({ title: 'OTP sent (dev)', description: `Code: ${resp.code}` }); } else { toast({ title: 'OTP sent to phone' }); } } catch (err: any) { const msg = (err && err.message) ? err.message : 'Failed to send OTP'; toast({ title: 'Failed to send OTP', description: msg, variant: 'destructive' }); } }}>Send OTP</Button>
        </>
      ) : (
        <>
          <div>
            <label htmlFor="phoneOtp" className="block text-sm font-medium mb-2">Enter 6-digit code</label>
            <Input id="phoneOtp" value={otpCode} onChange={(e)=>setOtpCode(e.target.value)} maxLength={6} placeholder="123456" />
          </div>
          <Button className="w-full rounded-full" onClick={async ()=>{ try { const data = await AuthService.verifyPhoneOtp(phone, otpCode); completeLoginFromToken(data.token, { name: 'User' }); toast({ title: 'Logged in' }); const from = (location.state as any)?.from?.pathname || '/'; navigate(from, { replace: true }); } catch { toast({ title: 'Invalid code', variant: 'destructive' }); } }}>Verify & Login</Button>
          <Button variant="ghost" className="w-full" onClick={async ()=>{ try { await AuthService.requestPhoneOtp(phone); toast({ title: 'Code resent' }); } catch {} }}>Resend code</Button>
        </>
      )}
    </div>
  );
}