import { chromium } from "playwright-core";

const url = process.argv[2] ?? "http://localhost:3010/portfolio/";
const out = "public/portfolio.pdf";

const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: out,
    width: "1280px",
    height: "720px",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
    preferCSSPageSize: true,
  });
  console.log(`wrote ${out} from ${url}`);
} finally {
  await browser.close();
}
