import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: bookingId } = await params;
  const supabase = await createClient();

  const body = await request.json();
  const { staffId, role = 'technician', notes } = body;

  if (!staffId) {
    return NextResponse.json({ error: 'staffId is required' }, { status: 400 });
  }

  const { data: { user } } = await supabase.auth.getUser();

  const { data: existing } = await supabase
    .from('booking_assignments')
    .select('id')
    .eq('booking_id', bookingId)
    .eq('staff_id', staffId)
    .single();

  if (existing) {
    return NextResponse.json({ error: 'Staff already assigned' }, { status: 409 });
  }

  const { data, error } = await supabase
    .from('booking_assignments')
    .insert({
      booking_id: bookingId,
      staff_id: staffId,
      role,
      notes: notes ?? null,
      assigned_by: user?.id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ assignment: data }, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: bookingId } = await params;
  const supabase = await createClient();

  const { searchParams } = new URL(request.url);
  const staffId = searchParams.get('staffId');

  if (!staffId) {
    return NextResponse.json({ error: 'staffId is required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('booking_assignments')
    .delete()
    .eq('booking_id', bookingId)
    .eq('staff_id', staffId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
