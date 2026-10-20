// Renders project covers (SVG mockups + legacy screenshots on a mat) and the OG image.
// Run: npm run covers
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outDir = (slug) => {
  const d = path.join(root, "public", "images", "projects", slug);
  fs.mkdirSync(d, { recursive: true });
  return d;
};
const legacy = (p) => path.join(root, "legacy", "assets", "images", "portfolio", p);

const W = 1600;
const H = 1000;
const CREAM = "#F3EEE3";
const INK = "#0B0B0F";
const MUTE = "#6B6B75";
const BLUE = "#0A1FFF";
const FONT = "Inter, Helvetica Neue, Helvetica, Arial, sans-serif";

// ---- svg helpers ----
const r = (x, y, w, h, fill, rx = 0, extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;
const c = (x, y, rad, fill) => `<circle cx="${x}" cy="${y}" r="${rad}" fill="${fill}"/>`;
const t = (x, y, s, size, fill = INK, anchor = "start") =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" fill="${fill}" text-anchor="${anchor}">${s}</text>`;
const svg = (bg, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${r(0, 0, W, H, bg)}${body}</svg>`;
const lines = (x, y, widths, gap, fill, h = 16) =>
  widths.map((w, i) => r(x, y + i * gap, w, h, fill, h / 2)).join("");

// ---- mockups ----
function realtor() {
  const bars = [120, 180, 150, 230, 200, 290, 260]
    .map((h, i) => r(690 + i * 70, 760 - h, 44, h, i === 5 ? BLUE : "#D9D2C0", 8))
    .join("");
  return svg(
    BLUE,
    r(120, 110, 1360, 780, CREAM, 28) +
      r(120, 110, 440, 780, "#E9E3D3", 28) +
      r(400, 110, 160, 780, "#E9E3D3") +
      t(160, 178, "Assistant", 26, MUTE) +
      r(160, 220, 330, 90, INK, 22) +
      lines(188, 252, [250, 180], 28, CREAM, 12) +
      r(200, 340, 330, 130, "#FBF8F1", 22) +
      lines(228, 376, [270, 240, 160], 30, "#CFC8B6", 12) +
      r(160, 500, 300, 70, INK, 22) +
      lines(188, 524, [220], 28, CREAM, 12) +
      r(200, 600, 330, 100, "#FBF8F1", 22) +
      lines(228, 636, [260, 200], 30, "#CFC8B6", 12) +
      r(160, 790, 360, 56, "#FBF8F1", 28) +
      t(190, 826, "Ask about a listing", 22, MUTE) +
      r(620, 160, 800, 680, "#FBF8F1", 24) +
      t(670, 240, "Market report", 34, INK) +
      r(1190, 206, 190, 48, BLUE, 24) +
      t(1285, 239, "Report ready", 22, CREAM, "middle") +
      t(670, 330, "Estimated value", 22, MUTE) +
      t(670, 410, "$1,248,000", 72, INK) +
      r(670, 470, 700, 2, "#E3DDCD") +
      bars +
      t(690, 805, "Q1", 20, MUTE) +
      t(1100, 805, "Q6", 20, MUTE),
  );
}

function room(x, y, w, h, wall, floor, sofa, lamp) {
  return (
    r(x, y, w, h, wall, 18) +
    `<clipPath id="k${x}${y}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18"/></clipPath>` +
    `<g clip-path="url(#k${x}${y})">` +
    r(x, y + h * 0.68, w, h * 0.32, floor) +
    r(x + w * 0.14, y + h * 0.46, w * 0.52, h * 0.3, sofa, 14) +
    r(x + w * 0.1, y + h * 0.6, w * 0.1, h * 0.16, sofa, 8) +
    r(x + w * 0.6, y + h * 0.6, w * 0.1, h * 0.16, sofa, 8) +
    r(x + w * 0.78, y + h * 0.2, w * 0.03, h * 0.5, lamp, 4) +
    c(x + w * 0.795, y + h * 0.2, w * 0.07, lamp) +
    r(x + w * 0.2, y + h * 0.12, w * 0.3, h * 0.18, "#FFFFFF", 6, 'opacity="0.55"') +
    `</g>`
  );
}

function aiChat() {
  return svg(
    "#0F6B45",
    r(120, 110, 1360, 780, CREAM, 28) +
      r(120, 110, 500, 780, "#E9E3D3", 28) +
      r(400, 110, 220, 780, "#E9E3D3") +
      t(160, 178, "Room designer", 26, MUTE) +
      r(160, 220, 340, 84, INK, 22) +
      lines(188, 250, [250, 170], 28, CREAM, 12) +
      r(200, 334, 380, 120, "#FBF8F1", 22) +
      lines(228, 368, [300, 250, 180], 28, "#CFC8B6", 12) +
      r(160, 484, 300, 70, "#0F6B45", 22) +
      lines(188, 508, [220], 28, CREAM, 12) +
      r(200, 584, 380, 100, "#FBF8F1", 22) +
      lines(228, 618, [300, 220], 28, "#CFC8B6", 12) +
      r(160, 790, 400, 56, "#FBF8F1", 28) +
      t(190, 826, "Make it warmer", 22, MUTE) +
      t(670, 178, "3 variations", 26, MUTE) +
      room(670, 210, 380, 300, "#E7DCC8", "#B88F63", "#0F6B45", "#B88F63") +
      room(1070, 210, 370, 300, "#D8E0D2", "#9C8567", "#2A2A31", "#0F6B45") +
      room(670, 540, 380, 300, "#EADFD0", "#C9A57A", "#8A3B12", "#2A2A31") +
      r(1070, 540, 370, 300, "#FBF8F1", 18) +
      t(1100, 610, "Style", 22, MUTE) +
      t(1100, 668, "Warm modern", 34, INK) +
      r(1100, 712, 140, 44, INK, 22) +
      r(1252, 712, 140, 44, "#E3DDCD", 22) +
      r(1100, 780, 292, 36, "#0F6B45", 18) +
      t(1246, 806, "Save design", 20, CREAM, "middle"),
  );
}

function clientAi() {
  const card = (y, label, sub, pct, tint) =>
    r(300, y, 1000, 220, CREAM, 26) +
    r(340, y + 40, 140, 140, tint, 20) +
    r(366, y + 76, 88, 12, CREAM, 6) +
    r(366, y + 104, 64, 12, CREAM, 6, 'opacity="0.7"') +
    t(520, y + 98, label, 46, INK) +
    t(520, y + 140, sub, 24, MUTE) +
    r(520, y + 164, 520, 10, "#E3DDCD", 5) +
    r(520, y + 164, 520 * pct, 10, BLUE, 5) +
    r(1110, y + 66, 150, 48, pct === 1 ? BLUE : "#E3DDCD", 24) +
    t(1185, y + 99, pct === 1 ? "Done" : "Drafting", 22, pct === 1 ? CREAM : INK, "middle");
  return svg(
    INK,
    r(398, 150, 4, 700, "#2A2A31") +
      card(110, "Post", "Draft from the weekly update", 1, BLUE) +
      card(390, "Deck", "Slides from the brief", 0.72, "#8A3B12") +
      card(670, "List", "Leads from the inbox", 0.4, "#0F6B45"),
  );
}

function hermes() {
  const msg = (y, name, tint, body) =>
    c(560, y + 28, 28, tint) +
    t(612, y + 20, name, 24, INK) +
    lines(612, y + 44, body, 28, "#CFC8B6", 14);
  const bars = [60, 110, 85, 150, 125, 190]
    .map((h, i) => r(640 + i * 56, 700 - h, 34, h, i === 5 ? BLUE : "#CFC8B6", 6))
    .join("");
  return svg(
    BLUE,
    r(120, 110, 1360, 780, CREAM, 28) +
      r(120, 110, 320, 780, INK, 28) +
      r(300, 110, 140, 780, INK) +
      t(160, 178, "Workspace", 24, CREAM) +
      lines(160, 230, [170, 130, 190, 110], 56, "#2A2A31", 22) +
      r(150, 218, 260, 44, "#2A2A31", 12) +
      lines(176, 232, [150], 0, CREAM, 14) +
      t(480, 178, "# ops-agents", 28, INK) +
      r(480, 200, 940, 2, "#E3DDCD") +
      msg(240, "Jin", INK, [560, 340]) +
      msg(360, "Planner agent", BLUE, [620, 480, 260]) +
      r(612, 520, 460, 220, "#FBF8F1", 18) +
      t(642, 560, "Weekly runs", 22, MUTE) +
      bars +
      msg(770, "Reporter agent", "#0F6B45", [540]) +
      r(1180, 768, 150, 48, BLUE, 24) +
      t(1255, 800, "Posted", 22, CREAM, "middle"),
  );
}

function intelliworks() {
  const rows = [
    ["LOT 24-118", "Order #4821", "Running", 0.8, "#0F6B45"],
    ["LOT 24-119", "Order #4822", "Queued", 0.15, "#6B6B75"],
    ["LOT 24-120", "Order #4825", "Inspect", 0.95, "#8A3B12"],
    ["LOT 24-121", "Order #4830", "Running", 0.5, "#0F6B45"],
    ["LOT 24-122", "Order #4833", "Queued", 0.05, "#6B6B75"],
  ];
  const rowSvg = rows
    .map((row, i) => {
      const y = 280 + i * 106;
      return (
        r(160, y, 880, 90, i === 0 ? "#FBF8F1" : "#EEE8DA", 18) +
        t(196, y + 40, row[0], 28, INK) +
        t(196, y + 70, row[1], 20, MUTE) +
        r(470, y + 38, 330, 12, "#DDD6C4", 6) +
        r(470, y + 38, 330 * row[3], 12, row[4], 6) +
        r(850, y + 22, 160, 46, row[4], 23) +
        t(930, y + 54, row[2], 22, CREAM, "middle")
      );
    })
    .join("");
  return svg(
    "#8A3B12",
    r(120, 110, 1360, 780, CREAM, 28) +
      t(160, 190, "Production board", 40, INK) +
      t(160, 232, "Line 2, today", 22, MUTE) +
      rowSvg +
      // phone
      r(1110, 150, 300, 700, INK, 44) +
      r(1126, 166, 268, 668, "#F8F4EA", 32) +
      r(1126, 166, 268, 330, "#2A2A31", 32) +
      r(1126, 300, 268, 196, "#2A2A31") +
      // paper board held in frame
      r(1160, 214, 200, 240, "#F8F4EA", 10) +
      lines(1180, 244, [150, 120, 160, 90], 34, "#0B0B0F", 12) +
      r(1150, 204, 36, 4, BLUE) + r(1150, 204, 4, 36, BLUE) +
      r(1334, 204, 36, 4, BLUE) + r(1366, 204, 4, 36, BLUE) +
      r(1150, 462, 36, 4, BLUE) + r(1150, 430, 4, 36, BLUE) +
      r(1334, 462, 36, 4, BLUE) + r(1366, 430, 4, 36, BLUE) +
      t(1150, 560, "Board read", 22, MUTE) +
      t(1150, 612, "LOT 24-118", 38, INK) +
      lines(1150, 648, [200, 140], 30, "#DDD6C4", 14) +
      r(1150, 744, 220, 56, "#0F6B45", 28) +
      t(1260, 780, "Saved", 24, CREAM, "middle"),
  );
}

// ---- legacy screenshot on mat ----
async function onMat(src, matColor, padFrac = 0.08) {
  const padX = Math.round(W * padFrac);
  const padY = Math.round(H * padFrac);
  const boxW = W - padX * 2;
  const boxH = H - padY * 2;
  const resized = await sharp(src)
    .resize(boxW, boxH, { fit: "inside", background: matColor })
    .toBuffer({ resolveWithObject: true });
  const { width, height } = resized.info;
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="16" fill="#fff"/></svg>`,
  );
  const rounded = await sharp(resized.data).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  return sharp({ create: { width: W, height: H, channels: 3, background: matColor } })
    .composite([{ input: rounded, left: Math.round((W - width) / 2), top: Math.round((H - height) / 2) }])
    .webp({ quality: 85 });
}

