# 🌌 Universal Inbox (Next-Gen AI Messaging Platform)

Universal Inbox is a modern, unified messaging client that aggregates communications from disparate platforms (Email, Telegram, WhatsApp, Slack, LinkedIn, etc.) into a single, intelligent dashboard. 

Powered by large language models, it automatically summarizes long conversations, extracts intent (Is this spam or important?), and suggests context-aware smart replies.

## ✨ Core Features
- **Unified Messaging:** Read and reply to cross-platform messages without switching tabs.
- **Intelligent Triage:** AI intent classification (`important`, `normal`, `promotional`, `spam`).
- **Smart Replies:** Context-aware, one-click reply generation.
- **AI Auto-Summarization:** Instantly digest long threads.
- **Real-Time Sync:** Deep WebSocket integration for instant UI updates.
- **Multi-Platform Support:** Responsive Web UI (Vite + React) & Native Mobile App (Expo).

---

## 🏗️ Tech Stack

### Frontend (Web & Mobile)
- **Vite & React 18**: Lightning-fast web application dashboard.
- **Tailwind CSS & Framer Motion**: Premium, glassmorphic UI with smooth micro-animations.
- **React Native (Expo)**: Mobile wrapper (`react-native-webview`) connecting the web experience natively to iOS/Android.
- **Socket.io-client**: Deep WebSocket subscription to state changes.

### Backend
- **Node.js & Express**: High-performance REST APIs and Webhook ingestion pipelines.
- **Prisma**: Modern, fully-typed ORM.
- **SQLite (Dev) / PostgreSQL (Prod)**: Persistent relational storage for unified user models, threads, and messages.
- **Redis (Optional)**: Required in production for WebSocket scale, rate limiting, and BullMQ background task processing.
- **Socket.io**: Real-time event broadcasting.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- (Optional) Redis Server running on `localhost:6379`

### 1. Installation
Clone the repository and install dependencies at the root and frontend directories:

```bash
# Setup Backend
npm install

# Setup Web Frontend
cd frontend
npm install

# Setup Mobile App
cd ../mobile-app
npm install
```

### 2. Database Setup (Prisma)
Initialize the SQLite database with the mapped schema models:

```bash
npm run dev:db    # Equivalent to npx prisma db push
```

### 3. Run the Development Servers
Start both the Express backend and Vite frontend concurrently:

```bash
npm run dev:all
```
Your backend will start on **`http://localhost:8001`** and the Web App will be live at **`http://localhost:5177`**.

### 4. Open the Mobile App (Expo)
To view the responsive UI natively wrapped on a mobile device:

```bash
cd mobile-app
npx expo start
```
Scan the QR code with **Expo Go** on your iPhone or Android. Ensure your dev machine has `npm run dev:all` running so the mobile app can reach your local network IP over port `5177`.

---

## 🧪 Simulating End-to-End WebSocket Activity

Because integrating real Telegram/WhatsApp bots requires vendor API keys, we've bundled a mock testing script to demonstrate the live WebSocket architecture.

1. Keep your Dashboard open in a browser (`http://localhost:5177`).
2. Open a separate terminal.
3. Run the Webhook E2E Simulator:

```bash
# Will seed a test user and dispatch a mock Telegram payload
node scripts/seedTestDb.js
node scripts/simulateWebhook.js
```

Watch the mock payload instantly route through the backend `Telegram Webhook -> Prisma Database -> Socket.io Emitter -> React Context -> UI Feed` without a page refresh!

---

## 📂 Project Structure

```text
universal-inbox/
├── config/              # Prisma, Redis configurations
├── scripts/             # End-to-end database seed scripts
├── src/
│   ├── ai/              # Background pollers and LLM integration
│   ├── routes/          # Express REST Auth & Webhook Endpoints
│   ├── controllers/     # Business logic parsing platform payloads
│   └── server.js        # Main Express/Socket App entry point
│
├── frontend/            # React + Vite Web App
│   ├── src/components/  # Modular Chat & Sidebar Layouts
│   ├── src/context/     # React Context bridging WebSockets
│   ├── src/pages/       # Auth & Dashboard routing Pages
│   └── src/services/    # frontend API & Socket singletons
│
├── mobile-app/          # Expo React Native App
│   └── App.js           # Lightweight WebView pointing to host
│
└── prisma/              # Core Schema Definitions
```

## 🤝 Next Evolution Steps
- Complete the OpenAI LangChain integration pipeline inside `src/ai/aiService.js` to process real summaries.
- Substitute production API tokens into WhatsApp/Slack platform adapter routes.
