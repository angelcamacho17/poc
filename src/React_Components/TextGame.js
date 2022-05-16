import DragAndDropText from './DragAndDropText';
import Score from './Score';
import React, { Component } from 'react';
import DragAndDropBlankSpace from './DragAndDropBlankSpace';


class TextGame extends Component {
    render() {
        return (
            <div >
                <div className="text-game">
                    <img src={require('./../assets/photosintesis.jpg')} />
                    <DragAndDropText/>
                </div>
                <DragAndDropBlankSpace/>
            </div>
        );
    }
}

export default TextGame;