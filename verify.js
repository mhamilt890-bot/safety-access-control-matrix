const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");
const js = fs.readFileSync("app.js", "utf8");

const ids = [...js.matchAll(/getElementById\("([^"]+)"\)/g)].map((match) => match[1]);
const missingIds = [...new Set(ids)].filter((id) => !html.includes(`id="${id}"`));
const pages = [...html.matchAll(/data-page="([^"]+)"/g)].map((match) => match[1]);
const missingPages = [...new Set(pages)].filter((id) => !html.includes(`id="${id}"`));

console.log(JSON.stringify({
  checkedIds: [...new Set(ids)].length,
  missingIds,
  pages: [...new Set(pages)],
  missingPages
}, null, 2));

if (missingIds.length || missingPages.length) {
  process.exit(1);
}
