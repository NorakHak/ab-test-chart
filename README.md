# A/B Test Conversion Rate Chart

Interactive line chart for visualizing A/B test statistics with multiple variations and flexible view options.


## 📊 Visualization Library

- **Library:** [Recharts](https://recharts.org/en-US/)  
  Chosen for its responsiveness, composability, and ease of customizing chart elements like lines, areas, axes, tooltips, and legends.


## ✨ Implemented Features

- **Theme switch** — light and dark mode with automatic detection of system theme

- **Fully functional theme detection from the browser**

- **Conversion rate calculation** for each variation: conversionRate = (conversions / visits) * 100

- **All values are displayed as percentages**

- **Day / Week view toggle** — switch between daily and weekly aggregated data

- **Variations selector** — show or hide lines dynamically, minimum one variation is always selected

- **Line style selection** — Line, Smooth, or Area

- **Brush / Zoom selection** — select a specific range of dates on the chart; the chart dynamically displays only the data within the selected range.

- **Tooltip** — shows a vertical hover line and displays detailed daily/weekly data

- **Responsive layout** — adapts to screen widths between 671px and 1300px

- **Dynamic axes** — automatically adjusts X and Y axes according to visible data

- **Export chart to PNG** — download chart image via html-to-image library


## 🛠️ Local Setup

Clone the repository:

git clone <https://github.com/NorakHak/ab-test-chart>
cd <ab-test-chart>

Install dependencies:

npm install

Start the development server:

npm start

Open your browser at http://localhost:3000 to view the chart.
