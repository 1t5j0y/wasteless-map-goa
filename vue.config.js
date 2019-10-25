module.exports = {
  publicPath: '',

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      region: 'ap-south-1',
      bucket: 'goa-waste-eco-map',
      createBucket: false,
      staticHosting: false,
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/webapp',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: false,
      uploadConcurrency: 5,
      pluginVersion: '3.0.0'
    }
  }
};
