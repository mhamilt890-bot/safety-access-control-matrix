const fs = require("fs");
const path = require("path");

const root = __dirname;
const dist = path.join(root, "dist");
const files = ["index.html", "styles.css", "app.js", "README.txt"];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}

const config = `window.SAFETY_ACCESS_CONFIG = {
  supabaseUrl: "${process.env.SUPABASE_URL || ""}",
  supabaseAnonKey: "${process.env.SUPABASE_ANON_KEY || ""}"
};
`;

fs.writeFileSync(path.join(dist, "config.js"), config);

console.log(`Build complete: ${dist}`);
