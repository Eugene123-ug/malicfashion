import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {sent ? (
          <>
            <div className="text-center mb-10">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-border rounded-full">
                <Mail className="w-6 h-6 text-secondary" />
              </div>
              <h1 className="font-heading text-4xl mb-3">Check Your Email</h1>
              <p className="text-muted text-sm">
                If an account exists for <strong>{email}</strong>, you will
                receive a password reset link shortly.
              </p>
            </div>
            <Link
              to="/login"
              className="block w-full text-center bg-primary text-background text-xs uppercase tracking-widest py-4 hover:bg-accent transition-colors"
            >
              Back to Sign In
            </Link>
          </>
        ) : (
          <>
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-muted mb-3">
                Password Reset
              </p>
              <h1 className="font-heading text-4xl md:text-5xl mb-3">
                Forgot Your Password?
              </h1>
              <p className="text-muted text-sm">
                Enter your email and we will send a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  'w-full text-xs uppercase tracking-widest py-4 transition-colors',
                  loading
                    ? 'bg-border text-muted cursor-wait'
                    : 'bg-primary text-background hover:bg-accent',
                )}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <p className="text-center text-sm text-muted">
                <Link to="/login" className="text-primary hover:underline">
                  Back to Sign In
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}