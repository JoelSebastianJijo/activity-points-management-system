import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base: './' makes the build use relative asset paths, so it works
// correctly when deployed to a GitHub Pages project URL
// (https://<username>.github.io/<repo-name>/) regardless of the
// repository name.
export default defineConfig({
  base: './',
  plugins: [react()],
})
