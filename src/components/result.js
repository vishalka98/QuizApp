import React from 'react';

const result = ({score,playAgain}) => (
    <div className="score-board">
        <div className="score">your score {score}/5 correct answer</div>
         <button className="playBtn" onClick={playAgain}>play again</button>
    </div>
);

export default result;