export const ROUTES = {
  DASHBOARD: "/dashboard",
  PORTFOLIO: "/portfolio",
  COMPANIES: "/companies",
  COMPANY: (symbol: string) => `/companies/${symbol}`,
  MARKET: "/market",
  RESEARCH: "/research",
  AI_COMMITTEE: "/ai-committee",
  TRADE_JOURNAL: "/trade-journal",
  ALERTS: "/alerts",
  REPORTS: "/reports",
  SETTINGS: "/settings",
} as const;

export const NAV_ITEMS = [
  { label: "Dashboard", href: ROUTES.DASHBOARD, icon: "LayoutDashboard" },
  { label: "Portfolio", href: ROUTES.PORTFOLIO, icon: "Briefcase" },
  { label: "Companies", href: ROUTES.COMPANIES, icon: "Building2" },
  { label: "Market", href: ROUTES.MARKET, icon: "TrendingUp" },
  { label: "Research", href: ROUTES.RESEARCH, icon: "FileText" },
  { label: "AI Committee", href: ROUTES.AI_COMMITTEE, icon: "Brain" },
  { label: "Trade Journal", href: ROUTES.TRADE_JOURNAL, icon: "NotebookPen" },
  { label: "Alerts", href: ROUTES.ALERTS, icon: "Bell" },
  { label: "Reports", href: ROUTES.REPORTS, icon: "BarChart3" },
  { label: "Settings", href: ROUTES.SETTINGS, icon: "Settings" },
] as const;

export const AI_ANALYSTS = [
  { role: "Mining Analyst", name: "Dr. Sarah Chen", icon: "Pickaxe" },
  { role: "Technical Analyst", name: "Marcus Webb", icon: "ChartCandlestick" },
  { role: "Macro Economist", name: "Prof. James Wright", icon: "Globe" },
  { role: "Risk Manager", name: "Elena Rodriguez", icon: "Shield" },
  { role: "Portfolio Manager", name: "David Kim", icon: "PieChart" },
  { role: "Chairperson", name: "Alexandra Moore", icon: "Gavel" },
] as const;
