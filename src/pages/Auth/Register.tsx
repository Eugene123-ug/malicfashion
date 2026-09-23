import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordChecks = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'Contains a number', ok: /\d/.test(password) },
    { label: 'Contains a letter', ok: /[a-zA-Z]/.test(password) },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!passwordChecks.every((c) => c.ok)) {
      setError('Password does not meet the requirements.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-3">
            Join Us
          </p>
          <h1 className="font-heading text-4xl md:text-5xl mb-3">
            Create Account
          </h1>
          <p className="text-muted text-sm">
            Start your MalicFashion journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
                autoComplete="given-name"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
                autoComplete="family-name"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border bg-surface px-4 py-3 pr-12 text-sm focus:outline-none focus:border-primary"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-muted hover:text-primary"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <ul className="mt-3 space-y-1">
              {passwordChecks.map((c) => (
                <li
                  key={c.label}
                  className={cn(
                    'flex items-center gap-2 text-xs',
                    c.ok ? 'text-success' : 'text-muted',
                  )}
                >
                  <Check className={cn('w-3 h-3', c.ok ? 'opacity-100' : 'opacity-40')} />
                  {c.label}
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <div className="border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
              {error}
            </div>
          )}

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
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-muted pt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}