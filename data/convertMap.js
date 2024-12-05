import fs from 'fs';
import process from 'process';

// Path to the JSON file containing the map data
const mapDataPath = process.argv[2];
if (!mapDataPath) {
    throw new Error('No map data path provided. Usage: node convertMap.js <mapDataPath> <assetPath> <tilesetpxw> <tilesetpxh>');
}

// Retrieve command line arguments for asset path and dimensions
const assetPath = process.argv[3];
if (!assetPath) {
    throw new Error('No asset path provided. Usage: node convertMap.js <mapDataPath> <assetPath> <tilesetpxw> <tilesetpxh>');
}

const tilesetpxw = parseInt(process.argv[4], 10);
if (isNaN(tilesetpxw)) {
    throw new Error('Tileset pixel width must be a number. Usage: node convertMap.js <mapDataPath> <assetPath> <tilesetpxw> <tilesetpxh>');
}

const tilesetpxh = parseInt(process.argv[5], 10);
if (isNaN(tilesetpxh)) {
    throw new Error('Tileset pixel height must be a number. Usage: node convertMap.js <mapDataPath> <assetPath> <tilesetpxw> <tilesetpxh>');
}

// Read the JSON file and parse it
const tiledMapData = JSON.parse(fs.readFileSync(mapDataPath, 'utf8'));

const tileDimension = tiledMapData.tilewidth;
const width = tiledMapData.width;
const height = tiledMapData.height;

// Function to convert Tiled 1D array to 3D array for the game engine
function convertLayerData(layerData, width, height) {
  let newArray = [];
  for (let i = 0; i < width; i++) {
    newArray[i] = [];
    for (let j = 0; j < height; j++) {
      newArray[i][j] = layerData[j * width + i] - 1;
    }
  }
  return [newArray];
}

// Process each layer and prepare JS module content
let jsContent = `// Map generated by convertMap.js\n\n`;
jsContent += `export const tilesetpath = "${assetPath}";\n`;
jsContent += `export const tiledim = ${tileDimension};\n`;
jsContent += `export const screenxtiles = ${width};\n`;
jsContent += `export const screenytiles = ${height};\n`;
jsContent += `export const tilesetpxw = ${tilesetpxw};\n`;
jsContent += `export const tilesetpxh = ${tilesetpxh};\n\n`;

tiledMapData.layers.forEach(layer => {
  const processedData = convertLayerData(layer.data, layer.width, layer.height);
  jsContent += `export const ${layer.name} = ${JSON.stringify(processedData)};\n`;
});

// TODO: Add animated sprites
jsContent += `export const animatedsprites = [

]\n`

// Optionally, add map dimensions based on the first layer
if (tiledMapData.layers.length > 0) {
  const firstLayer = tiledMapData.layers[0];
  jsContent += `export const mapwidth = ${firstLayer.width};\n`;
  jsContent += `export const mapheight = ${firstLayer.height};\n`;
}

// Write the processed data to the final JS file
fs.writeFileSync('converted-map.js', jsContent);

console.log('Map conversion and JS module creation complete.');