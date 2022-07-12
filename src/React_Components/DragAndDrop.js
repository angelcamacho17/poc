import React, { Component } from 'react';
import { checkCorrect, checkInCorrect, loadQuestions, checkNone } from '../Redux/actions/checkResponse';
import { connect } from 'react-redux';

class DragAndDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkResponse: null
        }

        this.onDragStart =  this.onDragStart.bind(this);
        this.onDragOver =  this.onDragOver.bind(this);
        this.onDrop =  this.onDrop.bind(this);
    }

    onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       if (ev.dataTransfer.getData("id") === cat) {
           this.props.onCheckCorrect(id, cat)
       } else if (cat === 'wip') {
         this.props.onClear(id, cat)
       } else {
         this.props.onCheckIncorrect(id, cat)
       }
    }

    getClass = (form) => {
        const ans = this.props.checkResponse.filter(ques => ques.name === form)[0].answer;
        if (ans === 'none') return 'draggable';
        if (ans === 'correct') return 'draggable correct'
        if (ans === 'incorrect') return 'draggable incorrect';
    }

    render() {
        
        let questions = {
            wip: [],
            square: [],
            circle: [],
            rectangle: [],
        }
        this.props.checkResponse.forEach ((t) => {
            questions[t.category].push(
                <div key={t.name} 
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className={this.getClass(t.name) + " " + t.name}
                >
                </div>
            );
        });

        return (
            <div>
                <div className="container-drag">
                    <div className="wip"
                        onDragOver={(e)=>this.onDragOver(e)}
                        onDrop={(e)=>{this.onDrop(e, "wip")}}>
                        {questions.wip}
                    </div>
                    <div className="droppable"
                        onDragOver={(e)=>this.onDragOver(e)}
                        onDrop={(e)=>this.onDrop(e, "square")}>
                        <span >SQUARE</span>
                        {questions.square}
                    </div>
                    <div className="droppable"
                        onDragOver={(e)=>this.onDragOver(e)}
                        onDrop={(e)=>this.onDrop(e, "circle")}>
                        <span >CIRCLE</span>
                        {questions.circle}
                    </div>
                    <div className="droppable"
                        onDragOver={(e)=>this.onDragOver(e)}
                        onDrop={(e)=>this.onDrop(e, "rectangle")}>
                        <span >RECTANGLE</span>
                        {questions.rectangle}
                    </div>
                </div>
            </div>
        )
    }
}

// state is the state from Redux Store
// props is the props from the parent component (which is App.js in this case)
const mapStateToProps = (state, props) =>{
   return state
} 


// onSubmitValue is used to avoid naming conflicts with submitValue
const mapActionsToProps = {
    onCheckCorrect: checkCorrect,
    onCheckIncorrect: checkInCorrect,
    onClear: checkNone,
    onLoad: loadQuestions
}

export default connect(mapStateToProps, mapActionsToProps)(DragAndDrop);