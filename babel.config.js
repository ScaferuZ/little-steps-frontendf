module.exports = function (api) {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      // Compile Exported Namespaces
      '@babel/plugin-proposal-export-namespace-from',
      // React Native Reanimated
      'react-native-reanimated/plugin',
      // Use Absolute Imports
      ['module-resolver', { alias: { src: './src' } }]
    ]
  }
}
