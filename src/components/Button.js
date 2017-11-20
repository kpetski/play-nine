import React  from 'react'
const Button = (props) => {
    let button
    switch (props.answerIsCorrect) {
      case true:
        //yay we have the right answer
        button =
          <button className="btn btn-success btn-lg"
            disabled={props.selectedNumbers.length === 0}
            onClick={props.acceptAnswer}>
            <i className="fa fa-check" />
          </button>
        break
      case false:
        //uh oh, we better practice our addition
        button =
          <button className="btn btn-danger btn-lg"
            disabled={props.selectedNumbers.length === 0}>
            <i className="fa fa-times" />
          </button>
        break
      default:
        //normal initial state
        button =
          <button className="btn btn-default btn-lg"
            disabled={props.selectedNumbers.length === 0}
            onClick={props.checkAnswer}>
            =
        </button>
        break
    }
    return (
      <div className="col-xs-2 text-center">
        {button}
        <br /><br />
        <button className="btn btn-warning btn-sm"
          onClick={props.redraw}
          disabled={props.redraws === 0}>
          <i className="fa fa-refresh" /> {props.redraws}
        </button>
      </div>
    )
  }
  export default Button