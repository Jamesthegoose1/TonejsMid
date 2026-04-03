#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Midi } = require('@tonejs/midi');

function findMidiFile(folder) {
  const files = fs.readdirSync(folder);
  const candidates = files.filter((f) => f.toLowerCase().endsWith('.mid') || f.toLowerCase().endsWith('.midi'));
  if (candidates.length === 0) return null;
  return candidates[0];
}

function convert(inputPath, outputPath) {
  const input = fs.readFileSync(inputPath);
  const midi = new Midi(input);
  const toneJson = midi.toJSON();
  fs.writeFileSync(outputPath, JSON.stringify(toneJson, null, 2), 'utf8');
}

(async () => {
  try {
    const currentFolder = process.cwd();
    let inputFile = process.argv[2] || findMidiFile(currentFolder);

    if (!inputFile) {
      console.error('No .mid/.midi file found in folder:', currentFolder);
      process.exit(1);
    }

    inputFile = path.isAbsolute(inputFile) ? inputFile : path.resolve(currentFolder, inputFile);

    if (!fs.existsSync(inputFile)) {
      console.error('Input MIDI file not found:', inputFile);
      process.exit(1);
    }

    const parsed = path.parse(inputFile);
    const outputFileName = `${parsed.name}.tonejs.json`;
    const outputPath = path.resolve(parsed.dir, outputFileName);

    convert(inputFile, outputPath);

    console.log('Converted MIDI to Tone.js JSON successfully:');
    console.log('  input :', inputFile);
    console.log('  output:', outputPath);
  } catch (error) {
    console.error('Conversion failed:', error.message || error);
    process.exit(1);
  }
})();
