// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;

    this.toRight = this.toRight.bind(this);
    this.toLeft = this.toLeft.bind(this);

    document.addEventListener('left', this.toLeft);
    document.addEventListener('right', this.toRight);
    this.play = null;
    this.yes = 0;
    this.no = 0;
    this.Front = new Array();
    this.x = 1;
    this.y = 0;
    this.Back = new Array();
    this.s1 = 'Start over?';
    this.s2 = 'Continue';
    this.empty = undefined;
    this.nextBack = new Array();
    this.nextFront = new Array();
    this.number = 0;
    this.index = 1;
  }

  show(name) {
    this.containerElement.classList.remove('inactive');
    this.empty = name;
    if(name != 'redo'){
      for(let i in FLASHCARD_DECKS){
        if (name == FLASHCARD_DECKS[i].title)
          for (let j in FLASHCARD_DECKS[i].words) {
            this.Front[this.y] = j;
            this.y = this.y + 1;
            this.Back[this.y] = FLASHCARD_DECKS[i].words[j];
          }
      }
      let container = this.flashcardContainer;
      let front = this.Front[0];
      let back = this.Back[0];
      this.play = new Flashcard(container, front, back);
    }
    else{    
      this.word = [];   
      this.def = [];
      
      var incrt = document.querySelectorAll('.incorrect');
      this.no = 0;
      incrt.innerHTML = '' + this.no + ' ';
      for(let i in this.nextBack){
        this.Front[i] = this.nextFront[i];
        this.Back[i] = this.nextBack[i];
      }
      let container = this.flashcardContainer;
      let front = this.Front[0];
      let back = this.Back[0];
      this.play = new Flashcard(this.flashcardContainer, this.word[0], this.def[0]);
      this.number = 0;
      this.index = 1; 
    }
    this.nextFront = [];
    this.nextBack = [];
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
  toRight() {
    this.yes++;
    var crt = document.querySelectorAll('.correct');
    crt.innerHTML = '' + this.yes + ' ';

    var boxes = document.querySelector('#flashcard-container');
    var box = document.querySelector('.flashcard-box');
    if (box != null)
      boxes.removeChild(box);

    let container = this.flashcardContainer;
    let front = this.Front[this.x];
    let back = this.Back[this.x];
    this.play = new Flashcard(container, front, back);
    this.x = this.x + 1;

    if (box != null)
      box = document.querySelector('.flashcard-box');
    boxes.removeChild(box);

    var button = document.querySelector('.continue');
    var percent = document.querySelector('.percent');
    var test = this.yes / (this.yes + this.no);
    test = Math.round(test * 1000) / 10;

    percent.textContent = test;
    if (test < 100)
      button.textContent = this.s2;
    else
      button.textContent = this.s1;

    var detailedResult = new CustomEvent('result', { 'detail': test });

    document.dispatchEvent(detailedResult);
  }

  toLeft() {
    this.nextBack[this.number] = this.Back[this.index - 1]
    this.nextFront[this.number] = this.Front[this.index - 1]; 
    this.number++;

    this.no++;
    var incrt = document.querySelectorAll('.incorrect');
    incrt.innerHTML = '' + this.no + ' ';

    var boxes = document.querySelector('#flashcard-container');
    var box = document.querySelector('.flashcard-box');
    if (box != null)
      boxes.removeChild(box);

    let container = this.flashcardContainer;
    let front = this.Front[this.x];
    let back = this.Back[this.x];
    this.play = new Flashcard(container, front, back);
    this.x = this.x + 1;

    if (box != null)
      box = document.querySelector('.flashcard-box');
    boxes.removeChild(box);

    var button = document.querySelector('.continue');
    var percent = document.querySelector('.percent');
    var test = this.yes / (this.yes + this.no);
    test = Math.round(test * 1000) / 10;

    percent.textContent = test;
    if (test < 100)
      button.textContent = this.s2;

    var detailedResult = new CustomEvent('result', { 'detail': test });

    document.dispatchEvent(detailedResult);
  }
}

