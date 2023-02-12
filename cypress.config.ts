import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'k3qz2d',
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    }
  },
  video: false
})
