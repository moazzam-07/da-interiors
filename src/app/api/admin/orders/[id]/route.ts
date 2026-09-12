import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from('service_bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const [{ data: assignments }, { data: statusHistory }] = await Promise.all([
    supabase
      .from('booking_assignments')
      .select('*, staff:staff(*)')
      .eq('booking_id', id),
    supabase
      .from('booking_status_history')
      .select('*')
      .eq('booking_id', id)
      .order('created_at', { ascending: true }),
  ]);

  return NextResponse.json({
    order,
    assignments: assignments ?? [],
    statusHistory: statusHistory ?? [],
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const body = await request.json();
  const { admin_notes, quoted_amount, final_amount, lead_source } = body;

  const updates: Record<string, any> = {};
  if (admin_notes !== undefined) updates.admin_notes = admin_notes;
  if (quoted_amount !== undefined) updates.quoted_amount = quoted_amount;
  if (final_amount !== undefined) updates.final_amount = final_amount;
  if (lead_source !== undefined) updates.lead_source = lead_source;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('service_bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ order: data });
}
