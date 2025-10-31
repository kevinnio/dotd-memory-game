/**
 * Day of the Dead Memory Game - Card Data
 * 
 * This file contains the complete card data for all 18 unique cards
 * Each card appears twice in the game for a total of 36 cards in a 6x6 grid
 */

const CARD_DATA = [
  // Catrinas (4 cards)
  {
    id: 'catrina-1',
    imageId: 'catrina-1',
    name: 'Elegant Hat Catrina',
    description: 'Traditional skeleton lady with ornate orange hat and purple dress',
    category: 'catrinas',
    imagePath: 'assets/images/catrina-1.svg'
  },
  {
    id: 'catrina-2',
    imageId: 'catrina-2',
    name: 'Flower Crown Catrina',
    description: 'Catrina adorned with colorful flower crown and heart-shaped eyes',
    category: 'catrinas',
    imagePath: 'assets/images/catrina-2.svg'
  },
  {
    id: 'catrina-3',
    imageId: 'catrina-3',
    name: 'Veiled Catrina',
    description: 'Mysterious catrina with purple veil and diamond-shaped eyes',
    category: 'catrinas',
    imagePath: 'assets/images/catrina-3.svg'
  },
  {
    id: 'catrina-4',
    imageId: 'catrina-4',
    name: 'Feathered Hat Catrina',
    description: 'Dapper catrina with feathered hat, bow tie, and star-shaped eyes',
    category: 'catrinas',
    imagePath: 'assets/images/catrina-4.svg'
  },

  // Sugar Skulls (4 cards)
  {
    id: 'sugar-skull-1',
    imageId: 'sugar-skull-1',
    name: 'Traditional Sugar Skull',
    description: 'Classic white sugar skull with colorful floral eye patterns and decorative mouth',
    category: 'sugar-skulls',
    imagePath: 'assets/images/sugar-skull-1.svg'
  },
  {
    id: 'sugar-skull-2',
    imageId: 'sugar-skull-2',
    name: 'Geometric Sugar Skull',
    description: 'Sugar skull with diamond-shaped eyes and geometric teeth pattern',
    category: 'sugar-skulls',
    imagePath: 'assets/images/sugar-skull-2.svg'
  },
  {
    id: 'sugar-skull-3',
    imageId: 'sugar-skull-3',
    name: 'Floral Sugar Skull',
    description: 'Sugar skull decorated with petal patterns in eyes and vine motifs',
    category: 'sugar-skulls',
    imagePath: 'assets/images/sugar-skull-3.svg'
  },
  {
    id: 'sugar-skull-4',
    imageId: 'sugar-skull-4',
    name: 'Swirl Sugar Skull',
    description: 'Sugar skull with spiral patterns and decorative swirl motifs',
    category: 'sugar-skulls',
    imagePath: 'assets/images/sugar-skull-4.svg'
  },

  // Ofrendas (4 cards)
  {
    id: 'ofrenda-1',
    imageId: 'ofrenda-1',
    name: 'Candle Altar',
    description: 'Collection of lit candles with marigold flowers and altar base',
    category: 'ofrendas',
    imagePath: 'assets/images/ofrenda-1.svg'
  },
  {
    id: 'ofrenda-2',
    imageId: 'ofrenda-2',
    name: 'Photo Memorial',
    description: 'Framed photograph with candles, flowers, and papel picado decorations',
    category: 'ofrendas',
    imagePath: 'assets/images/ofrenda-2.svg'
  },
  {
    id: 'ofrenda-3',
    imageId: 'ofrenda-3',
    name: 'Cross and Skull Altar',
    description: 'Sacred altar with cross, skull, rosary beads, and incense',
    category: 'ofrendas',
    imagePath: 'assets/images/ofrenda-3.svg'
  },
  {
    id: 'ofrenda-4',
    imageId: 'ofrenda-4',
    name: 'Food Offerings Altar',
    description: 'Altar with fruits, bread, candles, and traditional food offerings',
    category: 'ofrendas',
    imagePath: 'assets/images/ofrenda-4.svg'
  },

  // Axolotls (2 cards)
  {
    id: 'axolotl-1',
    imageId: 'axolotl-1',
    name: 'Festive Pink Axolotl',
    description: 'Orange axolotl with purple gills and decorative spots',
    category: 'axolotls',
    imagePath: 'assets/images/axolotl-1.svg'
  },
  {
    id: 'axolotl-2',
    imageId: 'axolotl-2',
    name: 'Purple Party Axolotl',
    description: 'Purple axolotl with orange gills, festive hat, and decorative patterns',
    category: 'axolotls',
    imagePath: 'assets/images/axolotl-2.svg'
  },

  // Marigolds (2 cards)
  {
    id: 'marigold-1',
    imageId: 'marigold-1',
    name: 'Single Marigold Bloom',
    description: 'Large single marigold flower with layered petals and stem',
    category: 'marigolds',
    imagePath: 'assets/images/marigold-1.svg'
  },
  {
    id: 'marigold-2',
    imageId: 'marigold-2',
    name: 'Marigold Cluster',
    description: 'Multiple marigold flowers of different sizes with stems and buds',
    category: 'marigolds',
    imagePath: 'assets/images/marigold-2.svg'
  },

  // Pan de Muerto (2 cards)
  {
    id: 'pan-de-muerto-1',
    imageId: 'pan-de-muerto-1',
    name: 'Traditional Pan de Muerto',
    description: 'Round bread with cross pattern and bone decorations on plate',
    category: 'pan-de-muerto',
    imagePath: 'assets/images/pan-de-muerto-1.svg'
  },
  {
    id: 'pan-de-muerto-2',
    imageId: 'pan-de-muerto-2',
    name: 'Skull-Shaped Pan de Muerto',
    description: 'Skull-shaped bread with sugar icing and decorative patterns',
    category: 'pan-de-muerto',
    imagePath: 'assets/images/pan-de-muerto-2.svg'
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CARD_DATA };
}

// Make available globally for browser use
if (typeof window !== 'undefined') {
  window.CARD_DATA = CARD_DATA;
}