# وصّل — لوحة إدارة طلبات التوصيل (Wassel Delivery Admin Dashboard)

A modern, responsive, Arabic RTL delivery order management dashboard built for **Wassel (وصّل)** in Sana'a, Yemen. It replaces manual Excel spreadsheets with a fast, mobile-friendly web interface where employees can browse, search, sort, and track daily delivery orders in one place.

---

## Live Demo & Screenshots

- **Live URL:** _[https://anharwasseldashboard.netlify.app/]_
- **Repository:** _[https://github.com/AnharMoahmmed/wassel-dashboard.git]_

---

## Features

- **Full Arabic & RTL Interface:** Built with `lang="ar"` and `dir="rtl"` using the **Cairo** Arabic font for crisp readability.
- **Responsive Dual-View Layout:**
  - **Mobile Phones:** Color-coded **Order Cards** (`OrderCard`) with clickable phone numbers (`tel:`), address, ordered items, delivery fee, and status indicators—eliminating horizontal scrolling for employees working on the go.
  - **Tablets & Desktops:** Structured, icon-enriched **Orders Table** (`OrdersTable`) for quick scanning across wider screens.
- **Instant Search & Sorting:**
  - Search orders in real time by **Customer Name**.
  - Sort orders by **Date** (Newest / Oldest) or **Total Amount** (Highest / Lowest).
- **Pagination:** Clean RTL pagination displaying 8 orders per page, automatically resetting to page 1 when search or sort criteria change.
- **Order Status Badges:** Visual badges with icons for **جديد (New)**, **في الطريق (On the Way)**, and **تم التوصيل (Delivered)**.
- **Complete State Handling:** Dedicated UI feedback for **Loading**, **Error (with Retry button)**, and **Empty Search Results**.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | React 19 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS v4 |
| **Icons** | Lucide React |
| **Routing** | React Router |

---

## Project Structure

```text
src/
├── components/
│   ├── Header.tsx             # Top bar with branding and total orders counter
│   ├── OrderCard.tsx          # Mobile-friendly order card (with address, phone & items)
│   ├── OrdersTable.tsx        # Desktop/tablet order table
│   ├── Pagination.tsx         # RTL-aware pagination controls
│   ├── SearchAndSortBar.tsx   # Customer search input & sort selector
│   ├── StateFeedback.tsx      # Loading, Error (+ Retry), and Empty states
│   └── StatusBadge.tsx        # Color-coded status badges with icons
├── data/
│   └── orders.json            # Sample dataset (22 Sana'a delivery orders)
├── pages/
│   └── OrdersPage.tsx         # Main orders dashboard page
├── services/
│   └── ordersService.ts       # Async mock service simulating network fetch & errors
├── types/
│   └── order.ts               # TypeScript interfaces for orders, items & timeline
├── App.tsx                    # React Router setup
├── main.tsx
└── index.css                  # Tailwind CSS v4 import & Arabic font config