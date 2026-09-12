'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';

interface AdminNotesFormProps {
  orderId: string;
  initialNotes: string;
  initialQuoted: number | null;
  initialFinal: number | null;
  initialLeadSource: string;
}

const LEAD_SOURCES = ['Website', 'Phone', 'Walk-in', 'Referral', 'Social Media', 'Partner', 'Other'];

export function AdminNotesForm({ orderId, initialNotes, initialQuoted, initialFinal, initialLeadSource }: AdminNotesFormProps) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes);
  const [quotedAmount, setQuotedAmount] = useState(initialQuoted?.toString() ?? '');
  const [finalAmount, setFinalAmount] = useState(initialFinal?.toString() ?? '');
  const [leadSource, setLeadSource] = useState(initialLeadSource);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          admin_notes: notes,
          quoted_amount: quotedAmount ? parseFloat(quotedAmount) : null,
          final_amount: finalAmount ? parseFloat(finalAmount) : null,
          lead_source: leadSource || null,
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        router.refresh();
      }
    } catch (err) {
      console.error('Failed to save:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="detail-card">
        <div className="detail-card-header">
          <h2 className="detail-card-title">Admin Notes & Pricing</h2>
        </div>
        <div className="detail-card-body">
          <div className="form-group">
            <label className="form-label">Admin Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal notes about this booking..."
              className="form-textarea"
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Quoted Amount ($)</label>
              <input
                type="number"
                value={quotedAmount}
                onChange={(e) => setQuotedAmount(e.target.value)}
                placeholder="0.00"
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Final Amount ($)</label>
              <input
                type="number"
                value={finalAmount}
                onChange={(e) => setFinalAmount(e.target.value)}
                placeholder="0.00"
                className="form-input"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Lead Source</label>
            <select
              value={leadSource}
              onChange={(e) => setLeadSource(e.target.value)}
              className="form-select"
            >
              <option value="">Select source...</option>
              {LEAD_SOURCES.map((source) => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          <button
            className={`save-btn ${saved ? 'saved' : ''}`}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 spin" />
                Saving...
              </>
            ) : saved ? (
              <>
                <Save className="w-4 h-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
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
          min-height: 100px;
        }
        .form-select {
          cursor: pointer;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .save-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px 20px;
          background: var(--admin-gradient);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
          margin-top: 4px;
        }
        .save-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 105, 113, 0.25);
        }
        .save-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .save-btn.saved {
          background: #059669;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
