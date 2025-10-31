# Day of the Dead Memory Game - Design Document

## Overview

The Day of the Dead Memory Game is a web-based card matching game built with HTML, CSS, and JavaScript. The game features a 6x6 grid of cards with Mexican Día de los Muertos themed imagery, implementing classic memory game mechanics with smooth animations and cultural aesthetics.

## Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid for layout, CSS animations for card flips
- **Assets**: SVG or PNG images for Day of the Dead themed card faces
- **Deployment**: Static web application (can be served from any web server)

### Application Structure
```
day-of-dead-memory-game/
├── index.html          # Main game page
├── styles/
│   ├── main.css       # Core game styling
│   └── animations.css # Card flip and transition effects
├── scripts/
│   ├── game.js        # Main game logic
│   ├── card.js        # Card component logic
│   └── utils.js       # Utility functions
└── assets/
    └── images/        # Day of the Dead themed card images
```

## Components and Interfaces

### Game Manager (game.js)
**Responsibilities:**
- Initialize game state and grid
- Handle game flow and turn management
- Track matches and win conditions
- Manage card shuffling and placement

**Key Methods:**
```javascript
class GameManager {
  initializeGame()           // Set up new game
  handleCardClick(cardId)    // Process card selection
  checkForMatch()            // Evaluate selected card pair
  checkWinCondition()        // Determine if game is won
  resetGame()               // Start new game
  shuffleCards()            // Randomize card positions
}
```

### Card Component (card.js)
**Responsibilities:**
- Manage individual card state (face-up/face-down)
- Handle card flip animations
- Store card imagery and matching data

**Key Methods:**
```javascript
class Card {
  flip()                    // Execute flip animation
  flipBack()               // Return to face-down state
  setImage(imagePath)      // Assign themed imagery
  isFlipped()              // Check current state
  matches(otherCard)       // Compare with another card
}
```

### Game Grid Interface
**Structure:**
- CSS Grid layout (6x6 = 36 cards)
- Responsive design for different screen sizes
- Card positioning and spacing management

## Data Models

### Game State
```javascript
const gameState = {
  cards: [],              // Array of Card objects
  selectedCards: [],      // Currently selected cards (max 2)
  matchedPairs: 0,       // Number of successful matches
  totalPairs: 18,        // Total pairs in 6x6 grid
  moves: 0,              // Player move counter
  isProcessing: false,   // Prevent clicks during evaluation
  gameWon: false         // Win condition flag
}
```

### Card Data
```javascript
const cardData = {
  id: 'unique-identifier',
  imageId: 'catrina-1',     // Reference to themed image
  isFlipped: false,         // Current face state
  isMatched: false,         // Permanent match state
  element: HTMLElement      // DOM reference
}
```

### Theme Assets
Day of the Dead imagery categories:
- **Catrinas**: Elegant skeleton figures (4 variations)
- **Sugar Skulls**: Decorated skull designs (4 variations)
- **Ofrendas**: Altar elements like candles, flowers (4 variations)
- **Axolotls**: Mexican salamanders in festive colors (2 variations)
- **Marigolds**: Traditional orange flowers (2 variations)
- **Pan de Muerto**: Traditional bread (2 variations)

## Error Handling

### Input Validation
- Prevent clicking during card flip animations
- Disable interaction with already matched cards
- Limit selection to maximum of 2 cards per turn

### State Management
- Validate game state before processing moves
- Handle edge cases in win condition detection
- Ensure proper cleanup between game sessions

### Animation Conflicts
- Queue card flip requests to prevent overlapping animations
- Implement animation completion callbacks
- Handle rapid clicking gracefully

## Testing Strategy

### Unit Testing Focus Areas
- Card matching logic validation
- Game state transitions
- Win condition detection
- Card shuffling randomization

### Integration Testing
- Card click to flip animation flow
- Match evaluation and state updates
- Game reset functionality
- Responsive layout behavior

### User Experience Testing
- Animation smoothness and timing
- Visual feedback clarity
- Color accessibility compliance
- Mobile device compatibility

## Visual Design Specifications

### Color Palette
- **Primary Background**: #1a0d1a (deep purple-black)
- **Card Backs**: #2d1b2d (dark purple)
- **Accent Colors**: #ff6b35 (vibrant orange), #8b4a9c (purple)
- **Text**: #f4f4f4 (off-white)
- **Borders**: #ff6b35 (orange highlights)

### Typography
- **Headers**: "Creepster" or "Butcherman" (Google Fonts)
- **Body Text**: "Roboto" with fallback to sans-serif
- **Game UI**: Bold, high contrast for accessibility

### Animation Specifications
- **Card Flip Duration**: 0.6 seconds
- **Flip Back Delay**: 1.2 seconds after mismatch
- **Easing**: cubic-bezier(0.4, 0.0, 0.2, 1)
- **Hover Effects**: Subtle scale transform (1.05x)

### Layout Specifications
- **Grid Gap**: 12px between cards
- **Card Aspect Ratio**: 1:1 (square)
- **Minimum Card Size**: 80px x 80px
- **Maximum Grid Width**: 600px
- **Responsive Breakpoints**: 768px (tablet), 480px (mobile)