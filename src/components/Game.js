import React, { Component } from 'react'
import Stars from './Stars'
import Button from './Button'
import Numbers from './Numbers'
import DoneFrame from './DoneFrame'
import Answer from './Answer'

  const possibleCombinationSum = (arr, n) => {
    if (arr.indexOf(n) >= 0) { return true }  // number of stars exists in array
    if (arr[0] > n) { return false }
    if (arr[arr.length - 1] > n) {
      arr.pop()
      return possibleCombinationSum(arr, n)
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount; i++) {
      var combinationSum = 0
      for (var j = 0; j < listSize; j++) {
        if (i & (1 << j)) { combinationSum += arr[j] }
      }
      if (n === combinationSum) { return true }
    }
    return false
  }
  
  class Game extends Component {
    static randomNumber = () => 1 + Math.floor(Math.random() * 9)
    static initialState = () => ({
      selectedNumbers: [],
      usedNumbers: [],
      randomNumOfStars: Game.randomNumber(),
      answerIsCorrect: null,
      redraws: 5,
      doneStatus: null,
    })
    constructor(props) {
      super(props)
      this.state = Game.initialState()
    }
  
    resetGame = () => this.setState(Game.initialState())
    selectNumber = (clickedNumber) => {
      if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return }
      this.setState(prevState => ({
        answerIsCorrect: null,
        selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
      }))
    }
  
    deselectNumber = (clickedNumber) => {
      this.setState(prevState => ({
        answerIsCorrect: null,
        selectedNumbers: prevState.selectedNumbers
          .filter(number => number !== clickedNumber)
      }))
    }
  
    acceptAnswer = () => {
      this.setState(prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
        randomNumOfStars: Game.randomNumber(),
      }), this.updateDoneStatus)
    }
  
    checkAnswer = () => {
      //is the answer correct? 
      console.log('checking answer...')
      this.setState(prevState => ({
        answerIsCorrect: prevState.randomNumOfStars ===
          prevState.selectedNumbers.reduce((total, num) => total + num, 0)
      }))
    }
  
    redraw = () => {
      if (this.state.redraws === 0) { return }
      this.setState(prevState => ({
        randomNumOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        selectedNumbers: [],
        redraws: --prevState.redraws,
      }), this.updateDoneStatus)
    }
  
    updateDoneStatus = () => {
      this.setState(prevState => {
        if (prevState.usedNumbers.length === 9) {
          return { doneStatus: 'Done. Nice!' }
        }
        if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
          const leftOverNumbers = [...Array(9).keys()].map(i =>
            (i + 1)).filter(number =>
              prevState.usedNumbers.indexOf(number) === -1)
          let score = leftOverNumbers.reduce((a, b) => a + b, 0)
  
          return { doneStatus: `Game Over!! With a score of ${score}` }
        }
      })
    }
  
    possibleSolutions = ({ randomNumOfStars, usedNumbers }) => {
      //numbers not found in used numbers array
      const possibleNumbers = [...Array(9).keys()].map(i =>
        (i + 1)).filter(number =>
          usedNumbers.indexOf(number) === -1)
  
      return possibleCombinationSum(possibleNumbers, randomNumOfStars)
    }
    render() {
      console.log(this.state.randomNumOfStars)
      const {
        selectedNumbers,
        randomNumOfStars,
        usedNumbers,
        redraws,
        doneStatus
      } = this.state
      return (
        <div className="container">
          <hr />
          <div className="row">
            <Stars numOfStars={randomNumOfStars} />
            <Button selectedNumbers={selectedNumbers}
              redraws={redraws}
              checkAnswer={this.checkAnswer}
              answerIsCorrect={this.state.answerIsCorrect}
              acceptAnswer={this.acceptAnswer}
              redraw={this.redraw} />
            <Answer selectedNumbers={selectedNumbers}
              deselectNumber={this.deselectNumber} />
          </div>
          <br />
          {doneStatus ?
            <DoneFrame doneStatus={doneStatus}
              resetGame={this.resetGame} /> :
            <Numbers
              selectedNumbers={selectedNumbers}
              selectNumber={this.selectNumber}
              usedNumbers={usedNumbers} />
          }
        </div>
      )
    }
  }

  export default Game