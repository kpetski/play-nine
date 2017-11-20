import React from 'react'

const Answer = (props) => {
    return (
      <div className="col-xs-5">
        {props.selectedNumbers.map((number, i) =>
          <span key={i} onClick={() => props.deselectNumber(number)}>
            {number}
          </span>
        )}
      </div>
    )
  }

export default Answer