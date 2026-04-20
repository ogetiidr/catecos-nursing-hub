# Catecos Nursing Hub - Project Overview

## About

Professional website for **Catecos Nursing Hub and Home Care Services** — a home healthcare company based in **Utawala, Nairobi, Kenya**.

- **Phone**: 0758867235 (all phone numbers are `tel:` links)
- **Email**: catecos924@gmail.com
- **YouTube**: @CateCos-u1f → https://www.youtube.com/@CateCos-u1f
- **Location**: Utawala, Nairobi, Kenya

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Auth**: Clerk (app_3BqFdBvVenURdLnIk5bHpKwWkWp)

## Architecture

### Artifacts
- `artifacts/catecos-nursing` — React+Vite frontend at `/`
- `artifacts/api-server` — Express API server

### Key Libraries
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth)
- `lib/api-client-react` — Generated React Query hooks
- `lib/api-zod` — Generated Zod validation schemas
- `lib/db` — Drizzle ORM schema and client

## Database Tables
- `services` — Nursing service offerings (title, description, images, icon, order)
- `testimonials` — Client testimonials (name, role, message, rating)
- `inquiries` — Contact form submissions (name, phone, email, service, message, isRead)

## Services
1. Home Nursing Care
2. Post-Operative Care
3. Elderly Care
4. Maternal & Newborn Care
5. Wound Dressing
6. Chronic Disease Management
7. Nurse Recruitment

## Site Pages (Routes)
- `/` — Home (hero, highlights, services, testimonials, about snippet, CTA)
- `/about` — About Us (story, stats, mission/vision, why choose us)
- `/services` — Services (all 7 services with detail modal)
- `/book` — Book a Nurse (booking form: name, phone, location, service, date, notes + call button)
- `/team` — Our Team (4 nurses with credentials, team standards)
- `/testimonials` — Reviews (all testimonials with rating summary)
- `/contact` — Contact Us (all contact methods + contact form)
- `/blog` — Health Tips & Blog (4 articles with category filter + modal reader)
- `/sign-in`, `/sign-up` — Clerk auth pages
- `/admin` — Admin Dashboard (protected, admin email only)

## Shared Components
- `src/components/Navbar.tsx` — shared navigation with all page links
- `src/components/Footer.tsx` — shared footer with quick links + contact
- `src/components/WhatsAppButton.tsx` — floating WhatsApp chat button (bottom-right)
- `src/lib/constants.ts` — SERVICES, TEAM, BLOG_POSTS, PHONE, EMAIL, etc.

## Admin System
- Admin login at `/sign-in` via Clerk authentication
- Admin dashboard at `/admin` — requires verified email `catecos924@gmail.com`
- Double-protected: frontend email check + backend `requireAdmin` middleware uses Clerk SDK
- Features: Stats overview, Inquiries management (mark as read), Testimonials CRUD
- Footer has "Admin Login" link

## WhatsApp Integration
- WhatsApp number: `254758867235` (Kenya format)
- Floating button visible on every page
- Pre-filled message for inquiries

## Images
All AI-generated images stored in `artifacts/catecos-nursing/public/images/`:
- home-nursing-1.png, home-nursing-2.png
- postop-1.png, postop-2.png
- elderly-1.png, elderly-2.png
- maternal-1.png, maternal-2.png
- wound-1.png, wound-2.png
- chronic-1.png, chronic-2.png
- recruitment-1.png, recruitment-2.png
- hero-main.png, hero-2.png

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/catecos-nursing run dev` — run frontend locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
