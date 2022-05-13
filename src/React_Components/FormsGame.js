import DragAndDrop from './DragAndDrop';
import Score from './Score';
import React, { Component } from 'react';


class FormsGame extends Component {
    render() {
        return (
            <div>
                <Score/>
                <DragAndDrop/>
            </div>
        );
    }
}

export default FormsGame;