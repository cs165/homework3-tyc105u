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
    //所有網頁有用到css的#menu的元素
    this.menu = new MenuScreen(menuElement);
    //this.menu:MenuScreen object 

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    this.openCard = this.openCard.bind(this);
    this.Restart=this.Restart.bind(this);
    this.result = this.result.bind(this);
    this.openMenu = this.openMenu.bind(this);
    document.addEventListener('menu_open', this.openMenu);
    document.addEventListener('start_over', this.Restart);
    document.addEventListener('result_open', this.result);
    document.addEventListener('present-opened', this.openCard);

    this.menu.show();
    this.score = 0;
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

  Restart(event){
    if(this.score != 100){
      this.flashcards.show(100);
      this.results.hide();
    }
    else
      history.go(0);    
  }

  result(event) {
    this.flashcards.hide();
    this.results.show();
    this.menu.hide();
    this.score = event.detail;
  }

  openCard(event) {
    this.menu.hide();
    this.flashcards.show(event.detail);
  }
}
