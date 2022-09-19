module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,

    webpack: (config) => {
      config.resolve = {
        ...config.resolve,
        fallback: {
          fs: false,
          os: false,
          path: false,
        },
      }
      return config
    },
  }
}
