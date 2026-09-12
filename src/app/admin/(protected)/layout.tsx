import type { Metadata } from 'next';
import { Manrope, Plus_Jakarta_Sans } from 'next/font/google';
import './admin.css';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DA Interiors Studio Admin',
  description: 'DA Interiors Studio Operations Panel',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('display_name, role')
    .eq('id', user.id)
    .single();

  return (
    <div className="admin-root">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar adminName={profile?.display_name ?? user.email?.split('@')[0] ?? 'Admin'} adminRole={profile?.role ?? 'admin'} />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
