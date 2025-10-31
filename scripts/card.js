/**
 * Day of the Dead Memory Game - Card Component Logic
 * 
 * Card class manages individual card state, animations, and DOM interactions
 */

class Card {
  /**
   * Create a new Card instance
   * @param {string} id - Unique identifier for the card
   * @param {Object} cardData - Card data from CARD_DATA containing imageId, imagePath, etc.
   * @param {HTMLElement} element - DOM element representing this card
   */
  constructor(id, cardData, element) {
    this.id = id;
    this.imageId = cardData.imageId;
    this.imagePath = cardData.imagePath;
    this.name = cardData.name;
    this.category = cardData.category;
    
    // Card state properties
    this.isFlipped = false;
    this.isMatched = false;
    this.isAnimating = false;
    
    // DOM element reference
    this.element = element;
    
    // Initialize the card's DOM structure
    this.initializeDOM();
  }

  /**
   * Initialize the DOM structure for the card
   * Creates the card front and back faces
   */
  initializeDOM() {
    this.element.className = 'card face-down';
    this.element.setAttribute('data-card-id', this.id);
    this.element.setAttribute('role', 'button');
    this.element.setAttribute('tabindex', '0');
    this.element.setAttribute('aria-label', `Card: ${this.name}`);
    
    // Create card inner container for 3D flip effect
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    
    // Create card back (face-down state)
    const cardBack = document.createElement('div');
    cardBack.className = 'card-face card-back';
    cardBack.innerHTML = '<div class="card-pattern"></div>';
    
    // Create card front (face-up state)
    const cardFront = document.createElement('div');
    cardFront.className = 'card-face card-front';
    const cardImage = document.createElement('img');
    cardImage.src = this.imagePath;
    cardImage.alt = this.name;
    cardImage.className = 'card-image';
    cardFront.appendChild(cardImage);
    
    // Assemble the card structure
    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    this.element.appendChild(cardInner);
    
    // Store references to key elements
    this.cardInner = cardInner;
    this.cardBack = cardBack;
    this.cardFront = cardFront;
  }

  /**
   * Flip the card to face-up state with animation
   * @returns {Promise} Promise that resolves when flip animation completes
   */
  flip() {
    return new Promise((resolve) => {
      if (this.isFlipped || this.isMatched || this.isAnimating) {
        resolve();
        return;
      }

      this.isAnimating = true;
      this.isFlipped = true;
      
      // Add animation classes to trigger CSS flip animation
      this.element.classList.add('flipping', 'face-up');
      this.element.classList.remove('face-down');
      this.element.setAttribute('aria-label', `Card flipped: ${this.name}`);
      
      // Listen for animation completion event
      const handleAnimationEnd = (event) => {
        if (event.target === this.element && event.animationName === 'none') {
          // Animation completed via transitionend
          this.element.removeEventListener('transitionend', handleAnimationEnd);
          this.element.classList.remove('flipping');
          this.isAnimating = false;
          resolve();
        }
      };
      
      // Listen for CSS transition completion
      const handleTransitionEnd = (event) => {
        if (event.target === this.cardInner && event.propertyName === 'transform') {
          this.element.removeEventListener('transitionend', handleTransitionEnd);
          this.element.classList.remove('flipping');
          this.isAnimating = false;
          resolve();
        }
      };
      
      this.element.addEventListener('transitionend', handleTransitionEnd);
      
      // Fallback timeout in case event doesn't fire
      setTimeout(() => {
        this.element.removeEventListener('transitionend', handleTransitionEnd);
        this.element.classList.remove('flipping');
        this.isAnimating = false;
        resolve();
      }, 650); // Slightly longer than CSS animation duration
    });
  }

  /**
   * Flip the card back to face-down state with animation
   * @returns {Promise} Promise that resolves when flip back animation completes
   */
  flipBack() {
    return new Promise((resolve) => {
      if (!this.isFlipped || this.isMatched || this.isAnimating) {
        resolve();
        return;
      }

      this.isAnimating = true;
      this.isFlipped = false;
      
      // Add animation classes to trigger CSS flip back animation
      this.element.classList.add('flipping', 'face-down');
      this.element.classList.remove('face-up');
      this.element.setAttribute('aria-label', `Card: ${this.name}`);
      
      // Listen for CSS transition completion
      const handleTransitionEnd = (event) => {
        if (event.target === this.cardInner && event.propertyName === 'transform') {
          this.element.removeEventListener('transitionend', handleTransitionEnd);
          this.element.classList.remove('flipping');
          this.isAnimating = false;
          resolve();
        }
      };
      
      this.element.addEventListener('transitionend', handleTransitionEnd);
      
      // Fallback timeout in case event doesn't fire
      setTimeout(() => {
        this.element.removeEventListener('transitionend', handleTransitionEnd);
        this.element.classList.remove('flipping');
        this.isAnimating = false;
        resolve();
      }, 650); // Slightly longer than CSS animation duration
    });
  }

  /**
   * Check if this card matches another card
   * @param {Card} otherCard - The card to compare against
   * @returns {boolean} True if cards match (same imageId)
   */
  matches(otherCard) {
    if (!otherCard || otherCard === this) {
      return false;
    }
    return this.imageId === otherCard.imageId;
  }

