module.exports = function(api) {
  if (api) api.cache(true);

  const plugins = ['@babel/plugin-transform-modules-commonjs'];
  const presets = [
    ['@babel/preset-react', {'pragma': 'createElement'}]
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push('babel-plugin-unassert');
  } else {
    plugins.push('babel-plugin-espower');
  }

  return { plugins, presets };
}
