import jsdom from "jsdom";
const { JSDOM } = jsdom;

export async function scrapeScreener(stockTicker) {
  try {
    const stockUrl = `https://www.screener.in/company/${stockTicker}/`;

    const response = await fetch(stockUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const data = {};

    data.companyInfo = {
      name: document.querySelector("h1").textContent.trim(),
      price: document
        .querySelector(".font-size-18.strong div span")
        .textContent.trim(),
      website: document.querySelector(".company-links a")?.href || "N/A",
    };

    data.valuationRatios = {};
    document.querySelectorAll("#top-ratios li").forEach((li) => {
      const key = li.querySelector(".name").textContent.trim();
      const value = li
        .querySelector(".value")
        .textContent.trim()
        .replace(/[^\d.-]/g, "")
        .replace(/\.$/, "");
      data.valuationRatios[key] = value;
    });

    function extractTable(sectionId) {
      const section = document.querySelector(`#${sectionId} table`);
      if (!section) return [];

      const headers = Array.from(section.querySelectorAll("thead th")).map(
        (th) => th.textContent.trim()
      );

      const rows = Array.from(section.querySelectorAll("tbody tr"))
        .map((row) => {
          const cells = row.querySelectorAll("td");
          if (cells.length > 1) {
            return {
              key: cells[0].textContent.trim(),
              values: Array.from(cells)
                .slice(1)
                .map((cell) =>
                  cell.textContent
                    .trim()
                    .replace(/[^\d.-]/g, "")
                    .replace(/\.$/, "")
                ),
            };
          }
        })
        .filter(Boolean);

      return { headers, rows };
    }

    data.quarterlyResults = extractTable("quarters");

    data.profitLoss = extractTable("profit-loss");

    data.balanceSheet = extractTable("balance-sheet");

    data.cashFlow = extractTable("cash-flow");

    data.shareholding = extractTable("shareholding");

    data.ratios = extractTable("ratios");

    data.metadata = {
      lastUpdated: new Date().toISOString(),
      url: stockUrl,
      ticker: stockTicker,
    };

    return data;
  } catch (error) {
    console.error("Error scraping data:", error);
  }
}
