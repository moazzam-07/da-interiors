'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../(protected)/admin.css';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    setTransitioning(true);
    await new Promise((r) => setTimeout(r, 1200));
    router.push('/admin');
    router.refresh();
  };

  return (
    <>
      <div className="login-page">
        <AnimatePresence>
          {!transitioning ? (
            <motion.div
              key="login-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="login-card"
            >
              <div className="login-header">
                <motion.div
                  className="login-logo"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
                <motion.h1
                  className="login-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  Kydmah Admin
                </motion.h1>
                <motion.p
                  className="login-subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Sign in to your operations panel
                </motion.p>
              </div>

              <form onSubmit={handleLogin} className="login-form">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="login-error"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <motion.div
                  className="login-field"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <label className="login-label">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@kydmah.com"
                    className="login-input"
                    required
                    autoComplete="email"
                  />
                </motion.div>

                <motion.div
                  className="login-field"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="login-label">Password</label>
                  <div className="login-password-wrap">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="login-input login-input--password"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="login-submit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="login-spinner"
                      />
                      Signing in...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Sign in
                    </motion.span>
                  )}
                </motion.button>
              </form>

              <motion.div
                className="login-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <a href="/" className="login-back">← Back to website</a>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="transition"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="login-card login-transition-card"
            >
              <motion.div
                className="login-logo login-logo--large"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="login-transition-text"
              >
                Entering Admin Panel...
              </motion.p>
              <motion.div
                className="login-progress-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          background: var(--admin-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: var(--font-jakarta);
        }
        .login-card {
          width: 100%;
          max-width: 420px;
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 24px;
          padding: 40px;
          box-shadow: var(--admin-shadow);
        }
        .login-transition-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          min-height: 360px;
        }
        .login-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .login-logo {
          width: 56px;
          height: 56px;
          background: var(--admin-gradient);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 20px;
        }
        .login-logo--large {
          width: 72px;
          height: 72px;
          border-radius: 20px;
        }
        .login-title {
          font-family: var(--font-manrope);
          font-size: 24px;
          font-weight: 800;
          color: var(--admin-on-surface);
          margin-bottom: 6px;
          letter-spacing: -0.02em;
        }
        .login-subtitle {
          font-size: 14px;
          color: var(--admin-outline);
        }
        .login-transition-text {
          font-family: var(--font-manrope);
          font-size: 18px;
          font-weight: 700;
          color: var(--admin-primary);
          text-align: center;
        }
        .login-progress-bar {
          width: 100%;
          max-width: 240px;
          height: 3px;
          background: var(--admin-gradient);
          border-radius: 999px;
          transform-origin: left;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .login-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          color: var(--admin-error);
          font-size: 13px;
          font-weight: 500;
        }
        .login-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .login-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--admin-on-surface-variant);
        }
        .login-input {
          width: 100%;
          height: 48px;
          border: 1px solid var(--admin-outline-variant);
          border-radius: 12px;
          padding: 0 16px;
          font-size: 14px;
          font-family: var(--font-jakarta);
          color: var(--admin-on-surface);
          background: white;
          outline: none;
          transition: all 0.15s;
        }
        .login-input:focus {
          border-color: var(--admin-primary);
          box-shadow: 0 0 0 3px rgba(0, 105, 113, 0.08);
        }
        .login-input::placeholder {
          color: var(--admin-outline);
        }
        .login-password-wrap {
          position: relative;
        }
        .login-input--password {
          padding-right: 48px;
        }
        .login-password-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--admin-outline);
          display: flex;
          align-items: center;
          padding: 4px;
        }
        .login-submit {
          width: 100%;
          height: 50px;
          background: var(--admin-gradient);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          font-family: var(--font-jakarta);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          margin-top: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 105, 113, 0.15);
        }
        .login-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 105, 113, 0.25), 0 0 0 2px rgba(0, 105, 113, 0.1);
        }
        .login-submit:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 4px 10px rgba(0, 105, 113, 0.15);
        }
        .login-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .login-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
        }
        .login-footer {
          margin-top: 28px;
          text-align: center;
        }
        .login-back {
          font-size: 13px;
          color: var(--admin-outline);
          text-decoration: none;
          transition: color 0.15s;
        }
        .login-back:hover {
          color: var(--admin-primary);
        }
        @media (max-width: 480px) {
          .login-card {
            padding: 28px 20px;
            border-radius: 20px;
          }
          .login-page {
            padding: 16px;
          }
          .login-title {
            font-size: 20px;
          }
          .login-header {
            margin-bottom: 24px;
          }
        }
      `}</style>
    </>
  );
}
