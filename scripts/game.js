/**
 * Day of the Dead Memory Game - Main Game Logic
 * 
 * GameManager class handles game initialization, card management, and game flow
 */

class GameManager {
  /**
   * Create a new GameManager instance
   */
  constructor() {
    // Game state properties
    this.cards = [];
    this.selectedCards = [];
    this.matchedPairs = 0;
    this.totalPairs = 8; // 8 unique cards = 8 pairs in 4x4 grid
    this.moves = 0;
    this.isProcessing = false;
    this.gameWon = false;
    
    // Timer properties
    this.gameStartTime = null;
    this.gameEndTime = null;
    this.timerInterval = null;
    this.elapsedTime = 0; // in seconds
    
    // DOM element references
    this.gameGrid = null;
    this.moveCounter = null;
    this.timerDisplay = null;
    this.winMessage = null;
    this.resetButton = null;
    this.playAgainButton = null;
    
    // Initialize the game
    this.initializeGame();
  }

  /**
   * Initialize the game by setting up DOM references and creating the card grid
   * Implements requirements 1.2, 1.5, 4.5
   */
  initializeGame() {
    // Get DOM element references
    this.gameGrid = document.getElementById('game-grid');
    this.moveCounter = document.getElementById('move-count');
    this.timerDisplay = document.getElementById('timer-display');
    this.winMessage = document.getElementById('win-message');
    this.resetButton = document.getElementById('reset-btn');
    this.playAgainButton = document.getElementById('play-again-btn');
    
    if (!this.gameGrid) {
      console.error('Game grid element not found');
      return;
    }
    
    // Bind event handlers
    this.bindEventHandlers();
    
    // Create and shuffle cards
    this.createCardGrid();
    
    // Update UI
    this.updateMoveCounter();
    this.updateTimerDisplay();
    
    console.log('Game initialized with', this.cards.length, 'cards');
  }

  /**
   * Create the 4x4 card grid with shuffled card pairs
   * Each of the first 8 unique cards appears exactly twice
   */
  createCardGrid() {
    // Clear existing cards
    this.cards = [];
    this.gameGrid.innerHTML = '';
    
    // Create card pairs - use only the first 8 cards from CARD_DATA for 4x4 grid
    const cardPairs = [];
    CARD_DATA.slice(0, 8).forEach(cardData => {
      // Add two instances of each card (for matching pairs)
      cardPairs.push({ ...cardData });
      cardPairs.push({ ...cardData });
    });
    
    // Shuffle the card pairs
    const shuffledCards = this.shuffleCards(cardPairs);
    
    // Create Card instances and DOM elements
    shuffledCards.forEach((cardData, index) => {
      // Create unique ID for each card instance
      const cardId = `card-${index}`;
      
      // Create DOM element
      const cardElement = Card.createCardElement(cardId);
      
      // Create Card instance
      const card = new Card(cardId, cardData, cardElement);
      
      // Bind click handler
      card.bindClickHandler((clickedCard) => {
        this.handleCardClick(clickedCard);
      });
      
      // Add to cards array and DOM
      this.cards.push(card);
      this.gameGrid.appendChild(cardElement);
    });
    
    console.log('Created', this.cards.length, 'cards in grid');
  }

  /**
   * Shuffle an array of cards using Fisher-Yates algorithm
   * Ensures random placement for each new game (requirement 4.5)
   * @param {Array} cards - Array of card data to shuffle
   * @returns {Array} Shuffled array of cards
   */
  shuffleCards(cards) {
    const shuffled = [...cards]; // Create a copy to avoid mutating original
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }

  /**
   * Bind event handlers for game controls
   */
  bindEventHandlers() {
    if (this.resetButton) {
      this.resetButton.addEventListener('click', () => {
        this.resetGame();
      });
    }
    
    if (this.playAgainButton) {
      this.playAgainButton.addEventListener('click', () => {
        this.resetGame();
      });
    }
  }

  /**
   * Update the move counter display
   */
  updateMoveCounter() {
    if (this.moveCounter) {
      this.moveCounter.textContent = this.moves;
    }
  }

  /**
   * Start the game timer
   */
  startTimer() {
    if (this.timerInterval) {
      return; // Timer already running
    }
    
    this.gameStartTime = Date.now();
    this.timerInterval = setInterval(() => {
      this.elapsedTime = Math.floor((Date.now() - this.gameStartTime) / 1000);
      this.updateTimerDisplay();
    }, 1000);
  }

