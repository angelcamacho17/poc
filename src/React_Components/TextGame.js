import DragAndDropText from './DragAndDropText';
import Score from './Score';
import React, { Component } from 'react';


class TextGame extends Component {
    render() {
        return (
            <div className="text-game">
                <img src={require('./../assets/photosintesis.jpg')} />
                <DragAndDropText/>
            </div>
        );
    }
}

export default TextGame;