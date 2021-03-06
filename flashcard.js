// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText) {
    this.containerElement = containerElement;

    this.showHand = this.showHand.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);

    this.translateX = 0;
    this.translateY = 0;
    this.originX = null;
    this.originY = null;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.flashcardElement = this.DOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerup', this.showHand);
    this.DOM = this.DOM.bind(this);

    this.flashcardElement.addEventListener('pointerdown', this.onDragStart);
    this.flashcardElement.addEventListener('pointermove', this.onDragMove);
    this.flashcardElement.addEventListener('pointerup', this.onDragEnd);
  
    this.dragStarted = false;
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  DOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent = backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  showHand(event){
    this.flashcardElement.classList.toggle('show-word');
  }

  onDragStart(event){
    this.flashcardElement.style.cssText="transition-duration:0.0s"; 
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.dragStarted = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  onDragMove(event) {
    if (!this.dragStarted)
      return;
    
    event.preventDefault();
    this.translateX = event.clientX - this.originX;
    this.translateY = event.clientY - this.originY;
    const translateX = this.offsetX + this.translateX;
    const translateY = this.offsetY + this.translateY;
    event.currentTarget.style.transform = 'translate(' +
      translateX + 'px, ' + translateY + 'px) rotate(' + translateX * 0.2 + 'deg)';

    var color = document.querySelector('body');
    if(this.translateX > 150 || this.translateX < -150)
      color.style.backgroundColor = '#97b7b7';
    else
      color.style.backgroundColor = '#d0e6df';
  }
  onDragEnd(event) {
    this.dragStarted = false;
    this.offsetX += event.clientX - this.originX;
    this.offsetY += event.clientY - this.originY;

    if (this.translateX > 150) {
      document.dispatchEvent(new CustomEvent('right'));
    }
    if (this.translateX < -150) {
      document.dispatchEvent(new CustomEvent('left'));
    }
    else{
      this.flashcardElement.style.cssText="transition-duration:0.6s"
      this.translateX = 0;
      this.translateY = 0;
    this.originX = null;
    this.originY = null;
    this.offsetX = 0;
    this.offsetY = 0;
;
    }

    var color = document.querySelector('body');
    color.style.backgroundColor = '#d0e6df';
  }
  


}
