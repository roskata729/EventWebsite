insert into public.app_settings (key, value)
values
  ('contact_phone', '+359 700 123 45'),
  ('contact_email', 'hello@sabitiakolevi.bg'),
  ('contact_instagram', '@sabitiakolevi'),
  ('contact_linkedin', 'ТЕСТ')
on conflict (key) do nothing;
