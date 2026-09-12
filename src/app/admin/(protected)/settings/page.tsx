'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Building2, Users, Save, Check } from 'lucide-react';

interface AdminProfile {
  id: string;
  display_name: string;
  role: string;
}

export default function SettingsPage() {
  const [admins, setAdmins] = useState<AdminProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  const [companyInfo, setCompanyInfo] = useState({
    siteName: 'Kydmah',
    phone: '+1 (555) 123-4567',
    email: 'hello@kydmah.com',
    address: '123 Service Street, City, State 12345',
    whatsapp: '+1 (555) 123-4567',
  });

  useEffect(() => {
    async function loadAdmins() {
      const { data } = await supabase.from('admin_profiles').select('*').order('display_name');
      setAdmins(data ?? []);
      setLoading(false);
    }
    loadAdmins();
  }, [supabase]);

  function handleSaveCompanyInfo(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function getRoleBadgeColor(role: string) {
    switch (role) {
      case 'super_admin': return { bg: '#dbeafe', color: '#1d4ed8' };
      case 'admin': return { bg: '#d1fae5', color: '#047857' };
      case 'staff': return { bg: '#fef3c7', color: '#b45309' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your platform settings</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <div className="section-header">
            <Building2 className="w-5 h-5" />
            <h2>Company Information</h2>
          </div>
          <form onSubmit={handleSaveCompanyInfo} className="settings-form">
            <div className="form-group">
              <label>Site Name</label>
              <input
                type="text"
                value={companyInfo.siteName}
                onChange={e => setCompanyInfo(prev => ({ ...prev, siteName: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={companyInfo.phone}
                onChange={e => setCompanyInfo(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={companyInfo.email}
                onChange={e => setCompanyInfo(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={companyInfo.address}
                onChange={e => setCompanyInfo(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>WhatsApp</label>
              <input
                type="text"
                value={companyInfo.whatsapp}
                onChange={e => setCompanyInfo(prev => ({ ...prev, whatsapp: e.target.value }))}
              />
            </div>
            <button type="submit" className="btn-save">
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </form>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Users className="w-5 h-5" />
            <h2>Admin Users</h2>
          </div>
          <div className="admins-list">
            {admins.map(admin => {
              const roleStyle = getRoleBadgeColor(admin.role);
              return (
                <div key={admin.id} className="admin-item">
                  <div className="admin-avatar">
                    {admin.display_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="admin-info">
                    <span className="admin-name">{admin.display_name}</span>
                    <span className="admin-role" style={{ background: roleStyle.bg, color: roleStyle.color }}>
                      {admin.role.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
            {admins.length === 0 && (
              <p className="no-admins">No admin users found</p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .page-header {
          margin-bottom: 32px;
        }
        .page-title {
          font-family: var(--font-manrope);
          font-size: 28px;
          font-weight: 800;
          color: var(--admin-on-surface);
          margin: 0 0 4px;
        }
        .page-subtitle {
          font-size: 14px;
          color: var(--admin-on-surface-variant);
          margin: 0;
        }
        .settings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .settings-section {
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 16px;
          padding: 24px;
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .section-header svg {
          color: var(--admin-primary);
        }
        .section-header h2 {
          font-family: var(--font-manrope);
          font-size: 18px;
          font-weight: 800;
          color: var(--admin-on-surface);
          margin: 0;
        }
        .settings-form { display: flex; flex-direction: column; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label {
          font-size: 12px;
          font-weight: 700;
          color: var(--admin-on-surface-variant);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .form-group input {
          padding: 10px 14px;
          background: var(--admin-surface-container-low);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 10px;
          font-size: 14px;
          color: var(--admin-on-surface);
          font-family: var(--font-jakarta);
        }
        .form-group input:focus {
          outline: none;
          border-color: var(--admin-primary);
        }
        .btn-save {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--admin-gradient);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          transition: opacity 0.15s;
        }
        .btn-save:hover { opacity: 0.9; }
        .admins-list { display: flex; flex-direction: column; gap: 12px; }
        .admin-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
          background: var(--admin-surface-container-low);
          border-radius: 12px;
        }
        .admin-avatar {
          width: 40px;
          height: 40px;
          background: var(--admin-gradient);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: var(--font-manrope);
          font-size: 16px;
          font-weight: 800;
        }
        .admin-info { display: flex; flex-direction: column; gap: 4px; }
        .admin-name {
          font-weight: 600;
          font-size: 14px;
          color: var(--admin-on-surface);
        }
        .admin-role {
          display: inline-flex;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          text-transform: capitalize;
          width: fit-content;
        }
        .no-admins {
          text-align: center;
          padding: 32px;
          color: var(--admin-on-surface-variant);
          font-size: 14px;
        }
        .loading {
          padding: 64px;
          text-align: center;
          color: var(--admin-on-surface-variant);
        }
      `}</style>
    </>
  );
}
