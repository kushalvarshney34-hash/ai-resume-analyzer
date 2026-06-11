# OmniAgent OS

## World-Class Visual AI Agent Builder SaaS Platform

A premium, enterprise-grade visual workflow builder for creating and managing AI agents. Inspired by Linear, Vercel, Notion, Figma, Retool, and Stripe.

### 🎯 Key Features

- **Visual Workflow Builder** - Infinite canvas with drag-and-drop nodes
- **AI Agent Management** - Support for OpenAI, Claude, Gemini, DeepSeek
- **Execution Simulator** - Real-time workflow execution with visualization
- **Live Token Streaming** - ChatGPT-like streaming console
- **Analytics Dashboard** - Comprehensive metrics and insights
- **Cost Monitoring** - Track AI usage and expenses
- **Team Collaboration** - Comments, mentions, shared workflows
- **Agent Marketplace** - Pre-built templates and agents
- **Time Travel UI** - Full undo/redo system with history timeline

### 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Visualization**: React Flow, Recharts
- **Database**: PostgreSQL, Prisma ORM
- **UI Components**: Shadcn UI, Radix UI

### 📦 Getting Started

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Setup database
npx prisma db push

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### 📋 Project Structure

- `src/app` - Next.js pages and layouts
- `src/components` - Reusable React components
- `src/hooks` - Custom React hooks
- `src/stores` - Zustand state stores
- `src/utils` - Utility functions
- `src/types` - TypeScript type definitions
- `src/constants` - Constants and configuration
- `src/api` - API client functions
- `prisma` - Database schema and migrations

### 📝 License

MIT
