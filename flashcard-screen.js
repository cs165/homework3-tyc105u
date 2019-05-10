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
    this.name = 0;
    this.number = 0;
    this.x = 1;
    this.y = 0;

    this.Front = new Array();
    this.End = new Array();
    this.nextFront = new Array();
    this.nextEnd = new Array();
  }

  toRight(){
    this.yes++;
    var correctOrNot = document.querySelectorAll('.correct');
    correctOrNot[0].textContent = this.yes;
    correctOrNot[1].textContent = this.yes;

    var boxes = document.querySelector('#flashcard-container');
    var box = document.querySelector('.flashcard-box');
    if(box != null)
      boxes.removeChild(box);

    let container = document.querySelector('#flashcard-container');
    let front = this.Front[this.x];
    let end = this.End[this.x];
    this.play = new Flashcard(container, front, end);
    this.x = this.x + 1;

    var count = this.Front.length + 1;
    if(count == this.x){
      if (box != null)
        box = document.querySelector('.flashcard-box');
      boxes.removeChild(box);

      var button = document.querySelector('.continue');
      var percent = document.querySelector('.percent');
      var test = this.yes * (100) / (this.yes + this.no);
      test = Math.round(test * 10) / 10;
      percent.textContent = test;

      if (test < 100)
        button.textContent = 'Continue';
      else
        button.textContent = 'Start over?';

      var detailedResult = new CustomEvent('result_open', { 'detail': test });
      document.dispatchEvent(detailedResult);
    }
  }

  toLeft(){
    this.no++;
    var correctOrNot = document.querySelectorAll('.incorrect');  
    correctOrNot[0].textContent = this.no;
    correctOrNot[1].textContent = this.no;

    this.nextEnd[this.number] = this.End[this.x - 1]
    this.nextFront[this.number] = this.Front[this.x - 1]; 
    this.number++;

    var boxes = document.querySelector('#flashcard-container');
    var box = document.querySelector('.flashcard-box');
    if(box != null)
      boxes.removeChild(box);

    let container = document.querySelector('#flashcard-container');
    let front = this.Front[this.x];
    let end = this.End[this.x];
    this.play = new Flashcard(container, front, end);
    this.x = this.x + 1;
    
    var count = this.Front.length + 1;
    if(count == this.x){
      if(box != null)
        box = document.querySelector('.flashcard-box');
      boxes.removeChild(box);

      var button = document.querySelector('.continue');
      var percent = document.querySelector('.percent');
      var test = this.yes * (100) / (this.yes + this.no);
      test = Math.round(test * 10) / 10;
      percent.textContent = test;
      if(test < 100)
        button.textContent = 'Continue';

      var detailedResult = new CustomEvent('result_open', { 'detail': test });
      document.dispatchEvent(detailedResult);
    }
  }

  show(x) {
    this.containerElement.classList.remove('inactive');

    this.name = x;
    if(x == 100){
      this.no = 0; 

      this.Front = new Array();
      this.End = new Array();
      for (let i in this.nextBack) {
        this.Front[i] = this.nextFront[i];
        this.End[i] = this.nextEnd[i];
      }
      var container = this.flashcardContainer;
      var front = this.Front[0];
      var end = this.End[0];
      this.play = new Flashcard(container, front, end);
      this.number = 0;
      this.x = 1; 
     
      var correctOrNot = document.querySelectorAll('.incorrect');
      correctOrNot[0].textContent = this.no;
      correctOrNot[1].textContent = this.no;
    }
    else{  
      for(let i in FLASHCARD_DECKS)
        if(x == FLASHCARD_DECKS[i].title)
          for(let j in FLASHCARD_DECKS[i].words){
            this.Front[this.y] = j;
            this.End[this.y++] = FLASHCARD_DECKS[i].words[j];
          }
        
      var container = document.querySelector('#flashcard-container');
      var front = this.Front[0];
      var end = this.End[0];
      this.play = new Flashcard(container, front, end);
    }
    this.nextEnd = [];
    this.nextFront = [];
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
