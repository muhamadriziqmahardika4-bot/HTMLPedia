// Build wrapper: tulis public/version.json (id versi) lalu jalankan vite build.
// version.json dipakai UpdateChecker untuk mendeteksi deploy baru saat app terbuka.
import { writeFileSync, mkdirSync } from "fs";
import { execSync } from "child_process";

const v = Date.now().toString();
mkdirSync("public", { recursive: true });
writeFileSync("public/version.json", JSON.stringify({ v }));
console.log("versi build:", v);
execSync("npx vite build", { stdio: "inherit", env: { ...process.env, BUILD_V: v } });
