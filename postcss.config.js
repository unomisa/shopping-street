module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      exclude: [/tab-bar/]
    }
  }
}