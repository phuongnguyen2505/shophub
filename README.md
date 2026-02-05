# 🛒 E-commerce Application with Next.js

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat-square)](https://github.com/pmndrs/zustand)

A full-featured e-commerce simulation built with Next.js and TypeScript. This project implements user authentication, product browsing, cart management, and a complete checkout process.

🔗 **Live Demo:** [https://shuphob.vercel.app/](https://shuphob.vercel.app/)

---

## 🔑 Test Credentials

### User Account
| Username | Password |
| :--- | :--- |
| `emilys` | `emilyspass` |

### Credit Card Info
| Type | Card Number | Expiry | CVV |
| :--- | :--- | :--- | :--- |
| **MasterCard** | `5555-5555-5555-5555` | `12/33` | `123` |
| **VISA** | `4444-4444-4444-4444` | `12/33` | `123` |

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Form Handling:** React Hook Form & Zod
- **Animations:** Framer Motion

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/phuongnguyen2505/shophub.git
cd shophub
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
```

### 3. Install & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📂 Folder Structure

```text
├── app/                # Application routes (App Router)
├── components/         # React components
│   ├── common/         # Atomic components (Button, Input)
│   ├── layout/         # Layout-related (Navbar, Footer)
│   └── ui/             # Feature-specific components
├── context/            # React Context Providers
├── hooks/              # Custom React hooks
├── lib/                # API logic & validators
├── store/              # Zustand state stores
├── types/              # TypeScript interfaces
└── utils/              # Helper functions
```

---

## 💡 Challenges & Solutions

*   **Static Build Failures:** Fixed `NextRouter` mounting issues by enforcing dynamic rendering for routes utilizing client-side hooks in shared layouts.
*   **Checkout Race Condition:** Resolved navigation issues by moving the `clearCart()` action to the success page, ensuring the cart persists until the order is confirmed.
*   **Dependency Stability:** Addressed build instability by downgrading from experimental versions (Next.js 15/React 19) to the latest stable releases.

