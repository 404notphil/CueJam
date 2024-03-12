const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const {generate} = require('@storybook/react-native/scripts/generate');

// Run the Storybook generator script
generate({
  configPath: path.resolve(__dirname, './.storybook'),
});

const defaultConfig = getDefaultConfig(__dirname);

// Add the transformer and resolver configurations required by Storybook
const storybookConfig = {
  transformer: {
    ...defaultConfig.transformer,
    unstable_allowRequireContext: true, // Enable the required setting for Storybook
  },
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: [...defaultConfig.resolver.sourceExts, 'mjs'], // Include 'mjs' extension
  },
};

module.exports = mergeConfig(defaultConfig, storybookConfig);
