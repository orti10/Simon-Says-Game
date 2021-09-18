import React, { Component } from 'react';

class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      start: false,
      instructions: [],
      steps: [],
      level: 0,
      highscore: 0,
      strict: false,
      activeButton: "",
      instructionsMode: false,
      failed: false
    };

    // Array of objects (elements),
    // Allows quick access between a letter and its sound
    this.options = [
      {id: "r",sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")},
      {id: "g",sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3")},
      {id: "b",sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3")},
      {id: "y",sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")}
    ];

    this.errorSound = new Audio("http://www.freesound.org/data/previews/331/331912_3248244-lq.mp3");

    // Creates a new function when called,
    // This keyword set to the provided value
    this.startGame = this.startGame.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.displayIntructions = this.displayIntructions.bind(this);
    this.hitButton = this.hitButton.bind(this);
    this.checkStep = this.checkStep.bind(this);
    this.checkWin = this.checkWin.bind(this);
  }

  // Is invoked immediately after updating occurs,
  // Making sure to avoid infinite loop
  componentDidUpdate(prevProps, prevState, snapshot){
    if (this.state.level === Number.MAX_SAFE_INTEGER){
      alert("WOW! YOU WON!");
      this.setState({
        start: false,
        instructions: [],
        steps: [],
        level: 0,
        strict: false,
        activeButton: "",
        instructionsMode: false,
        failed: false
      });
    }
  }
   
  // Calculate the random value for the color selection
  startRamdonGame(){
    return this.options[Math.floor(Math.random() * (this.options.length-1))]
  }

  // Search for the specific sound by ID value
  getOption(id){
    return this.options.find((element) => element.id === id)
  }

  checkWin(){
    if (this.state.instructions.length === this.state.steps.length){
      this.setState({ instructionsMode: true}, () =>
        setTimeout(this.nextLevel, 1500)
      );
    }
  }
  
  // Monitors the step and checks if the user has taken the right step,
  // Returns True or False
  isStepCorect(step){
    return (step.id === this.state.instructions[this.state.steps.length].id)
  }
  
  // Keep track of the steps and whether there is a win,
  // Play sounds and performs updates accordingly
  checkStep(step){ 
    if(this.isStepCorect(step)){
      step.sound.play();
      this.setState(
        (prevState, props) => ({
          steps: [...prevState.steps, step]
        }),
        this.checkWin
      );

      // The user choose WRONG step and the game is ON strict mode,
      // The level of the current game will be reset and a new game will start automatically
    } else if(this.state.strict){
      let randomOption = this.startRamdonGame();
      this.setState(
        {
          start: true,
          instructions: [randomOption],
          steps: [],
          level: 1,
          strict: true,
          activeButton: "",
          instructionsMode: true,
          failed: true
        },
         () => setTimeout(this.displayIntructions, 500)
      );

      // The user choose WRONG step and the game is in NOT on strict mode,
      // The game will play the current step again
    } else{
      this.setState(
        {
          instructionsMode: true,
          steps: [],
          failed: true
        },
        () => setTimeout(this.displayIntructions, 500)
      );
    }
  }

  // Check for two types of button hits, the user's or Simon's.
  // Rturns Promise object that is resolved,
  // It allows to associate handlers with an asynchronous action's eventual,
  // success value or failure reason.
  hitButton(button, user){
    if(user && !this.state.instructionsMode && this.state.start){
      this.checkStep(button);
    } else if(!user) {
      button.sound.play();
      return new Promise((resolve) => {
        this.setState(
          {
            activeButton: button
          },
          () =>
            setTimeout(
              () =>
                this.setState({ activeButton: "" }, () =>
                  setTimeout(() => resolve("resolved"), 1000)
                ),
              500
            )
            
        );
      });
    }
  }

  // Void-returning async methods: To make asynchronous event handlers possible
  async displayIntructions(){
    this.setState({ instructionsMode: true, failed: false });
    for(let o of this.state.instructions){
      await this.hitButton(o, false);
    }
    this.setState({ instructionsMode: false });
  }

  // Level up in the game, add one more step & random sound
  nextLevel(){
    let randomOption = this.startRamdonGame();
    this.setState(
      (prevState) => ({
        instructions: [...prevState.instructions, randomOption],
        level: prevState.level + 1,
        steps: [],
        failed: false
      }),
      this.displayIntructions
    );
  }

  // Update the state for starting or stopping the game
  startGame(){
    if(this.state.start){
      this.setState({
        failed: false,
        start: false,
        instructions: [],
        steps: [],
        level: 0,
      });
    } else{
      this.setState(
        {
          start: true
        },
        this.nextLevel
      );
    }   
  }

  render(){
    let start = this.state.start ? " active" : "";
    let strict = this.state.strict ? " active" : "";
    let pushable =
      !this.state.instructionsMode && this.state.start ? " pushable" : "";

    // Maintaining the highest score so far
    if(this.state.level>this.state.highscore){
      this.setState({
        highscore: this.state.level
      }); 
    }

    let display;

    // If there is wrong step, the error sound will play and the word "NO!" will popup
    if(this.state.failed){
      display = "NO!";
      this.errorSound.play();

      // When it is Simon's turn, "?" will popup
    } else if(this.state.instructionsMode){
      display = "?";
    } else{
      display = this.state.level
    }
    
    return(
      <div> 
        <div className="simon">
          <div
            onClick={() => this.hitButton(this.getOption("g"), true)}
            className={"green" + pushable}
            style={{
              filter: this.state.activeButton.id === "g" ? "brightness(1.3)" : ""
              // I am aware of the 'this.state.activeButton.id' problem (all 4 times of it down here)
            }}
          />
          <div
            onClick={() => this.hitButton(this.getOption("r"), true)}
            className={"red" + pushable}
            style={{
              filter: this.state.activeButton.id === "r" ? "brightness(1.3)" : ""
            }}
          />
          <div className="controller">
            <div className="controller-title"><div>SIMON</div></div>
            <div className="highscore"><div>Highscore:</div>
              <div className="highscore-display">{this.state.highscore}</div>
            </div>
            <div className="level"><div>Level:</div>
              <div className="level-display">{display}</div>
            </div>
            <div className="start">
              <div>
                <div>Off/On</div>
                <input
                  id="start-button"
                  onClick={this.startGame}
                  type="button"
                  value="Start"
                />
                <label
                  className={"toggle-button" + start}
                  htmlFor="start-button"
                />
              </div>
            </div>
            <div className="strict">
              <div>
                <div>Strict</div>
                <input
                  id="strict-button"
                  onClick={() =>
                    this.setState((prevState, props) => ({
                      strict: !prevState.strict
                    }))
                  }
                  type="button"
                  value="Strict"
                />
                <label
                  className={"toggle-button" + strict}
                  htmlFor="strict-button"
                />
              </div>
            </div>
          </div>
          <div
            onClick={() => this.hitButton(this.getOption("b"), true)}
            className={"blue" + pushable}
            style={{
              filter: this.state.activeButton.id === "b" ? "brightness(1.3)" : ""
            }}
          />
          <div
            onClick={() => this.hitButton(this.getOption("y"), true)}
            className={"yellow" + pushable}
            style={{
              filter: this.state.activeButton.id === "y" ? "brightness(1.3)" : ""
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;