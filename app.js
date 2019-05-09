// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);
    this.menu.show();

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    this.openMenu = this.openMenu.bind(this);
    this.start_Over = this.start_Over.bind(this);
    this.result = this.result.bind(this);
    this.openCard = this.openCard.bind(this);

    document.addEventListener('open-menu', this.openMenu);
    document.addEventListener('start-over', this.start_Over);
    document.addEventListener('result', this.result);
    document.addEventListener('open-card', this.openCard);

    this.score = 0;
    this.click = undefined;
    //顯示flash card跟result兩種畫面
    // Uncomment this pair of lines to see the "flashcard" screen:
    //this.menu.hide();
    //this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    //this.menu.hide();
    //this.results.show();
  }

  openMenu(event) {
    history.go(0);  //refresh
  }

  start_Over(event){
    if(this.score != 100){
      this.flashcards.show("redo");
      this.results.hide();
    }
    else history.go(0);
  }

  result(event) {
    this.flashcards.hide();
    this.results.show();
    this.menu.hide();
    this.score = event.detail;
  }

  openCard(event) {
    this.menu.hide();
    this.click = event.detail;
    this.flashcards.show(this.click);
  }
}
