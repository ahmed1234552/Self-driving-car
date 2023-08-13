class Controls {
  constructor(type) {
    this.forward = false;
    this.reverse = false;
    this.right = false;
    this.left = false;
    switch (type) {
      case "KEYS":
        this.#addKeyboardListeners();
        break;
      case "DUMMY":
        this.forward = true;
        break;
    }
  }
  //#= private cant be access from outside class
  #addKeyboardListeners() {
    document.onkeydown = (event) => { //using =>arrow function to keep this in scope this refers to the object not the function
      switch (event.key) {            //=function(event){code} this in code refers to the function
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
      }
      // console.table(this);
    };
    document.onkeyup = (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
      }
      // console.table(this);
    };
  }
}