async function gallery(slug, files) {
  const d = outDir(slug);
  for (let i = 0; i < files.length; i++) {
    await sharp(legacy(files[i]))
      .resize({ width: 1600, withoutEnlargement: true })
      .flatten({ background: CREAM })
      .webp({ quality: 82 })
      .toFile(path.join(d, `${String(i + 1).padStart(2, "0")}.webp`));
  }
}

async function svgCover(slug, markup) {
  await sharp(Buffer.from(markup)).webp({ quality: 88 }).toFile(path.join(outDir(slug), "cover.webp"));
}

async function main() {
  await svgCover("realtor-ai-platform", realtor());
  await svgCover("ai-chat-interior-app", aiChat());
  await svgCover("client-ai-implementation", clientAi());
  await svgCover("hermes-slack-agents", hermes());
  await svgCover("intelliworks-factory-erp", intelliworks());

  const cover = async (slug, src, mat) =>
    (await onMat(legacy(src), mat)).toFile(path.join(outDir(slug), "cover.webp"));
  await cover("photobyme", "photobyme/website.jpg", CREAM);
  await cover("happyhour-map", "happyhour/teaser.png", "#0F6B3D");
  await cover("chatgpt-followup-assistant", "chatgpt-assistant/assistant1.png", BLUE);

  await gallery("happyhour-map", ["happyhour/gallery1.png", "happyhour/gallery2.png", "happyhour/mobile.png"]);
  await gallery("chatgpt-followup-assistant", [
    "chatgpt-assistant/assistant1.png",
    "chatgpt-assistant/assistant2.png",
    "chatgpt-assistant/assistant3.png",
  ]);

  const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${BLUE}"/>
    <text x="80" y="330" font-family="${FONT}" font-size="150" fill="${CREAM}">Jin Kim</text>
    <text x="84" y="420" font-family="${FONT}" font-size="40" fill="${CREAM}">Fullstack &amp; AI engineer. On-site, in production.</text>
  </svg>`;
  fs.mkdirSync(path.join(root, "public", "og"), { recursive: true });
  await sharp(Buffer.from(og)).png().toFile(path.join(root, "public", "og", "default.png"));
  console.log("covers built");
}

main();
