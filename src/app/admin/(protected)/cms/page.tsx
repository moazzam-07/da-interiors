'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FileText, Plus, X, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  tags: string[] | null;
  created_at: string;
}

export default function CMSPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const supabase = createClient();

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    cover_image_url: '',
    tags: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
  });

  useEffect(() => {
    async function loadPosts() {
      const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      setPosts(data ?? []);
      setLoading(false);
    }
    loadPosts();
  }, [supabase, refreshTrigger]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
    const payload = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      cover_image_url: formData.cover_image_url || null,
      tags: tagsArray,
      status: formData.status,
      published_at: formData.status === 'published' ? new Date().toISOString() : null,
    };

    if (editingPost) {
      await supabase.from('blog_posts').update(payload).eq('id', editingPost.id);
    } else {
      await supabase.from('blog_posts').insert(payload);
    }
    setShowModal(false);
    resetForm();
    setRefreshTrigger(t => t + 1);
  }

  async function handleDelete(id: string) {
    await supabase.from('blog_posts').delete().eq('id', id);
    setDeleteConfirm(null);
    setRefreshTrigger(t => t + 1);
  }

  async function togglePublish(post: BlogPost) {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    await supabase.from('blog_posts').update({
      status: newStatus,
      published_at: newStatus === 'published' ? new Date().toISOString() : null,
    }).eq('id', post.id);
    setRefreshTrigger(t => t + 1);
  }

  function resetForm() {
    setFormData({ title: '', excerpt: '', content: '', cover_image_url: '', tags: '', status: 'draft' });
    setEditingPost(null);
  }

  function openEdit(post: BlogPost) {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt ?? '',
      content: post.content ?? '',
      cover_image_url: post.cover_image_url ?? '',
      tags: post.tags?.join(', ') ?? '',
      status: post.status,
    });
    setShowModal(true);
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'published': return { bg: '#d1fae5', color: '#047857' };
      case 'draft': return { bg: '#fef3c7', color: '#b45309' };
      case 'archived': return { bg: '#f3f4f6', color: '#374151' };
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
          <h1 className="page-title">Content Management</h1>
          <p className="page-subtitle">{posts.length} posts</p>
        </div>
        <button className="btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="posts-table-container">
        <table className="posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Tags</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => {
              const statusStyle = getStatusColor(post.status);
              return (
                <tr key={post.id}>
                  <td className="post-title">{post.title}</td>
                  <td className="post-slug">/{post.slug}</td>
                  <td>
                    <span className="status-pill" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                      {post.status}
                    </span>
                  </td>
                  <td>
                    <div className="tags-list">
                      {post.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                      {(post.tags?.length ?? 0) > 2 && <span className="tag">+{(post.tags?.length ?? 0) - 2}</span>}
                    </div>
                  </td>
                  <td>{post.published_at ? new Date(post.published_at).toLocaleDateString() : '—'}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" onClick={() => togglePublish(post)} title={post.status === 'published' ? 'Unpublish' : 'Publish'}>
                        {post.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button className="btn-icon" onClick={() => openEdit(post)}><Pencil className="w-4 h-4" /></button>
                      <button className="btn-icon btn-danger" onClick={() => setDeleteConfirm(post.id)}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {posts.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-state">
                  <FileText className="w-12 h-12" />
                  <p>No blog posts yet. Create your first post!</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingPost ? 'Edit Post' : 'New Post'}</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={formData.title} onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Excerpt</label>
                <textarea value={formData.excerpt} onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))} rows={2} />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea value={formData.content} onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))} rows={8} required />
              </div>
              <div className="form-group">
                <label>Cover Image URL</label>
                <input type="url" value={formData.cover_image_url} onChange={e => setFormData(prev => ({ ...prev, cover_image_url: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input type="text" value={formData.tags} onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))} placeholder="e.g. cleaning, maintenance, tips" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' | 'archived' }))}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">{editingPost ? 'Update' : 'Create'} Post</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal modal-sm" onClick={e => e.stopPropagation()}>
            <h3>Delete Post?</h3>
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
        .posts-table-container {
          background: var(--admin-surface-container-lowest);
          border-radius: 16px;
          border: 1px solid var(--admin-outline-variant);
          overflow: hidden;
        }
        .posts-table {
          width: 100%;
          border-collapse: collapse;
        }
        .posts-table th {
          text-align: left;
          padding: 14px 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--admin-on-surface-variant);
          background: var(--admin-surface-container-low);
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .posts-table td {
          padding: 14px 20px;
          font-size: 13px;
          color: var(--admin-on-surface);
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .posts-table tbody tr:hover { background: var(--admin-surface-container-low); }
        .posts-table tbody tr:last-child td { border-bottom: none; }
        .post-title { font-weight: 600; }
        .post-slug { font-family: monospace; color: var(--admin-primary); }
        .status-pill {
          display: inline-flex;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          text-transform: capitalize;
        }
        .tags-list { display: flex; gap: 4px; flex-wrap: wrap; }
        .tag {
          padding: 2px 8px;
          background: var(--admin-surface-container-low);
          border-radius: 4px;
          font-size: 11px;
          color: var(--admin-on-surface-variant);
        }
        .action-buttons { display: flex; gap: 4px; }
        .empty-state {
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
          max-width: 640px;
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
        .loading { padding: 64px; text-align: center; color: var(--admin-on-surface-variant); }
      `}</style>
    </>
  );
}
