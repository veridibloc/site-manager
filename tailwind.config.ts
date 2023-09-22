import type { Config } from 'tailwindcss'
// @ts-ignore
import preline from 'preline/plugin.js';

const config: Config = {
  content: [
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/preline/dist/*.js',
  ],
  // darkMode: 'class',
  plugins: [ preline ]
}
export default config
