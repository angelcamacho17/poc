import DragAndDropText from './DragAndDropText';
import Score from './Score';
import React, { Component } from 'react';
import DragAndDropBlankSpace from './DragAndDropBlankSpace';


class TextGame extends Component {
    render() {
        return (
            <div >
                <DragAndDropText/>
                {/* <DragAndDropBlankSpace/> */}
            </div>
        );
    }
}

export default TextGame;