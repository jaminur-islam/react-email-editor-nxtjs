module.exports = {
    webpack: (
        externals: {
            'react': 'window.unlayer.React',
           
          },
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
      // Important: return the modified config
      return config
    },
  }