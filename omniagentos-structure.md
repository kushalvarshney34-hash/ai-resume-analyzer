# OmniAgent OS - Project Architecture

## Folder Structure

```
omniagentos/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── agents/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── workflows/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── builder/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── simulator/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── analytics/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── marketplace/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── team/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── settings/
│   │   │   ├── page.tsx
│   │   │   ├── profile/
│   │   │   ├── workspace/
│   │   │   ├── api-keys/
│   │   │   ├── integrations/
│   │   │   ├── billing/
│   │   │   ├── notifications/
│   │   │   └── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopNav.tsx
│   │   │   ├── CommandPalette.tsx
│   │   │   ├── NotificationCenter.tsx
│   │   │   └── UserMenu.tsx
│   │   ├── workflow/
│   │   │   ├── WorkflowCanvas.tsx
│   │   │   ├── NodePanel.tsx
│   │   │   ├── EdgePanel.tsx
│   │   │   ├── Minimap.tsx
│   │   │   ├── Toolbar.tsx
│   │   │   ├── nodes/
│   │   │   │   ├── BaseNode.tsx
│   │   │   │   ├── AINode.tsx
│   │   │   │   ├── LogicNode.tsx
│   │   │   │   ├── DataNode.tsx
│   │   │   │   ├── CommunicationNode.tsx
│   │   │   │   ├── StorageNode.tsx
│   │   │   │   └── UtilityNode.tsx
│   │   │   └── edges/
│   │   │       ├── CustomEdge.tsx
│   │   │       └── EdgePopup.tsx
│   │   ├── execution/
│   │   │   ├── ExecutionControls.tsx
│   │   │   ├── ExecutionTimeline.tsx
│   │   │   ├── StreamingConsole.tsx
│   │   │   ├── TokenCounter.tsx
│   │   │   └── ExecutionVisualization.tsx
│   │   ├── analytics/
│   │   │   ├── MetricsCard.tsx
│   │   │   ├── ChartCard.tsx
│   │   │   ├── LineChart.tsx
│   │   │   ├── AreaChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   ├── PieChart.tsx
│   │   │   ├── Heatmap.tsx
│   │   │   └── FilterBar.tsx
│   │   ├── marketplace/
│   │   │   ├── TemplateCard.tsx
│   │   │   ├── TemplateGrid.tsx
│   │   │   ├── TemplatePreview.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   └── providers/
│   │       ├── ThemeProvider.tsx
│   │       ├── QueryProvider.tsx
│   │       └── ToastProvider.tsx
│   ├── hooks/
│   │   ├── useWorkflow.ts
│   │   ├── useExecution.ts
│   │   ├── useUndo.ts
│   │   ├── useCommand.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   ├── usePrevious.ts
│   │   └── useMediaQuery.ts
│   ├── stores/
│   │   ├── workflowStore.ts
│   │   ├── executionStore.ts
│   │   ├── uiStore.ts
│   │   ├── authStore.ts
│   │   └── notificationStore.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── validators.ts
│   │   ├── generators.ts
│   │   ├── formatters.ts
│   │   ├── analytics.ts
│   │   ├── localStorage.ts
│   │   └── api.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── workflow.ts
│   │   ├── execution.ts
│   │   ├── analytics.ts
│   │   ├── user.ts
│   │   └── api.ts
│   ├── constants/
│   │   ├── nodes.ts
│   │   ├── colors.ts
│   │   ├── routes.ts
│   │   └── config.ts
│   └── api/
│       ├── workflows.ts
│       ├── executions.ts
│       ├── analytics.ts
│       ├── agents.ts
│       └── templates.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   ├── icons/
│   └── images/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── .env.example
└── README.md
```

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Visualization**: React Flow, Recharts
- **Database**: PostgreSQL, Prisma ORM
- **UI Components**: Shadcn UI

## Color Scheme

- Background: #09090B
- Card: #111113
- Border: #27272A
- Primary: #7C3AED
- Secondary: #8B5CF6
- Success: #22C55E
- Warning: #F59E0B
- Danger: #EF4444
- Text: #FAFAFA
- Muted: #A1A1AA
