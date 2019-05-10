// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.m = containerElement.querySelector('.to-menu');
    this.cont = containerElement.querySelector('.continue');

    this.m.addEventListener('click',this.dispMenu);
    this.cont.addEventListener('click',this.dispCont);
  }

  dispMenu(event){
    var menu_open = new CustomEvent('menu_open');
    document.dispatchEvent(menu_open);
  }
  dispCont(event){
    var start_over = new CustomEvent('start_over');
    document.dispatchEvent(start_over);
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
