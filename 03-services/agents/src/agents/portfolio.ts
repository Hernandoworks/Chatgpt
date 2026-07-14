import { Agent, callable, type Connection } from "agents";

interface Holding {
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
}

interface PortfolioState {
  cash: number;
  holdings: Holding[];
  alerts: string[];
}

export class PortfolioAgent extends Agent<Env, PortfolioState> {
  initialState: PortfolioState = {
    cash: 350000,
    holdings: [
      { symbol: "FMG", name: "Fortescue Metals", shares: 5000, avgPrice: 18.50, currentPrice: 21.30 },
      { symbol: "RIO", name: "Rio Tinto", shares: 2000, avgPrice: 112.00, currentPrice: 118.50 },
      { symbol: "BHP", name: "BHP Group", shares: 3000, avgPrice: 42.80, currentPrice: 44.20 },
      { symbol: "QME", name: "Quantum Energy", shares: 10000, avgPrice: 3.20, currentPrice: 4.15 },
      { symbol: "NVX", name: "Novonix", shares: 8000, avgPrice: 2.10, currentPrice: 1.85 },
    ],
    alerts: [],
  };

  validateStateChange(next: PortfolioState, _source: Connection | "server") {
    if (next.cash < 0) throw new Error("Cash cannot be negative");
  }

  @callable()
  getPortfolio(): PortfolioState {
    return this.state;
  }

  @callable()
  getTotalValue(): number {
    const holdingsValue = this.state.holdings.reduce(
      (sum, h) => sum + h.shares * h.currentPrice,
      0,
    );
    return this.state.cash + holdingsValue;
  }

  @callable()
  getHoldings(): Holding[] {
    return this.state.holdings;
  }

  @callable()
  buy(symbol: string, name: string, shares: number, price: number): PortfolioState {
    const cost = shares * price;
    if (cost > this.state.cash) throw new Error("Insufficient cash");

    const existing = this.state.holdings.find((h) => h.symbol === symbol);
    let holdings: Holding[];

    if (existing) {
      const totalShares = existing.shares + shares;
      const totalCost = existing.shares * existing.avgPrice + cost;
      holdings = this.state.holdings.map((h) =>
        h.symbol === symbol
          ? { ...h, shares: totalShares, avgPrice: totalCost / totalShares, currentPrice: price }
          : h,
      );
    } else {
      holdings = [
        ...this.state.holdings,
        { symbol, name, shares, avgPrice: price, currentPrice: price },
      ];
    }

    this.setState({ ...this.state, cash: this.state.cash - cost, holdings });
    return this.state;
  }

  @callable()
  sell(symbol: string, shares: number, price: number): PortfolioState {
    const holding = this.state.holdings.find((h) => h.symbol === symbol);
    if (!holding) throw new Error(`No holding for ${symbol}`);
    if (shares > holding.shares) throw new Error("Not enough shares");

    const proceeds = shares * price;
    const holdings = this.state.holdings
      .map((h) =>
        h.symbol === symbol
          ? { ...h, shares: h.shares - shares, currentPrice: price }
          : h,
      )
      .filter((h) => h.shares > 0);

    this.setState({ ...this.state, cash: this.state.cash + proceeds, holdings });
    return this.state;
  }

  @callable()
  updatePrice(symbol: string, price: number): PortfolioState {
    const holdings = this.state.holdings.map((h) =>
      h.symbol === symbol ? { ...h, currentPrice: price } : h,
    );
    this.setState({ ...this.state, holdings });
    return this.state;
  }

  @callable()
  addAlert(message: string): string[] {
    const alerts = [...this.state.alerts, message];
    this.setState({ ...this.state, alerts });
    return alerts;
  }

  @callable()
  clearAlerts(): string[] {
    this.setState({ ...this.state, alerts: [] });
    return [];
  }
}
