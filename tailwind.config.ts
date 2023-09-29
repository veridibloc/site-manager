import type { Config } from 'tailwindcss'
// @ts-ignore
import preline from 'preline/plugin.js';
import tailwindforms from "@tailwindcss/forms"
    ""
const config: Config = {
  content: [
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/preline/dist/*.js',
  ],
  // darkMode: 'class',
  plugins: [
    tailwindforms,
    preline,
  ]
}
export default config
