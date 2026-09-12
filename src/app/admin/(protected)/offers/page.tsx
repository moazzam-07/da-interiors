'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Tag, Plus, X, Pencil, Trash2, Star, Calendar } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount_type: 'percentage' | 'fixed' | 'custom';
  discount_value: number;
  valid_from: string;
  valid_until: string;
  applicable_services: string[];
  banner_image_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
}

const SERVICE_OPTIONS = [
  { value: 'ac-maintenance', label: 'AC Maintenance' },
  { value: 'deep-cleaning', label: 'Deep Cleaning' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'general-maintenance', label: 'General Maintenance' },
  { value: 'painting', label: 'Painting & Decorating' },
];

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const supabase = createClient();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount_type: 'percentage' as 'percentage' | 'fixed' | 'custom',
    discount_value: 0,
    valid_from: '',
    valid_until: '',
    applicable_services: [] as string[],
    banner_image_url: '',
    is_featured: false,
  });

  useEffect(() => {
    async function loadOffers() {
      const { data } = await supabase.from('offers').select('*').order('created_at', { ascending: false });
      setOffers(data ?? []);
      setLoading(false);
    }
    loadOffers();
  }, [supabase, refreshTrigger]);

  async function toggleActive(offer: Offer) {
    await supabase.from('offers').update({ is_active: !offer.is_active }).eq('id', offer.id);
    setRefreshTrigger(t => t + 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingOffer) {
      await supabase.from('offers').update(formData).eq('id', editingOffer.id);
    } else {
      await supabase.from('offers').insert({ ...formData, is_active: true });
    }
    setShowModal(false);
    resetForm();
    setRefreshTrigger(t => t + 1);
  }

  async function handleDelete(id: string) {
    await supabase.from('offers').delete().eq('id', id);
    setDeleteConfirm(null);
    setRefreshTrigger(t => t + 1);
  }

  function resetForm() {
    setFormData({
      title: '',
      description: '',
      discount_type: 'percentage',
      discount_value: 0,
      valid_from: '',
      valid_until: '',
      applicable_services: [],
      banner_image_url: '',
      is_featured: false,
    });
    setEditingOffer(null);
  }

  function openEdit(offer: Offer) {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      discount_type: offer.discount_type,
      discount_value: offer.discount_value,
      valid_from: offer.valid_from,
      valid_until: offer.valid_until,
      applicable_services: offer.applicable_services ?? [],
      banner_image_url: offer.banner_image_url ?? '',
      is_featured: offer.is_featured,
    });
    setShowModal(true);
  }

  function toggleService(service: string) {
    setFormData(prev => ({
      ...prev,
      applicable_services: prev.applicable_services.includes(service)
        ? prev.applicable_services.filter(s => s !== service)
        : [...prev.applicable_services, service],
    }));
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Offers</h1>
          <p className="page-subtitle">{offers.length} offers</p>
        </div>
        <button className="btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
          <Plus className="w-4 h-4" />
          New Offer
        </button>
      </div>

      <div className="offers-grid">
        {offers.map(offer => (
          <div key={offer.id} className={`offer-card ${!offer.is_active ? 'inactive' : ''}`}>
            <div className="offer-header">
              <div className="offer-badge">
                <Tag className="w-3 h-3" />
                {offer.discount_type === 'percentage' && `${offer.discount_value}% OFF`}
                {offer.discount_type === 'fixed' && `$${offer.discount_value} OFF`}
                {offer.discount_type === 'custom' && 'Special Offer'}
              </div>
              <label className="toggle">
                <input type="checkbox" checked={offer.is_active} onChange={() => toggleActive(offer)} />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <h3 className="offer-title">{offer.title}</h3>
            <p className="offer-description">{offer.description}</p>
            <div className="offer-services">
              {offer.applicable_services?.slice(0, 3).map(s => (
                <span key={s} className="service-tag">{s}</span>
              ))}
              {(offer.applicable_services?.length ?? 0) > 3 && (
                <span className="service-tag">+{(offer.applicable_services?.length ?? 0) - 3}</span>
              )}
            </div>
            <div className="offer-footer">
              <div className="offer-dates">
                <Calendar className="w-3 h-3" />
                {new Date(offer.valid_until) < new Date() ? (
                  <span className="expired">Expired</span>
                ) : (
                  <span>Until {new Date(offer.valid_until).toLocaleDateString()}</span>
                )}
              </div>
              {offer.is_featured && <Star className="w-4 h-4 featured-star" />}
            </div>
            <div className="offer-actions">
              <button className="btn-icon" onClick={() => openEdit(offer)}><Pencil className="w-4 h-4" /></button>
              <button className="btn-icon btn-danger" onClick={() => setDeleteConfirm(offer.id)}><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {offers.length === 0 && (
          <div className="empty-state">
            <Tag className="w-12 h-12" />
            <p>No offers yet. Create your first offer!</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingOffer ? 'Edit Offer' : 'New Offer'}</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={formData.title} onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} rows={3} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Discount Type</label>
                  <select value={formData.discount_type} onChange={e => setFormData(prev => ({ ...prev, discount_type: e.target.value as 'percentage' | 'fixed' | 'custom' }))}>
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Discount Value</label>
                  <input type="number" value={formData.discount_value} onChange={e => setFormData(prev => ({ ...prev, discount_value: Number(e.target.value) }))} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Valid From</label>
                  <input type="date" value={formData.valid_from} onChange={e => setFormData(prev => ({ ...prev, valid_from: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Valid Until</label>
                  <input type="date" value={formData.valid_until} onChange={e => setFormData(prev => ({ ...prev, valid_until: e.target.value }))} required />
                </div>
              </div>
              <div className="form-group">
                <label>Applicable Services</label>
                <div className="services-grid">
                  {SERVICE_OPTIONS.map(s => (
                    <label key={s.value} className="checkbox-label">
                      <input type="checkbox" checked={formData.applicable_services.includes(s.value)} onChange={() => toggleService(s.value)} />
                      {s.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Banner Image URL</label>
                <input type="url" value={formData.banner_image_url} onChange={e => setFormData(prev => ({ ...prev, banner_image_url: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" checked={formData.is_featured} onChange={e => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))} />
                  Featured Offer
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">{editingOffer ? 'Update' : 'Create'} Offer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal modal-sm" onClick={e => e.stopPropagation()}>
            <h3>Delete Offer?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
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
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--admin-gradient);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-primary:hover { opacity: 0.9; }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--admin-surface-container-low);
          color: var(--admin-on-surface);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-danger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--admin-error);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: var(--admin-surface-container-low);
          border: none;
          border-radius: 8px;
          color: var(--admin-on-surface-variant);
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-icon:hover { background: var(--admin-surface-container-high); color: var(--admin-on-surface); }
        .btn-icon.btn-danger:hover { background: #fee2e2; color: var(--admin-error); }
        .offers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .offer-card {
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 16px;
          padding: 20px;
          position: relative;
        }
        .offer-card.inactive { opacity: 0.6; }
        .offer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .offer-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          background: var(--admin-primary-container);
          color: var(--admin-primary);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
        }
        .toggle {
          position: relative;
          width: 44px;
          height: 24px;
        }
        .toggle input { opacity: 0; width: 0; height: 0; }
        .toggle-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background: var(--admin-outline-variant);
          border-radius: 24px;
          transition: 0.2s;
        }
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background: white;
          border-radius: 50%;
          transition: 0.2s;
        }
        .toggle input:checked + .toggle-slider { background: var(--admin-primary); }
        .toggle input:checked + .toggle-slider:before { transform: translateX(20px); }
        .offer-title {
          font-family: var(--font-manrope);
          font-size: 18px;
          font-weight: 700;
          color: var(--admin-on-surface);
          margin: 0 0 8px;
        }
        .offer-description {
          font-size: 13px;
          color: var(--admin-on-surface-variant);
          margin: 0 0 12px;
          line-height: 1.5;
        }
        .offer-services {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }
        .service-tag {
          padding: 2px 8px;
          background: var(--admin-surface-container-low);
          border-radius: 4px;
          font-size: 11px;
          color: var(--admin-on-surface-variant);
        }
        .offer-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .offer-dates {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--admin-on-surface-variant);
        }
        .offer-dates .expired { color: var(--admin-error); }
        .featured-star { color: #f59e0b; }
        .offer-actions {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          gap: 4px;
        }
        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 64px;
          color: var(--admin-on-surface-variant);
        }
        .empty-state svg { margin-bottom: 16px; opacity: 0.5; }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
        }
        .modal {
          background: var(--admin-surface-container-lowest);
          border-radius: 20px;
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal.modal-sm { max-width: 400px; }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .modal-header h2 {
          font-family: var(--font-manrope);
          font-size: 20px;
          font-weight: 800;
          margin: 0;
        }
        .modal-form { padding: 24px; }
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--admin-outline-variant);
        }
        .form-group { margin-bottom: 16px; }
        .form-group label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: var(--admin-on-surface-variant);
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .form-group input, .form-group select, .form-group textarea {
          width: 100%;
          padding: 10px 14px;
          background: var(--admin-surface-container-low);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 10px;
          font-size: 14px;
          color: var(--admin-on-surface);
          font-family: var(--font-jakarta);
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          outline: none;
          border-color: var(--admin-primary);
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; }
        .checkbox-label input { width: 18px; height: 18px; }
        .loading { padding: 64px; text-align: center; color: var(--admin-on-surface-variant); }
      `}</style>
    </>
  );
}
