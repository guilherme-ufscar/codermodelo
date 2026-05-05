-- Posts
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  cover_url text,
  content text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table posts enable row level security;
create policy "Public can read published posts" on posts for select using (published = true);
create policy "Admin full access" on posts using (auth.role() = 'authenticated');

-- Subscribers
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

alter table subscribers enable row level security;
create policy "Anyone can subscribe" on subscribers for insert with check (true);
create policy "Admin reads subscribers" on subscribers for select using (auth.role() = 'authenticated');

-- Ebooks
create table if not exists ebooks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_url text,
  external_link text,
  created_at timestamptz not null default now()
);

alter table ebooks enable row level security;
create policy "Public can read ebooks" on ebooks for select using (true);
create policy "Admin full access on ebooks" on ebooks using (auth.role() = 'authenticated');

-- Storage bucket for blog images and PDFs
insert into storage.buckets (id, name, public) values ('blog', 'blog', true) on conflict do nothing;
create policy "Public read blog bucket" on storage.objects for select using (bucket_id = 'blog');
create policy "Admin upload blog bucket" on storage.objects for insert with check (bucket_id = 'blog' and auth.role() = 'authenticated');
create policy "Admin delete blog bucket" on storage.objects for delete using (bucket_id = 'blog' and auth.role() = 'authenticated');
