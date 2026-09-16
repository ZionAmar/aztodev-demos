# DJ Events Landing — Deep Beats

Static single-page demo (`index.html`, RTL Hebrew) for a fictional DJ business,
"Deep Beats — DJ ליאם רידם". Business name, copy, testimonials and event
history are **invented** for demo purposes. The four photos in `./images/`
are AI-generated (Gemini).

Sections: hero, about (with portrait), services, gallery, testimonials,
contact form, floating WhatsApp button.

## Two placeholders waiting for real values

Both are marked `// TODO: placeholder` in the `<script>` block at the bottom
of `index.html`:

- `LEAD_DESTINATION_EMAIL` — the contact form builds a `mailto:` link to this
  address. Currently `REPLACE_WITH_REAL_EMAIL@example.com`.
- `WHATSAPP_NUMBER` — international format, digits only, no `+`. Used by the
  floating button and both in-page WhatsApp CTAs. Currently `972500000000`
  (placeholder Israeli-format number).

Replace both before this page goes live.
