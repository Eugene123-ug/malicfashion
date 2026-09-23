import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

const STORAGE_KEY = 'malic_profile';

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function Settings() {
  const [profile, setProfile] = useState<Profile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { firstName: '', lastName: '', email: '', phone: '' };
  });

  const [saved, setSaved] = useState(false);

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [pwSaved, setPwSaved] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw.length < 8) return;
    setPwSaved(true);
    setCurrentPw('');
    setNewPw('');
    setTimeout(() => setPwSaved(false), 2500);
  };

  return (
    <div>
      <h2 className="font-heading text-3xl mb-6">Settings</h2>

      {/* Profile */}
      <form
        onSubmit={handleProfileSave}
        className="border border-border bg-surface p-6 mb-6"
      >
        <h3 className="font-heading text-xl mb-5">Profile Information</h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">
                First Name
              </label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="bg-primary text-background text-xs uppercase tracking-widest px-6 py-3 hover:bg-accent transition-colors"
            >
              Save Changes
            </button>
            {saved && (
              <span className="text-xs text-success flex items-center gap-1">
                <Check className="w-3 h-3" /> Saved
              </span>
            )}
          </div>
        </div>
      </form>

      {/* Password */}
      <form
        onSubmit={handlePasswordSave}
        className="border border-border bg-surface p-6"
      >
        <h3 className="font-heading text-xl mb-5">Change Password</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
            <p
              className={cn(
                'text-xs mt-1',
                newPw.length >= 8 ? 'text-success' : 'text-muted',
              )}
            >
              At least 8 characters
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={newPw.length < 8 || !currentPw}
              className={cn(
                'text-xs uppercase tracking-widest px-6 py-3 transition-colors',
                newPw.length >= 8 && currentPw
                  ? 'bg-primary text-background hover:bg-accent'
                  : 'bg-border text-muted cursor-not-allowed',
              )}
            >
              Update Password
            </button>
            {pwSaved && (
              <span className="text-xs text-success flex items-center gap-1">
                <Check className="w-3 h-3" /> Password updated
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}