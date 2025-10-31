# Day of the Dead Memory Game - Cards List

## Overview
This document contains a comprehensive list of all cards planned for the Day of the Dead Memory Game. The game features a 6x6 grid with 36 cards total, consisting of 18 unique card pairs with authentic Mexican Día de los Muertos themed imagery.

## Card Categories and Pairs

### 1. Catrinas (4 pairs)
Elegant skeleton figures representing the iconic Day of the Dead character.

**Pair 1: Elegant Hat Catrina**
- **Name**: Elegant Hat Catrina
- **Description**: Traditional skeleton lady with ornate orange hat and purple dress
- **Image ID**: `catrina-1`
- **Cultural Significance**: Represents the iconic figure created by José Guadalupe Posada

**Pair 2: Flower Crown Catrina**
- **Name**: Flower Crown Catrina
- **Description**: Catrina adorned with colorful flower crown and heart-shaped eyes
- **Image ID**: `catrina-2`
- **Cultural Significance**: Incorporates traditional Day of the Dead flower symbolism

**Pair 3: Veiled Catrina**
- **Name**: Veiled Catrina
- **Description**: Mysterious catrina with purple veil and diamond-shaped eyes
- **Image ID**: `catrina-3`
- **Cultural Significance**: Represents the solemn aspect of remembering the deceased

**Pair 4: Feathered Hat Catrina**
- **Name**: Feathered Hat Catrina
- **Description**: Dapper catrina with feathered hat, bow tie, and star-shaped eyes
- **Image ID**: `catrina-4`
- **Cultural Significance**: Shows the festive and celebratory nature of Day of the Dead

### 2. Sugar Skulls (4 pairs)
Decorated skull designs representing calaveras de azúcar.

**Pair 5: Traditional Sugar Skull**
- **Name**: Traditional Sugar Skull
- **Description**: Classic white sugar skull with colorful floral eye patterns and decorative mouth
- **Image ID**: `sugar-skull-1`
- **Cultural Significance**: Traditional offering placed on ofrendas for deceased loved ones

**Pair 6: Geometric Sugar Skull**
- **Name**: Geometric Sugar Skull
- **Description**: Sugar skull with diamond-shaped eyes and geometric teeth pattern
- **Image ID**: `sugar-skull-2`
- **Cultural Significance**: Represents the artistry and craftsmanship of sugar skull making

**Pair 7: Floral Sugar Skull**
- **Name**: Floral Sugar Skull
- **Description**: Sugar skull decorated with petal patterns in eyes and vine motifs
- **Image ID**: `sugar-skull-3`
- **Cultural Significance**: Incorporates nature symbolism representing life and death cycles

**Pair 8: Swirl Sugar Skull**
- **Name**: Swirl Sugar Skull
- **Description**: Sugar skull with spiral patterns and decorative swirl motifs
- **Image ID**: `sugar-skull-4`
- **Cultural Significance**: Represents the eternal cycle of life and spiritual journeys

### 3. Ofrendas (4 pairs)
Altar elements including candles, flowers, and ceremonial objects.

**Pair 9: Candle Altar**
- **Name**: Candle Altar
- **Description**: Collection of lit candles with marigold flowers and altar base
- **Image ID**: `ofrenda-1`
- **Cultural Significance**: Candles guide spirits back to the world of the living

**Pair 10: Photo Memorial**
- **Name**: Photo Memorial
- **Description**: Framed photograph with candles, flowers, and papel picado decorations
- **Image ID**: `ofrenda-2`
- **Cultural Significance**: Pictures of deceased family members honored on the altar

**Pair 11: Cross and Skull Altar**
- **Name**: Cross and Skull Altar
- **Description**: Sacred altar with cross, skull, rosary beads, and incense
- **Image ID**: `ofrenda-3`
- **Cultural Significance**: Combines Catholic and indigenous spiritual elements

**Pair 12: Food Offerings Altar**
- **Name**: Food Offerings Altar
- **Description**: Altar with fruits, bread, candles, and traditional food offerings
- **Image ID**: `ofrenda-4`
- **Cultural Significance**: Food offerings nourish the spirits of returning loved ones

### 4. Axolotls (2 pairs)
Mexican salamanders in festive Day of the Dead colors.

**Pair 13: Festive Pink Axolotl**
- **Name**: Festive Pink Axolotl
- **Description**: Orange axolotl with purple gills and decorative spots
- **Image ID**: `axolotl-1`
- **Cultural Significance**: Represents Mexican heritage and the connection to ancient Aztec culture

**Pair 14: Purple Party Axolotl**
- **Name**: Purple Party Axolotl
- **Description**: Purple axolotl with orange gills, festive hat, and decorative patterns
- **Image ID**: `axolotl-2`
- **Cultural Significance**: Blends indigenous Mexican wildlife with Day of the Dead celebration themes

### 5. Marigolds (2 pairs)
Traditional orange flowers central to Day of the Dead celebrations.

**Pair 15: Single Marigold Bloom**
- **Name**: Single Marigold Bloom
- **Description**: Large single marigold flower with layered petals and stem
- **Image ID**: `marigold-1`
- **Cultural Significance**: Cempasúchil flowers are essential elements of Day of the Dead altars

**Pair 16: Marigold Cluster**
- **Name**: Marigold Cluster
- **Description**: Multiple marigold flowers of different sizes with stems and buds
- **Image ID**: `marigold-2`
- **Cultural Significance**: Flower arrangements create beautiful displays on family altars

### 6. Pan de Muerto (2 pairs)
Traditional Day of the Dead bread offerings.

**Pair 17: Traditional Pan de Muerto**
- **Name**: Traditional Pan de Muerto
- **Description**: Round bread with cross pattern and bone decorations on plate
- **Image ID**: `pan-de-muerto-1`
- **Cultural Significance**: Sweet bread offered to deceased loved ones, representing the circle of life

**Pair 18: Skull-Shaped Pan de Muerto**
- **Name**: Skull-Shaped Pan de Muerto
- **Description**: Skull-shaped bread with sugar icing and decorative patterns
- **Image ID**: `pan-de-muerto-2`
- **Cultural Significance**: Creative interpretation combining bread tradition with calavera imagery

## Implementation Status

### Current Status: **Assets Created**
- ✅ Card assets created (18 unique SVG images)
- ✅ Image files added to assets folder
- ❌ Card class not implemented
- ❌ Card data structure not defined

### Next Steps
1. ✅ ~~Create or source 18 unique Day of the Dead themed images~~
2. Implement Card class with image references
3. Add card data structure to game logic
4. ✅ ~~Organize image assets in proper directory structure~~

## Technical Specifications

### Image Requirements
- **Format**: SVG (implemented for scalability and quality)
- **Dimensions**: 100x100 viewBox with square aspect ratio
- **File Naming**: Kebab-case matching the Image ID (e.g., `catrina-1.svg`)
- **Location**: `assets/images/` directory
- **Color Scheme**: Day of the Dead theme with black (#1a0d1a), purple (#8b4a9c), orange (#ff6b35), and white (#f4f4f4)

### Card Data Structure
```javascript
const cardData = {
  id: 'unique-identifier',
  imageId: 'catrina-1',
  name: 'Elegant Hat Catrina',
  description: 'Traditional skeleton lady with ornate orange hat and purple dress',
  category: 'catrinas',
  imagePath: 'assets/images/catrina-1.svg',
  isFlipped: false,
  isMatched: false
}
```

## Cultural Authenticity Notes
All card imagery should respect and accurately represent Mexican Day of the Dead traditions. The designs should be culturally appropriate and educational, helping players learn about this important cultural celebration while enjoying the game.