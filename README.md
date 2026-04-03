# TonejsMid

This repository includes a small utility to convert a MIDI file in the same folder into a Tone.js JSON object. The converter uses `@tonejs/midi`.

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Place a `.mid` or `.midi` file in the repo root (or provide an explicit path):
   - `Nothing/Bad Piggies - Main Theme.mid.mid` (existing file)
3. Run converter:
   ```bash
   npm run convert -- "Nothing/Bad Piggies - Main Theme.mid.mid"
   ```

   Or, run without arguments from a folder containing a MIDI:
   ```bash
   node convert-midi-to-tonejs-json.js
   ```

4. Output file is `*.tonejs.json` next to input.

## CLI

`node convert-midi-to-tonejs-json.js [path/to/file.mid]`

- If no argument is provided, the script picks the first `.mid` or `.midi` file in the current working directory.
- Output is `inputname.tonejs.json`.
