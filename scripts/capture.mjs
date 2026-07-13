// Design-review captures. Usage: node scripts/capture.mjs [baseUrl]
// Writes JPEGs to .review/ (git-ignored).
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:4173';
const outDir = decodeURIComponent(new URL('../.review/', import.meta.url).pathname);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

const shoot = async (name, opts = {}) => {
  await page.screenshot({ path: `${outDir}${name}.jpg`, type: 'jpeg', quality: 72, ...opts });
  console.log('captured', name);
};

const scrollTo = async (selector, offset = -16) => {
  await page.evaluate(
    ([sel, off]) => {
      const el = document.querySelector(sel);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + off, behavior: 'instant' });
    },
    [selector, offset],
  );
  await page.waitForTimeout(1200); // reveal animations
};

// 1 — hero (pre-conference countdown)
await page.goto(`${base}/?now=2026-07-10T10:00`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1600);
await shoot('01-hero');

// 2 — schedule board, day 1 live at 13:30
await page.goto(`${base}/?now=2026-07-15T13:30`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1600);
await scrollTo('#agenda');
await shoot('02-board-day1-live');

// 3 — session modal with papers (open A1)
await page.evaluate(() => {
  const target = [...document.querySelectorAll('.block')].find((b) => b.textContent.includes('A1'));
  target?.click();
});
await page.waitForTimeout(700);
await shoot('03-session-papers-modal');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// 4 — day 2
await page.evaluate(() => document.querySelectorAll('.chrono-day')[1]?.click());
await page.waitForTimeout(1100);
await shoot('04-board-day2');

// 5 — venue (hologram, locked)
await scrollTo('#venue');
await page.waitForTimeout(600);
await shoot('05-venue-hologram');

// 6 — venue with Hall selected
await page.evaluate(() => {
  const hall = [...document.querySelectorAll('.floor-room.is-clickable')].find((r) =>
    r.getAttribute('aria-label')?.includes('Hall B1.302'),
  );
  hall?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
});
await page.waitForTimeout(900);
await shoot('06-venue-hall-selected');

// 7 — modal wayfinding (open SS in Hall, back on day 1)
await scrollTo('#agenda');
await page.evaluate(() => document.querySelectorAll('.chrono-day')[0]?.click());
await page.waitForTimeout(1100);
await page.evaluate(() => {
  const target = [...document.querySelectorAll('.block')].find((b) => b.textContent.includes('Netzero'));
  target?.click();
});
await page.waitForTimeout(700);
await page.evaluate(() => {
  document.querySelector('.modal-wayfinding')?.scrollIntoView({ block: 'center', behavior: 'instant' });
});
await shoot('07-modal-wayfinding');
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

// 9 — footer notes
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
await page.waitForTimeout(900);
await shoot('09-footer');

// 10 — mobile board
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/?now=2026-07-15T13:30`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await scrollTo('#agenda');
await shoot('10-mobile-board');

// 11 — mobile venue
await scrollTo('#venue');
await shoot('11-mobile-venue');

await browser.close();
console.log('done');
