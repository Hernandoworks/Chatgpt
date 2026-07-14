import { Agent, callable } from "agents";

interface AlertState {
  subscriptions: PushSubscription[];
  recentAlerts: AlertEntry[];
}

interface AlertEntry {
  id: string;
  type: "price_target" | "news" | "portfolio" | "system";
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export class AlertAgent extends Agent<Env, AlertState> {
  initialState: AlertState = {
    subscriptions: [],
    recentAlerts: [],
  };

  @callable()
  subscribe(subscription: PushSubscription): void {
    this.setState({
      ...this.state,
      subscriptions: [...this.state.subscriptions, subscription],
    });
  }

  @callable()
  getAlerts(limit = 20): AlertEntry[] {
    return this.state.recentAlerts.slice(0, limit);
  }

  @callable()
  getUnreadCount(): number {
    return this.state.recentAlerts.filter((a) => !a.read).length;
  }

  @callable()
  markRead(alertId: string): void {
    this.setState({
      ...this.state,
      recentAlerts: this.state.recentAlerts.map((a) =>
        a.id === alertId ? { ...a, read: true } : a,
      ),
    });
  }

  @callable()
  markAllRead(): void {
    this.setState({
      ...this.state,
      recentAlerts: this.state.recentAlerts.map((a) => ({ ...a, read: true })),
    });
  }

  async sendAlert(type: AlertEntry["type"], title: string, message: string) {
    const entry: AlertEntry = {
      id: crypto.randomUUID(),
      type,
      title,
      message,
      timestamp: Date.now(),
      read: false,
    };

    this.setState({
      ...this.state,
      recentAlerts: [entry, ...this.state.recentAlerts].slice(0, 100),
    });

    this.broadcast(JSON.stringify({ type: "new_alert", alert: entry }));
  }

  @callable()
  async sendTestAlert(): Promise<AlertEntry> {
    const entry: AlertEntry = {
      id: crypto.randomUUID(),
      type: "system",
      title: "Test Alert",
      message: "This is a test alert from Phoenix Agents",
      timestamp: Date.now(),
      read: false,
    };

    this.setState({
      ...this.state,
      recentAlerts: [entry, ...this.state.recentAlerts].slice(0, 100),
    });

    return entry;
  }
}
