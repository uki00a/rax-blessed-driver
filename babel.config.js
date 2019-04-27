module.exports = function(api) { // eslint-disable-line no-undef
  api.cache.invalidate(() => process.env.NODE_ENV); // eslint-disable-line no-undef

  const plugins = ['@babel/plugin-transform-modules-commonjs'];
  const presets = [
    ['@babel/preset-react', {'pragma': 'createElement'}]
  ];

  if (api.env('production')) {
    plugins.push('babel-plugin-unassert');
  } else {
    presets.push('power-assert');
  }

  return { plugins, presets };
}
