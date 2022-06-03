import React, { Component } from 'react';
import { authorOptionCorrect, authorOptionIncorrect, authorSetCorrectAnswer, authorOptionNone, authorAddOption, authorAddQuestion } from '../Redux/actions/authorOptionsActions';
import { connect } from 'react-redux';
import { Form } from "react-bootstrap";

class DragAndDropAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
            options : [],
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
            campaign: 'standard',
            checked: 1
        };
        this.campaign_types = [
            {id: 1, campaign_type: 'normal'},
            {id: 2, campaign_type: 'standard'},
            {id: 3, campaign_type: 'automated'},
        ];

        this.onDragStart =  this.onDragStart.bind(this);
        this.onDragOver =  this.onDragOver.bind(this);
        this.onDrop =  this.onDrop.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.isCorrect = this.isCorrect.bind(this);
        this.setCorrectAnswer = this.setCorrectAnswer.bind(this);
    }

    handleChangeCompanyType = (event, index) => {
        console.log(this.campaign_types[index].campaign_type, 'campaign_type');
        let value = this.campaign_types[index].campaign_type;
        this.setState({campaign: value, checked: index})
    };

    setCorrectAnswer = (option, name) => {
        this.props.addCorrectAnswer({option, name})
        // $event.stopImmediatePropagation();
    }

    isCorrect = (name) => {
        if (this.props.authorOptions.textBoxes.length>1){
            return this.props.authorOptions.textBoxes[1].answer === name;
        } else {
            return false;
        }
    }
 
    addQuestion = () => {
        this.props.onCreateQuestion({ text: this.state.question})
        this.setState({
            answer: ''
        })
    }

    addAnswer = (err) => {
        err.preventDefault();
        this.props.onAdd({ category:"text", answer: 'none', text: this.state.answer})
        this.setState({
            answer: ''
        })
    }

    onDragStart = (ev, name) => {
        ev.dataTransfer.setData("name", name);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    checkIfBoxIsEmpty = (cat) => {
        if (this.state.options[cat] && this.state.options[cat].length > 0) {
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
                console.log('option ', option)
                console.log('option.category ', option.category)
                console.log('this.state.options ', this.state.options)
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
                                const cat = 'text1'
                                return <span key={cat}
                                        className="blank-space"
                                        onDragOver={(e)=>this.onDragOver(e)}
                                        onDrop={(e)=>{this.onDrop(e, cat, paragrah.answer)}}>
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
                <div className="creation-section">
                    <form className="author-form">
                        <div className="form-header">
                            Enter question
                        </div>
                        <textarea
                            type="text"
                            value={this.state.question}
                            name="question"
                            placeholder="Lorem ipsum dolor sit amet, consectetur *____* elit,"
                            onChange={this.onChangeHandler}
                            maxLength="255"
                            rows="4"
                        ></textarea>
                    </form>
                    
                    <div className="author-options">
                        <form onSubmit={this.addAnswer} className="author-options-form">
                            <input
                                className="option-input"
                                type="text"
                                name="answer"
                                value={this.state.answer}
                                placeholder="Option 1"
                                onChange={this.onChangeHandler}
                            />
                            <button type="submit" className="button accent">
                                Add option
                            </button>
                        </form>
                        {this.props.authorOptions.answers.length>0 && <div className="option-wrapper">
                            {this.props.authorOptions.answers.map((answer, index) => (
                                <div key={index + answer.name} className="radio-wrapper">
                                    <input
                                        className="radio"
                                        type="radio"
                                        value={answer.name}
                                        checked={this.isCorrect(answer.name)}
                                        onChange={(e)=>{}}
                                        onClick={(e)=>this.setCorrectAnswer(answer.name, 'text1')}
                                    />
                                    <label className="radio-label">
                                        {answer.text}
                                    </label>
                                </div>
                            ))}
                        </div>}
                    </div>
                    <button onClick={this.addQuestion} className="button">
                        Create quiz
                    </button>
                </div>
                <div className="preview-section">
                    <div className="question-preview">
                        <div className="form-header">
                            Question
                        </div>
                        <div className="boxes-wrapper" >
                            {boxes}
                        </div>
                    </div>
                    <div className="answers-wrapper" onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, 'text', 'none')}}>
                        {this.state.options.text}
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
    onCheckCorrect: authorOptionCorrect,
    onCheckIncorrect: authorOptionIncorrect,
    onClear: authorOptionNone,
    onAdd: authorAddOption,
    onCreateQuestion: authorAddQuestion,
    addCorrectAnswer: authorSetCorrectAnswer
}

export default connect(mapStateToProps, mapActionsToProps)(DragAndDropAuthor);