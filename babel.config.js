module.exports = function(api) {
  api.cache.invalidate(() => process.env.NODE_ENV);

  const plugins = ['@babel/plugin-transform-modules-commonjs'];
  const presets = [
    ['@babel/preset-react', {'pragma': 'createElement'}]
  ];

  if (api.env('production')) {
    plugins.push('babel-plugin-unassert');
  } else {
    plugins.push('babel-plugin-espower');
  }

  return { plugins, presets };
}
