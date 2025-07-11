const path = require('path');

module.exports = {
  webpack: {
    alias: {
    },
    configure: (webpackConfig, { env }) => {
      if (env === 'production') {
        webpackConfig.devtool = false;
      }
      return webpackConfig;
    },
  },
  eslint: {
    configure: {
      rules: {
        'import/no-default-export': 'error'
      }
    }
  },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.get('/service-worker.js', (req, res) => {
        res.set('Content-Type', 'application/javascript');
        res.sendFile(path.join(__dirname, 'public/service-worker.js'));
      });

      return middlewares;
    }
  }
};
