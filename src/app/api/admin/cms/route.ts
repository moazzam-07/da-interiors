import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return Response.json({ ok: true, posts });
  } catch (error) {
    console.error('CMS API error:', error);
    return Response.json({ ok: false, error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const slug = body.slug || body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert({
        title: body.title,
        slug,
        excerpt: body.excerpt,
        content: body.content,
        cover_image_url: body.cover_image_url,
        tags: body.tags,
        status: body.status ?? 'draft',
        published_at: body.status === 'published' ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) throw error;

    return Response.json({ ok: true, post }, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return Response.json({ ok: false, error: 'Failed to create post' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    if (!body.id) {
      return Response.json({ ok: false, error: 'Post ID is required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    const allowedFields = ['title', 'slug', 'excerpt', 'content', 'cover_image_url', 'tags', 'status'];

    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field];
      }
    }

    if (body.status === 'published') {
      updateData.published_at = new Date().toISOString();
    }

    const { data: post, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', body.id)
      .select()
      .single();

    if (error) throw error;

    return Response.json({ ok: true, post });
  } catch (error) {
    console.error('Update post error:', error);
    return Response.json({ ok: false, error: 'Failed to update post' }, { status: 500 });
  }
}
