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

    this.cont = containerElement.querySelector('.continue');
    this.menu = containerElement.querySelector('.to-menu');

    this.cont.addEventListener('click',this.Restart);
    this.menu.addEventListener('click',this.toMenu);
  }
  Restart(event){
    var A = new CustomEvent('start-over');
    document.dispatchEvent(A);
  }
  toMenu(event){
    var B = new CustomEvent('menu-open');
    document.dispatchEvent(B);
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

}
