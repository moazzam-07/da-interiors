import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: offers, error } = await supabase
      .from('offers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return Response.json({ ok: true, offers });
  } catch (error) {
    console.error('Offers API error:', error);
    return Response.json({ ok: false, error: 'Failed to fetch offers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { data: offer, error } = await supabase
      .from('offers')
      .insert({
        title: body.title,
        description: body.description,
        discount_type: body.discount_type,
        discount_value: body.discount_value,
        valid_from: body.valid_from,
        valid_until: body.valid_until,
        applicable_services: body.applicable_services,
        banner_image_url: body.banner_image_url,
        is_active: body.is_active ?? true,
        is_featured: body.is_featured ?? false,
      })
      .select()
      .single();

    if (error) throw error;

    return Response.json({ ok: true, offer }, { status: 201 });
  } catch (error) {
    console.error('Create offer error:', error);
    return Response.json({ ok: false, error: 'Failed to create offer' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    if (!body.id) {
      return Response.json({ ok: false, error: 'Offer ID is required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    const allowedFields = [
      'title', 'description', 'discount_type', 'discount_value',
      'valid_from', 'valid_until', 'applicable_services', 'banner_image_url',
      'is_active', 'is_featured'
    ];

    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field];
      }
    }

    const { data: offer, error } = await supabase
      .from('offers')
      .update(updateData)
      .eq('id', body.id)
      .select()
      .single();

    if (error) throw error;

    return Response.json({ ok: true, offer });
  } catch (error) {
    console.error('Update offer error:', error);
    return Response.json({ ok: false, error: 'Failed to update offer' }, { status: 500 });
  }
}
