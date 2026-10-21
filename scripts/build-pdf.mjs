import { chromium } from "playwright-core";

const url = process.argv[2] ?? "http://localhost:3010/portfolio/";
const out = "public/portfolio.pdf";

const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: out,
    format: "A4",
    printBackground: true,
    margin: { top: "16mm", right: "16mm", bottom: "16mm", left: "16mm" },
  });
  console.log(`wrote ${out} from ${url}`);
} finally {
  await browser.close();
}
