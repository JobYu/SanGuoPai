import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const inputDir = '/Volumes/APFS/project/SanGuoPai/public/assets/avatars/';
const outputDir = '/Volumes/APFS/project/SanGuoPai/public/assets/cards/';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('_sexy_pixel.png'));

console.log(`Found ${files.length} images to process.`);

files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputName = file.replace('_sexy_pixel.png', '_card.png');
    const outputPath = path.join(outputDir, outputName);

    try {
        // Step 1: Get trim coordinates with a conservative fuzz to find the whole card including frame
        const format = '%wx%h+%O';
        const coords = execSync(`magick "${inputPath}" -fuzz 20% -trim -format "${format}" info:`).toString().trim();

        console.log(`Processing ${file}: coords ${coords}`);

        // Step 2: Apply the crop
        // We use the coords returned above. The format is WxH+X+Y
        // Sometimes magick returns ++X+Y, we need to handle that
        const cleanCoords = coords.replace(/\+\+/g, '+');

        execSync(`magick "${inputPath}" -crop ${cleanCoords} +repage "${outputPath}"`);
        console.log(`Saved to ${outputName}`);
    } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
    }
});

console.log('All done!');
