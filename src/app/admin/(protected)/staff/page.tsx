'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Edit2, UserX, UserCheck, Loader2, X } from 'lucide-react';

interface Staff {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  avatar_url: string | null;
  status: string;
  skills: string[];
  notes: string | null;
  created_at: string;
}

const ALL_SKILLS = [
  'All Rounder', 'Housekeeping', 'Electrical Works', 'Air Conditioning',
  'Carpentry', 'Plumbing', 'Car Washing', 'Pest Control',
  'Camera & Security', 'Satellite Installation', 'Landscaping',
  'Deep Cleaning', 'Appliance Repair', 'Painting', 'Moving', 
  'Assembly', 'Handyman'
];

const ROLES = [
  { value: 'technician', label: 'Technician' },
  { value: 'helper', label: 'Helper' },
  { value: 'cleaner', label: 'Cleaner' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'electrician', label: 'Electrician' },
  { value: 'plumber', label: 'Plumber' }
];

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'technician',
    skills: [] as string[],
    notes: '',
  });

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/staff');
      const data = await res.json();
      setStaff(data.staff ?? []);
    } catch (err) {
      console.error('Failed to fetch staff:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const openAddModal = () => {
    setEditingStaff(null);
    setFormData({ name: '', phone: '', email: '', role: 'technician', skills: [], notes: '' });
    setShowModal(true);
  };

  const openEditModal = (member: Staff) => {
    setEditingStaff(member);
    setFormData({
      name: member.name,
      phone: member.phone,
      email: member.email,
      role: member.role,
      skills: member.skills ?? [],
      notes: member.notes ?? '',
    });
    setShowModal(true);
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingStaff ? `/api/admin/staff?id=${editingStaff.id}` : '/api/admin/staff';
      const method = editingStaff ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        fetchStaff();
      }
    } catch (err) {
      console.error('Failed to save staff:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (member: Staff) => {
    const newStatus = member.status === 'active' ? 'inactive' : 'active';
    try {
      await fetch(`/api/admin/staff?id=${member.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchStaff();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.email.toLowerCase().includes(search.toLowerCase()) ||
    member.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="staff-page">
        <div className="staff-header">
          <div>
            <h1 className="staff-title">Staff Management</h1>
            <p className="staff-subtitle">{staff.length} team members</p>
          </div>
          <button className="add-btn" onClick={openAddModal}>
            <Plus className="w-5 h-5" />
            Add Staff
          </button>
        </div>

        <div className="staff-filters">
          <div className="search-wrap">
            <Search className="w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search staff..."
              className="search-input"
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <Loader2 className="w-8 h-8 spin" />
            <span>Loading staff...</span>
          </div>
        ) : (
          <div className="staff-grid">
            {filteredStaff.map((member) => (
              <div key={member.id} className={`staff-card ${member.status === 'inactive' ? 'inactive' : ''}`}>
                <div className="staff-card-header">
                  <div className="staff-avatar">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="staff-status-badge" data-status={member.status}>
                    {member.status === 'active' ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                    {member.status}
                  </div>
                </div>
                <div className="staff-card-body">
                  <h3 className="staff-name">{member.name}</h3>
                  <span className="staff-role">{member.role}</span>
                  <div className="staff-contact">
                    <span>{member.phone}</span>
                    <span>{member.email}</span>
                  </div>
                  {member.skills && member.skills.length > 0 && (
                    <div className="staff-skills">
                      {member.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="skill-more">+{member.skills.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="staff-card-actions">
                  <button className="staff-action-btn" onClick={() => openEditModal(member)}>
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    className={`staff-action-btn ${member.status === 'active' ? 'deactivate' : 'activate'}`}
                    onClick={() => handleToggleStatus(member)}
                  >
                    {member.status === 'active' ? (
                      <>
                        <UserX className="w-4 h-4" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4" />
                        Activate
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredStaff.length === 0 && !loading && (
          <div className="empty-state">
            <p>No staff members found</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editingStaff ? 'Edit Staff Member' : 'Add Staff Member'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="form-select"
                  required
                >
                  {ROLES.map((role) => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Skills</label>
                <div className="skills-grid">
                  {ALL_SKILLS.map((skill) => (
                    <label key={skill} className={`skill-checkbox ${formData.skills.includes(skill) ? 'selected' : ''}`}>
                      <input
                        type="checkbox"
                        checked={formData.skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="skill-checkbox-input"
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="form-textarea"
                  rows={3}
                  placeholder="Additional notes..."
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn--secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 spin" />
                      Saving...
                    </>
                  ) : editingStaff ? 'Update Staff' : 'Add Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .staff-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .staff-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .staff-title {
          font-family: var(--font-manrope);
          font-size: 28px;
          font-weight: 800;
          color: var(--admin-on-surface);
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .staff-subtitle {
          font-size: 14px;
          color: var(--admin-on-surface-variant);
        }
        .add-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: var(--admin-gradient);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
        }
        .add-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 105, 113, 0.25);
        }
        .staff-filters {
          display: flex;
          gap: 12px;
        }
        .search-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          border: 1px solid var(--admin-outline-variant);
          border-radius: 10px;
          padding: 0 14px;
          height: 44px;
          min-width: 280px;
          color: var(--admin-outline);
          transition: all 0.15s;
        }
        .search-wrap:focus-within {
          border-color: var(--admin-primary);
          box-shadow: 0 0 0 3px rgba(0, 105, 113, 0.08);
        }
        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 14px;
          font-family: var(--font-jakarta);
          color: var(--admin-on-surface);
        }
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 80px;
          color: var(--admin-outline);
        }
        .empty-state {
          text-align: center;
          padding: 80px;
          color: var(--admin-outline);
        }
        .staff-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .staff-card {
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.2s;
        }
        .staff-card:hover {
          box-shadow: var(--admin-shadow);
          transform: translateY(-2px);
        }
        .staff-card.inactive {
          opacity: 0.6;
        }
        .staff-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 20px 0;
        }
        .staff-avatar {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: var(--admin-gradient);
          color: white;
          font-family: var(--font-manrope);
          font-weight: 800;
          font-size: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .staff-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          text-transform: capitalize;
        }
        .staff-status-badge[data-status="active"] {
          background: #d1fae5;
          color: #047857;
        }
        .staff-status-badge[data-status="inactive"] {
          background: #fee2e2;
          color: #b91c1c;
        }
        .staff-card-body {
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .staff-name {
          font-family: var(--font-manrope);
          font-size: 16px;
          font-weight: 700;
          color: var(--admin-on-surface);
        }
        .staff-role {
          font-size: 13px;
          color: var(--admin-primary);
          font-weight: 600;
        }
        .staff-contact {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 12px;
          color: var(--admin-outline);
          margin-top: 4px;
        }
        .staff-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }
        .skill-tag {
          padding: 4px 10px;
          background: var(--admin-surface-container-low);
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          color: var(--admin-on-surface-variant);
        }
        .skill-more {
          padding: 4px 10px;
          background: var(--admin-surface-container-high);
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          color: var(--admin-outline);
        }
        .staff-card-actions {
          display: flex;
          gap: 8px;
          padding: 16px 20px;
          border-top: 1px solid var(--admin-outline-variant);
          background: var(--admin-surface-container-low);
        }
        .staff-action-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px;
          border: 1px solid var(--admin-outline-variant);
          border-radius: 8px;
          background: white;
          font-size: 12px;
          font-weight: 600;
          color: var(--admin-on-surface);
          cursor: pointer;
          transition: all 0.15s;
        }
        .staff-action-btn:hover {
          background: var(--admin-surface-container-lowest);
          border-color: var(--admin-outline);
        }
        .staff-action-btn.deactivate:hover {
          background: #fef2f2;
          border-color: #fecaca;
          color: #b91c1c;
        }
        .staff-action-btn.activate:hover {
          background: #d1fae5;
          border-color: #6ee7b7;
          color: #047857;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 24px;
        }
        .modal-content {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .modal-title {
          font-family: var(--font-manrope);
          font-size: 18px;
          font-weight: 800;
          color: var(--admin-on-surface);
        }
        .modal-close {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: none;
          background: var(--admin-surface-container-low);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--admin-on-surface-variant);
          transition: all 0.15s;
        }
        .modal-close:hover {
          background: var(--admin-surface-container-high);
          color: var(--admin-on-surface);
        }
        .modal-form {
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--admin-outline);
        }
        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid var(--admin-outline-variant);
          border-radius: 10px;
          font-size: 14px;
          font-family: var(--font-jakarta);
          color: var(--admin-on-surface);
          background: white;
          outline: none;
          transition: all 0.15s;
        }
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: var(--admin-primary);
          box-shadow: 0 0 0 3px rgba(0, 105, 113, 0.08);
        }
        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }
        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-checkbox {
          display: inline-flex;
          align-items: center;
          padding: 8px 14px;
          border: 1px solid var(--admin-outline-variant);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          color: var(--admin-on-surface-variant);
          cursor: pointer;
          transition: all 0.15s;
        }
        .skill-checkbox:hover {
          border-color: var(--admin-primary);
        }
        .skill-checkbox.selected {
          background: var(--admin-primary);
          border-color: var(--admin-primary);
          color: white;
        }
        .skill-checkbox-input {
          display: none;
        }
        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding-top: 8px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .btn--secondary {
          background: var(--admin-surface-container-low);
          border: 1px solid var(--admin-outline-variant);
          color: var(--admin-on-surface);
        }
        .btn--secondary:hover:not(:disabled) {
          background: var(--admin-surface-container);
        }
        .btn--primary {
          background: var(--admin-gradient);
          border: none;
          color: white;
        }
        .btn--primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 105, 113, 0.25);
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
