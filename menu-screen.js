// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;

    var choice = containerElement.querySelector('#choices');
    for(let i in FLASHCARD_DECKS){
      let d = document.createElement("div");
      d.innerHTML = FLASHCARD_DECKS[i].title;
      choice.appendChild(d);
    }

    var c_div = document.querySelectorAll('#choices div');
    
    for(let i in FLASHCARD_DECKS)
      div[i].addEventListener('click', this._openPresent);
  }
  openCard(event) {
    var A = new CustomEvent('present-opened', {'detail': this.textContent });
    document.dispatchEvent(A);
   }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
