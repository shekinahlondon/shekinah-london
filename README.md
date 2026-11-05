# Shekinah Nation London — Member Platform

| Page | Who uses it | What it does |
|---|---|---|
| `index.html` | First-timers | Welcome form → saves details & photo → WhatsApp community, then team group → personal QR code |
| `checkin.html` | Members at the door | Check in with phone/email (door poster) · `#qr` gets your QR code back (email + date of birth) |
| `admin.html` | Admins & ushers | Home (birthdays, stats), Scan QR, Members, Attendance (who was in / not in), Settings |
| `setup.html` | New team members | One-time link to set a password (admins create these in Settings → Team access) |

## Backend (Supabase project `shekinah-london`, London region)
- Tables: members, teams, attendance, settings, staff, staff_invites — row-level security on; only admins can read member data; ushers can only scan.
- Photos: private bucket `member-photos` (viewed through short-lived links).
- Functions: `register` (form + photo + welcome email with QR), `birthday-digest` (runs daily ~8am UK), `staff-setup`.
- Email: Resend. Until a domain is verified in Resend, emails only reach shekinahnationlondon@gmail.com.

## Roles
- **Admin** — everything, incl. member records, edit/delete (right to erasure), CSV export.
- **Usher** — Scan tab only.
