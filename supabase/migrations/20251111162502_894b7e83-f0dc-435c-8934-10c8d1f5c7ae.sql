-- Create storage buckets for partner files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('partner-logos', 'partner-logos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]),
  ('partner-agreements', 'partner-agreements', false, 104857600, ARRAY['application/pdf']::text[])
ON CONFLICT (id) DO NOTHING;

-- RLS policies for partner logos (public read, admin write)
CREATE POLICY "Anyone can view partner logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'partner-logos');

CREATE POLICY "Admins can upload partner logos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'partner-logos' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update partner logos"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'partner-logos' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete partner logos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'partner-logos' AND has_role(auth.uid(), 'admin'));

-- RLS policies for partner agreements (admin only)
CREATE POLICY "Admins can view partner agreements"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'partner-agreements' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can upload partner agreements"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'partner-agreements' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update partner agreements"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'partner-agreements' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete partner agreements"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'partner-agreements' AND has_role(auth.uid(), 'admin'));