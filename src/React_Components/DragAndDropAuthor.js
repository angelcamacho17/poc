import React, { Component } from 'react';
import { authorOptionCorrect, authorOptionIncorrect, authorOptionNone, authorAddOption, authorAddQuestion } from '../Redux/actions/authorOptionsActions';
import { connect } from 'react-redux';

class DragAndDropAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
            options : []
            // textBoxes: [
            //     // {
            //     //     name: 'text',
            //     //     text: '',
            //     //     answer: ""
            //     // },
            //     // {
            //     //     name: 'text1',
            //     //     text: 'Lorem ipsum dolor sit amet, consectetur *_text1_* elit, sed do eiusmod tempor *_text2_* incididunt ut labore et dolore magna aliqua. Ut *_text3_* enim ad minim veniam, quis nostrud exercitation ullamco',
            //     //     answers: 'option_1',
            //     // },
            // ],
        }

        this.onDragStart =  this.onDragStart.bind(this);
        this.onDragOver =  this.onDragOver.bind(this);
        this.onDrop =  this.onDrop.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.createQuiz = this.createQuiz.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
    }

    addQuestion = () => {
        this.props.onCreateQuestion({ text: this.state.question})
        this.setState({
            answer: ''
        })
    }

    addAnswer = () => {
        this.props.onAdd({ category:"text", answer: 'none', text: this.state.answer})
        this.setState({
            answer: ''
        })
    }

    createQuiz = () => {

    }

    onDragStart = (ev, name) => {
        ev.dataTransfer.setData("name", name);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    checkIfBoxIsEmpty = (cat) => {
        if (this.state.options[cat].length > 0) {
            this.props.onClear(this.state.options[cat][0].key, cat)
        }
    }

    // EMIT ACTIONS
    onDrop = (ev, cat, answer) => {
        this.checkIfBoxIsEmpty(cat)
        let name = ev.dataTransfer.getData("name");
        if (ev.dataTransfer.getData("name") === answer) {
            this.props.onCheckCorrect(name, cat)
        } else if(answer==='none') {
            this.props.onClear(name, cat)
        } else {
            this.props.onCheckIncorrect(name, cat)
        }
    }

    getClass = (form) => {
        const options = this.props.authorOptions.answers.filter(ques => ques.name === form)
        const ans = options.length > 0 ? options[0].answer: 'none';
        if (ans === 'none') return 'option';
        if (ans === 'correct') return 'option correct no-margin'
        if (ans === 'incorrect') return 'option incorrect no-margin';
    }

    onChangeHandler(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    render() {
        let boxes = []

        this.state.options =  {
            text: [],
            text1: [],
            text2: [],
            text3: [],
        }

        // OPTIONS TO PLACE INSIDE THE BOXES, MARKED AS DRAGGABLE
        this.props.authorOptions.answers.forEach((option)=>{
            if (option) {
                this.state.options[option.category].push(
                    <div key={option.name} 
                        onDragStart = {(e) => this.onDragStart(e, option.name)}
                        draggable
                        className={this.getClass(option.name) + " " + option.name}
                    >
                        {option.text}
                    </div>
                );
            }
        })

        // BUILDING OF BOXES WITH THE OPTONS OBJECTS UPDATED
        this.props.authorOptions.textBoxes.forEach((paragrah, index)=>{
            console.log('HERE ', paragrah)
            if (paragrah.text.length > 0) {
                let i = 0;
                let paragrahParts = paragrah.text.split('*');
                boxes.push(
                    <div key={paragrah.name +'up'+ index}>
                        { paragrahParts.map((part, index) => {
                            if (part[0] !== '_') {
                                return <span key={paragrah.name + index}>
                                    {part}
                                </span>
                            } else {
                                const cat = part.replace(/_/g, "")
                                return <span key={cat}
                                        className="blank-space"
                                        onDragOver={(e)=>this.onDragOver(e)}
                                        onDrop={(e)=>{this.onDrop(e, cat, paragrah.answers[cat])}}>
                                          {this.state.options[cat]}
                                </span>
                            }
                        })}
                    </div>
                )
            }
        })

        return (
            <div className="author-container">
                {/* MAIN WRAPPER OF OPTIONS*/} 
                <form className="author-form">
                    <div className="form-header">
                        Enter question
                    </div>
                    <input
                        type="text"
                        name="question"
                        placeholder="Lorem ipsum dolor sit amet, consectetur _____ elit,"
                        onChange={this.onChangeHandler}
                    />
                </form>
                <form className="author-options">
                    <input
                        type="text"
                        name="answer"
                        value={this.state.answer}
                        placeholder="Option 1"
                        onChange={this.onChangeHandler}
                    />
                </form>
                <button onClick={this.addAnswer}>
                    Add option
                </button>
                <button onClick={this.addQuestion}>
                    Create quiz
                </button>
            
                <div className="answers-wrapper" onDragOver={(e)=>this.onDragOver(e)}
                        onDrop={(e)=>{this.onDrop(e, 'text', 'none')}}>
                    {this.state.options.text}
                </div>
                <div className="boxes-wrapper" >
                    {boxes}
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
    onCheckCorrect: authorOptionCorrect,
    onCheckIncorrect: authorOptionIncorrect,
    onClear: authorOptionNone,
    onAdd: authorAddOption,
    onCreateQuestion: authorAddQuestion
}

export default connect(mapStateToProps, mapActionsToProps)(DragAndDropAuthor);