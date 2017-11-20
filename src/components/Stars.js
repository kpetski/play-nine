import React from 'react'

const Stars = (props) => {
    let stars = []
    for (let i = 0; i < props.numOfStars; i++) {
      stars.push(<i className="fa fa-star" key={i}></i>)
    }
    return (
      <div className="col-xs-5">
        {stars}
      </div>
    )
  }
  export default Stars