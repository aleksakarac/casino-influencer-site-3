# Fonts Directory

## Sochi2014 Font

To use the Sochi2014 font, please add the following font files to this directory:

- `Sochi2014.woff2` (recommended for best performance)
- `Sochi2014.woff` (fallback)
- `Sochi2014.ttf` (fallback)

You can download Sochi2014 font files from font repositories or if you already have them, copy them to this directory.

## Current Fonts

- **Muller**: Loaded from Fontshare CDN (already working)
- **Sochi2014**: Requires font files to be added to this directory

## Font Usage

The website will use Muller as the primary font, with Sochi2014 as a secondary option, and standard sans-serif as the final fallback.

You can also use specific font classes in your components:
- `font-muller` - Use Muller font specifically
- `font-sochi` - Use Sochi2014 font specifically
- `font-sans` - Use the default font stack (Muller → Sochi2014 → sans-serif)