  /**
   * Stop the game timer
   */
  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.gameEndTime = Date.now();
    }
  }

  /**
   * Update the timer display with formatted time
   */
  updateTimerDisplay() {
    if (this.timerDisplay) {
      const minutes = Math.floor(this.elapsedTime / 60);
      const seconds = this.elapsedTime % 60;
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      this.timerDisplay.textContent = formattedTime;
    }
  }

  /**
   * Get formatted game statistics
   * @returns {Object} Object containing game statistics
   */
  getGameStatistics() {
    const totalTime = this.gameEndTime ? 
      Math.floor((this.gameEndTime - this.gameStartTime) / 1000) : 
      this.elapsedTime;
    
    return {
      moves: this.moves,
      timeInSeconds: totalTime,
      matchedPairs: this.matchedPairs,
      totalPairs: this.totalPairs,
      formattedTime: this.formatTime(totalTime)
    };
  }

  /**
   * Format time in seconds to MM:SS format
   * @param {number} timeInSeconds - Time in seconds
   * @returns {string} Formatted time string
   */
  formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Handle card click events for turn management
   * Implements requirements 2.4, 2.5, 3.1, 3.4
   * @param {Card} clickedCard - The card that was clicked
   */
  handleCardClick(clickedCard) {
    // Prevent interaction during processing or if game is won
    if (this.isProcessing || this.gameWon) {
      return;
    }
    
    // Prevent clicking cards that are already flipped or matched
    if (!clickedCard.canBeSelected()) {
      return;
    }
    
    // Prevent selecting more than 2 cards per turn
    if (this.selectedCards.length >= 2) {
      return;
    }
    
    // Start timer on first card click
    if (this.moves === 0 && this.selectedCards.length === 0) {
      this.startTimer();
    }
    
    // Flip the card and add to selected cards
    clickedCard.flip().then(() => {
      this.selectedCards.push(clickedCard);
      
      // If two cards are selected, check for match
      if (this.selectedCards.length === 2) {
        this.setProcessingState(true); // Prevent further selections during evaluation
        this.moves++; // Increment move counter
        this.updateMoveCounter();
        
        // Check for match after a brief delay to show both cards
        setTimeout(() => {
          this.checkForMatch();
        }, 800);
      }
    });
  }

  /**
   * Set the processing state to prevent/allow card interactions
   * @param {boolean} processing - Whether the game is currently processing
   */
  setProcessingState(processing) {
    this.isProcessing = processing;
    
    // Add/remove processing class to game grid for visual feedback
    if (this.gameGrid) {
      this.gameGrid.classList.toggle('processing', processing);
    }
  }

  /**
   * Check if the two selected cards match and handle the result
   * Implements requirements 2.5, 3.1, 3.4
   */
  checkForMatch() {
    if (this.selectedCards.length !== 2) {
      this.isProcessing = false;
      return;
    }
    
    const [card1, card2] = this.selectedCards;
    
    if (card1.matches(card2)) {
      // Cards match - mark as matched and keep face-up
      card1.setMatched();
      card2.setMatched();
      this.matchedPairs++;
      
      console.log(`Match found! ${this.matchedPairs}/${this.totalPairs} pairs matched`);
      
      // Check for win condition
      this.checkWinCondition();
      
      // Reset turn state for matched cards
      this.resetTurnState();
    } else {
      // Cards don't match - show mismatch animation then flip back (requirement 3.2, 3.3)
      console.log('No match - cards will flip back');
      
      // First show mismatch animation
      Promise.all([
        card1.showMismatch(),
        card2.showMismatch()
      ]).then(() => {
        // Wait a brief moment after mismatch animation
        setTimeout(() => {
          // Then flip both cards back with smooth animation
          Promise.all([
            card1.flipBack(),
            card2.flipBack()
          ]).then(() => {
            // Reset turn state after flip back animation completes
            this.resetTurnState();
          });
        }, 800); // Brief delay after mismatch animation before flipping back
      });
    }
  }

  /**
   * Check if the win condition has been met
   * Implements requirements 4.1, 4.2
   */
  checkWinCondition() {
    if (this.matchedPairs >= this.totalPairs) {
      this.gameWon = true;
      this.stopTimer(); // Stop the timer when game is won
      this.showVictoryMessage();
      
      const stats = this.getGameStatistics();
      console.log(`Game won in ${stats.moves} moves and ${stats.formattedTime}!`);
    }
  }

  /**
   * Display victory message and game completion UI
   * Implements requirements 4.2, 4.3
   */
  showVictoryMessage() {
    if (this.winMessage) {
      // Get game statistics
      const stats = this.getGameStatistics();
      const moveText = stats.moves === 1 ? '1 move' : `${stats.moves} moves`;
      
      // Update victory message with move count and time
      const messageContent = this.winMessage.querySelector('p');
      if (messageContent) {
        messageContent.textContent = `You found all matching pairs in ${moveText} and ${stats.formattedTime}!`;
      }
      
      // Show the victory message
      this.winMessage.classList.remove('hidden');
      
      // Focus on the play again button for accessibility
      if (this.playAgainButton) {
        setTimeout(() => {
          this.playAgainButton.focus();
        }, 100);
      }
    }
  }

  /**
   * Reset the turn state after processing a pair
   * Implements requirement 3.4
   */
  resetTurnState() {
    this.selectedCards = [];
    this.setProcessingState(false);
  }

  /**
   * Reset the game to initial state for a new game
   * Implements requirement 4.3, 4.5
   */
  resetGame() {
    // Stop and reset timer
    this.stopTimer();
    this.gameStartTime = null;
    this.gameEndTime = null;
    this.elapsedTime = 0;
    
    // Reset game state
    this.selectedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.isProcessing = false;
    this.gameWon = false;
    
    // Hide win message
    if (this.winMessage) {
      this.winMessage.classList.add('hidden');
    }
    
    // Reset processing state on game grid
    if (this.gameGrid) {
      this.gameGrid.classList.remove('processing');
    }
    
    // Reset all cards
    this.cards.forEach(card => {
      card.reset();
    });
    
    // Create new shuffled grid
    this.createCardGrid();
    
    // Update UI displays
    this.updateMoveCounter();
    this.updateTimerDisplay();
    
    console.log('Game reset - new game started');
  }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Ensure CARD_DATA is available
  if (typeof CARD_DATA === 'undefined') {
    console.error('CARD_DATA not found. Make sure card-data.js is loaded before game.js');
    return;
  }
  
  // Create game instance
  window.gameManager = new GameManager();
});