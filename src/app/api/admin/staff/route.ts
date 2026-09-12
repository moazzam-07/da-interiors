import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let query = supabase
    .from('staff')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ staff: data ?? [] });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const body = await request.json();
  const { name, phone, email, role, skills, notes } = body;

  if (!name || !phone || !email || !role) {
    return NextResponse.json({ error: 'Name, phone, email, and role are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('staff')
    .insert({
      name,
      phone,
      email,
      role,
      skills: skills ?? [],
      notes: notes ?? null,
      status: 'active',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ staff: data }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Staff ID is required' }, { status: 400 });
  }

  const body = await request.json();
  const { name, phone, email, role, status, skills, notes } = body;

  const updates: Record<string, any> = {};
  if (name !== undefined) updates.name = name;
  if (phone !== undefined) updates.phone = phone;
  if (email !== undefined) updates.email = email;
  if (role !== undefined) updates.role = role;
  if (status !== undefined) updates.status = status;
  if (skills !== undefined) updates.skills = skills;
  if (notes !== undefined) updates.notes = notes;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from('staff')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ staff: data });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Staff ID is required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('staff')
    .update({ status: 'inactive' })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
