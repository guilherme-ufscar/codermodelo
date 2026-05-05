import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://seusite.com';
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') ?? 'noreply@seusite.com';

serve(async (req) => {
  const { postId } = await req.json();

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (!post) return new Response('Post not found', { status: 404 });

  const { data: subscribers } = await supabase.from('subscribers').select('email');
  if (!subscribers?.length) return new Response('No subscribers', { status: 200 });

  const emails = subscribers.map((s) => s.email);

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: emails,
      subject: `Novo artigo: ${post.title}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#541ccc">${post.title}</h2>
          <p style="color:#555">${post.excerpt ?? ''}</p>
          <a href="${SITE_URL}/blog/${post.slug}"
             style="display:inline-block;padding:12px 24px;background:#541ccc;color:#fff;text-decoration:none;border-radius:8px;margin-top:16px">
            Ler artigo →
          </a>
          <hr style="margin-top:32px;border-color:#eee"/>
          <p style="font-size:12px;color:#999">Você está recebendo este email por estar inscrito na newsletter.</p>
        </div>
      `,
    }),
  });

  return new Response('Emails sent', { status: 200 });
});
