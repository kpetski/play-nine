import React, { Component } from 'react';

class Instructions extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>A random number of stars display between 1-9</li>
                    <li>You can then select one or more numbers that sum up to the value of stars</li>
                    <li>If there are no availible options, you can redraw the number of stars</li>
                    <ul><li>This can be done 5 times </li></ul>
                    <li>Once number(s) are selected, click equal to verify its valid then the check to accept using these numbers</li>
                    <li><strong>Goal:</strong> use all your numbers before using all your redraws.  Win with a score of 0, the lower the score the better!!</li>
                </ul>
            </div>
        )
    }
}

export default Instructions

