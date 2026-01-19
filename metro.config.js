const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname);

// Agregar extensiones para archivos 3D
config.resolver.assetExts.push('glb', 'gltf', 'obj', 'mtl', 'fbx');

// Agregar extensiones de source
config.resolver.sourceExts.push('js', 'json', 'ts', 'tsx', 'jsx');

module.exports = withNativeWind(config, { input: './global.css' });