# Thela Express — Admin Dashboard

React + Vite + Tailwind. Runs on port 3001 (separate from customer site on 3000).

## Setup
```bash
cd admin
npm install
cp .env.example .env
npm run dev
```

## First Admin Account
There's no self-signup for admins (by design, for security). Create your first admin:
1. Firebase Console → Authentication → Add user (email/password)
2. Copy that user's UID
3. In PostgreSQL:
```sql
INSERT INTO admins (firebase_uid, name, email) VALUES ('<uid>', 'Admin Name', 'admin@test.com');
```
4. Log in on this dashboard with that email/password.

## Pages
- `/` — Dashboard: live stats (auto-refresh on new orders via socket)
- `/orders` — All orders, live table, updates in real-time
- `/products` — Add/edit menu items, **image upload goes straight to Cloudinary** via the backend
- `/partners` — Delivery partner list + live status

## Image Upload Flow
`ProductFormModal` sends a `multipart/form-data` request with the image file to
`POST /api/admin/products` (or `PUT .../products/:id`). The backend uploads it to
Cloudinary and stores the returned URL — this dashboard never talks to Cloudinary directly.
