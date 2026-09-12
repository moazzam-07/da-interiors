'use client';

import { Bell, Search, HelpCircle, LogOut, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminTopbarProps {
  adminName: string;
  adminRole: string;
}

export function AdminTopbar({ adminName, adminRole }: AdminTopbarProps) {
  const router = useRouter();
  const supabase = createClient();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mobileSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileSearchOpen) {
        setMobileSearchOpen(false);
        setSearchValue('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileSearchOpen]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <>
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <div className="admin-topbar-search">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders, customers, staff..."
              className="admin-topbar-search-input"
            />
          </div>
        </div>

        <div className="admin-topbar-right">
          <button
            className="admin-topbar-icon-btn admin-topbar-search-btn"
            onClick={() => setMobileSearchOpen(true)}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button className="admin-topbar-icon-btn" aria-label="Help">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="admin-topbar-icon-btn admin-topbar-notif" aria-label="Notifications">
            <Bell className="w-5 h-5" />
            <span className="admin-topbar-notif-dot" />
          </button>
          <div className="admin-topbar-divider" />
          <div className="admin-topbar-profile">
            <div className="admin-topbar-avatar">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div className="admin-topbar-profile-info">
              <span className="admin-topbar-profile-name">{adminName}</span>
              <span className="admin-topbar-profile-role">{adminRole}</span>
            </div>
          </div>
          <button
            className="admin-topbar-icon-btn admin-topbar-signout"
            onClick={handleSignOut}
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            className="admin-mobile-search-overlay"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <form 
              className="admin-mobile-search-bar"
              onSubmit={(e) => {
                e.preventDefault();
                if (searchValue.trim()) {
                  // In a real app, this would route to a global search page or update context
                  console.log('Searching for:', searchValue);
                  setMobileSearchOpen(false);
                }
              }}
            >
              <Search className="w-4 h-4 admin-mobile-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search orders, customers, staff..."
                className="admin-mobile-search-input"
              />
              <button
                type="button"
                className="admin-mobile-search-close"
                onClick={() => {
                  setMobileSearchOpen(false);
                  setSearchValue('');
                }}
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .admin-topbar {
          position: sticky;
          top: 0;
          z-index: 40;
          height: 72px;
          background: rgba(252, 249, 248, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--admin-outline-variant);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          gap: 16px;
        }
        .admin-topbar-left {
          flex: 1;
          max-width: 480px;
        }
        .admin-topbar-search {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--admin-surface-container-low);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 12px;
          padding: 0 16px;
          height: 44px;
          color: var(--admin-outline);
          transition: all 0.15s;
        }
        .admin-topbar-search:focus-within {
          border-color: var(--admin-primary);
          box-shadow: 0 0 0 3px rgba(0, 105, 113, 0.08);
        }
        .admin-topbar-search-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 14px;
          font-family: var(--font-jakarta);
          color: var(--admin-on-surface);
        }
        .admin-topbar-search-input::placeholder {
          color: var(--admin-outline);
        }
        .admin-topbar-right {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .admin-topbar-icon-btn {
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
          border-radius: 10px;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--admin-on-surface-variant);
          transition: all 0.15s;
          position: relative;
        }
        .admin-topbar-icon-btn:hover {
          background: var(--admin-surface-container);
          color: var(--admin-on-surface);
        }
        .admin-topbar-icon-btn:active {
          transform: scale(0.95);
        }
        .admin-topbar-notif-dot {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--admin-error);
        }
        .admin-topbar-divider {
          width: 1px;
          height: 24px;
          background: var(--admin-outline-variant);
          margin: 0 4px;
        }
        .admin-topbar-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px 8px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .admin-topbar-profile:hover {
          background: var(--admin-surface-container);
        }
        .admin-topbar-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--admin-gradient);
          color: white;
          font-family: var(--font-manrope);
          font-weight: 800;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .admin-topbar-profile-info {
          display: flex;
          flex-direction: column;
        }
        .admin-topbar-profile-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--admin-on-surface);
          line-height: 1.2;
        }
        .admin-topbar-profile-role {
          font-size: 11px;
          color: var(--admin-outline);
          text-transform: capitalize;
          line-height: 1.2;
        }
        .admin-mobile-search-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 70;
          padding: 12px 16px;
          background: rgba(252, 249, 248, 0.98);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .admin-mobile-search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--admin-surface-container-low);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 12px;
          padding: 0 16px;
          height: 48px;
          color: var(--admin-outline);
        }
        .admin-mobile-search-icon {
          flex-shrink: 0;
        }
        .admin-mobile-search-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 15px;
          font-family: var(--font-jakarta);
          color: var(--admin-on-surface);
        }
        .admin-mobile-search-input::placeholder {
          color: var(--admin-outline);
        }
        .admin-mobile-search-close {
          width: 40px;
          height: 40px;
          min-width: 40px;
          min-height: 40px;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 8px;
          color: var(--admin-on-surface-variant);
          flex-shrink: 0;
        }
        .admin-mobile-search-close:active {
          transform: scale(0.95);
        }
        @media (max-width: 768px) {
          .admin-topbar {
            padding: 0 16px 0 72px;
          }
          .admin-topbar-profile-info,
          .admin-topbar-search,
          .admin-topbar-divider,
          .admin-topbar-profile,
          .admin-topbar-signout {
            display: none;
          }
          .admin-topbar-search-btn {
            display: flex;
          }
          .admin-topbar-right {
            gap: 2px;
          }
        }
        @media (min-width: 769px) {
          .admin-topbar-search-btn {
            display: none;
          }
        }
      `}</style>
    </>
  );
}