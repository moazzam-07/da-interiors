'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  UserCircle,
  Tag,
  FileText,
  Star,
  BarChart3,
  Settings,
  X,
  Menu,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/staff', label: 'Staff', icon: Users },
  { href: '/admin/customers', label: 'Customers', icon: UserCircle },
  { href: '/admin/offers', label: 'Offers', icon: Tag },
  { href: '/admin/cms', label: 'CMS', icon: FileText },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

interface AdminSidebarProps {
  adminName?: string;
  adminRole?: string;
}

export function AdminSidebar({ adminName, adminRole }: AdminSidebarProps = {}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragControls = useDragControls();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    const { useRouter } = await import('next/navigation');
    await supabase.auth.signOut();
    useRouter().push('/admin/login');
    useRouter().refresh();
  };

  return (
    <>
      <button
        className="admin-sidebar-mobile-toggle"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="admin-sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`admin-sidebar${mobileOpen ? ' admin-sidebar--open' : ''}`}
        drag={mobileOpen ? "x" : false}
        dragControls={dragControls}
        dragMomentum={false}
        dragConstraints={{ left: -260, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x < -80) {
            setMobileOpen(false);
          }
        }}
        initial={false}
        animate={isMobile ? (mobileOpen ? 'open' : 'closed') : 'desktop'}
        variants={{
          open: { x: 0 },
          closed: { x: -260 },
          desktop: { x: 0 },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="admin-sidebar-header">
          <Link href="/admin" className="admin-logo" onClick={() => setMobileOpen(false)}>
            <div className="admin-logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <span className="admin-logo-name">DA Interiors</span>
              <span className="admin-logo-sub">Studio Management</span>
            </div>
          </Link>
          <button
            className="admin-sidebar-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item${active ? ' admin-nav-item--active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          {adminName && (
            <div className="admin-sidebar-profile">
              <div className="admin-sidebar-avatar">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <div className="admin-sidebar-profile-info">
                <span className="admin-sidebar-profile-name">{adminName}</span>
                <span className="admin-sidebar-profile-role">{adminRole}</span>
              </div>
            </div>
          )}

          <Link href="/" className="admin-nav-item" target="_blank">
            <ExternalLink className="w-5 h-5" />
            <span>View Website</span>
          </Link>

          <button className="admin-nav-item admin-nav-signout" onClick={handleSignOut}>
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>

      <style>{`
        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 260px;
          height: 100vh;
          background: var(--admin-surface-container-lowest);
          border-right: 1px solid var(--admin-outline-variant);
          display: flex;
          flex-direction: column;
          z-index: 50;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .admin-sidebar-header {
          padding: 24px 20px 20px;
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .admin-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .admin-logo-icon {
          width: 40px;
          height: 40px;
          background: var(--admin-gradient);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }
        .admin-logo-name {
          display: block;
          font-family: var(--font-manrope);
          font-weight: 800;
          font-size: 16px;
          color: var(--admin-on-surface);
          letter-spacing: -0.02em;
        }
        .admin-logo-sub {
          display: block;
          font-size: 11px;
          color: var(--admin-outline);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .admin-sidebar-nav {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          color: var(--admin-on-surface-variant);
          transition: all 0.15s ease;
          cursor: pointer;
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          font-family: var(--font-jakarta);
        }
        .admin-nav-item:hover {
          background: var(--admin-surface-container);
          color: var(--admin-on-surface);
        }
        .admin-nav-item:active {
          transform: scale(0.97);
        }
        .admin-nav-item--active {
          background: white;
          color: var(--admin-primary);
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .admin-sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid var(--admin-outline-variant);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .admin-sidebar-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          margin-bottom: 4px;
        }
        .admin-sidebar-avatar {
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
          flex-shrink: 0;
        }
        .admin-sidebar-profile-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .admin-sidebar-profile-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--admin-on-surface);
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .admin-sidebar-profile-role {
          font-size: 11px;
          color: var(--admin-outline);
          text-transform: capitalize;
          line-height: 1.2;
        }
        .admin-nav-signout {
          color: var(--admin-error);
        }
        .admin-nav-signout:hover {
          background: #fef2f2;
          color: var(--admin-error);
        }
        .admin-sidebar-mobile-toggle {
          display: none;
          position: fixed;
          top: 12px;
          left: 12px;
          z-index: 60;
          width: 48px;
          height: 48px;
          min-width: 48px;
          min-height: 48px;
          background: white;
          border: 1px solid var(--admin-outline-variant);
          border-radius: 12px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .admin-sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 49;
        }
        .admin-sidebar-close {
          display: none;
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          min-width: 40px;
          min-height: 40px;
          background: transparent;
          border: none;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          color: var(--admin-on-surface-variant);
        }
        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar-mobile-toggle {
            display: flex;
          }
          .admin-sidebar-overlay {
            display: block;
          }
          .admin-sidebar-close {
            display: flex;
          }
        }
        @media (max-width: 640px) {
          .admin-nav-signout {
            color: var(--admin-error);
          }
        }
      `}</style>
    </>
  );
}