  /**
   * Mark this card as permanently matched
   * Matched cards cannot be flipped back and are excluded from interactions
   */
  setMatched() {
    this.isMatched = true;
    this.element.classList.add('matched');
    this.element.setAttribute('aria-label', `Matched card: ${this.name}`);
    this.element.setAttribute('tabindex', '-1'); // Remove from tab order
    
    // Trigger matched animation
    this.element.classList.add('matched');
    setTimeout(() => {
      this.element.classList.remove('matched-pulse');
    }, 1000);
  }

  /**
   * Show mismatch animation before flipping back
   * @returns {Promise} Promise that resolves when mismatch animation completes
   */
  showMismatch() {
    return new Promise((resolve) => {
      if (!this.isFlipped || this.isMatched) {
        resolve();
        return;
      }

      // Add mismatch animation class
      this.element.classList.add('mismatch');
      
      // Listen for animation completion
      const handleAnimationEnd = (event) => {
        if (event.target === this.element && event.animationName === 'shake') {
          this.element.removeEventListener('animationend', handleAnimationEnd);
          this.element.classList.remove('mismatch');
          resolve();
        }
      };
      
      this.element.addEventListener('animationend', handleAnimationEnd);
      
      // Fallback timeout
      setTimeout(() => {
        this.element.removeEventListener('animationend', handleAnimationEnd);
        this.element.classList.remove('mismatch');
        resolve();
      }, 550); // Slightly longer than animation duration
    });
  }

  /**
   * Reset the card to initial face-down state
   * Used when starting a new game
   */
  reset() {
    this.isFlipped = false;
    this.isMatched = false;
    this.isAnimating = false;
    
    // Remove all animation and state classes
    this.element.classList.remove('flipped', 'matched', 'face-up', 'flipping', 'mismatch', 'matched-pulse');
    this.element.classList.add('face-down'); // Start in face-down state
    this.element.setAttribute('aria-label', `Card: ${this.name}`);
    this.element.setAttribute('tabindex', '0');
  }

  /**
   * Check if the card can be clicked/selected
   * @returns {boolean} True if card can be interacted with
   */
  canBeSelected() {
    return !this.isFlipped && !this.isMatched && !this.isAnimating;
  }

  /**
   * Bind click event handler to the card element
   * @param {Function} clickHandler - Function to call when card is clicked
   */
  bindClickHandler(clickHandler) {
    this.clickHandler = clickHandler;
    
    // Add click event listener - only works on face-down cards
    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.canBeSelected()) {
        this.clickHandler(this);
      }
    });

    // Add keyboard event listener for accessibility - only works on face-down cards
    this.element.addEventListener('keydown', (event) => {
      if ((event.key === 'Enter' || event.key === ' ') && this.canBeSelected()) {
        event.preventDefault();
        this.clickHandler(this);
      }
    });
  }

  /**
   * Update the card's visual state in the DOM
   * This method synchronizes the card's internal state with its DOM representation
   */
  updateDOMState() {
    // Update classes based on current state
    this.element.classList.toggle('face-up', this.isFlipped);
    this.element.classList.toggle('face-down', !this.isFlipped);
    this.element.classList.toggle('matched', this.isMatched);
    this.element.classList.toggle('flipping', this.isAnimating);
    
    // Update accessibility attributes
    if (this.isMatched) {
      this.element.setAttribute('aria-label', `Matched card: ${this.name}`);
      this.element.setAttribute('tabindex', '-1');
    } else if (this.isFlipped) {
      this.element.setAttribute('aria-label', `Card flipped: ${this.name}`);
    } else {
      this.element.setAttribute('aria-label', `Card: ${this.name}`);
      this.element.setAttribute('tabindex', '0');
    }
  }

  /**
   * Create and return a DOM element for this card
   * Static method to create card elements before Card instances are created
   * @param {string} cardId - Unique identifier for the card element
   * @returns {HTMLElement} The created card DOM element
   */
  static createCardElement(cardId) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.setAttribute('data-card-id', cardId);
    cardElement.setAttribute('role', 'button');
    cardElement.setAttribute('tabindex', '0');
    
    return cardElement;
  }

  /**
   * Bind card data to an existing DOM element
   * Alternative constructor approach for when DOM elements are pre-created
   * @param {HTMLElement} element - Existing DOM element to bind to
   * @param {Object} cardData - Card data from CARD_DATA
   * @returns {Card} New Card instance bound to the element
   */
  static bindToElement(element, cardData) {
    const cardId = element.getAttribute('data-card-id') || `card-${Date.now()}-${Math.random()}`;
    return new Card(cardId, cardData, element);
  }

  /**
   * Remove all event listeners from the card element
   * Used for cleanup when destroying card instances
   */
  unbindEvents() {
    if (this.element && this.clickHandler) {
      // Clone the element to remove all event listeners
      const newElement = this.element.cloneNode(true);
      this.element.parentNode.replaceChild(newElement, this.element);
      this.element = newElement;
    }
  }

  /**
   * Destroy the card instance and clean up resources
   */
  destroy() {
    this.unbindEvents();
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.element = null;
    this.clickHandler = null;
  }
}