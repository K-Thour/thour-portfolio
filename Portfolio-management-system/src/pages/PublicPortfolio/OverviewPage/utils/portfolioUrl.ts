export function buildPortfolioPublicUrl(origin: string, portfolioId: string) {
  return `${origin.replace(/\/$/, "")}/publicPortfolio/overviewPage/${portfolioId}`;
}
