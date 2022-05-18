import React, { Component } from 'react';
import DragAndDropAuthor from './DragAndDropAuthor';


class AuthorGame extends Component {
    render() {
        return (
            <div >
                <div className="text-game">
                    <DragAndDropAuthor/>
                </div>
            </div>
        );
    }
}

export default AuthorGame;