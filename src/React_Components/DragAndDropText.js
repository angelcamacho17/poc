import React, { Component } from 'react';
import { optionCorrect, optionIncorrect, optionNone, reset } from '../Redux/actions/textOptionActions';
import { connect } from 'react-redux';

class DragAndDropText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options:  { },
            textBoxes: [
                {
                    name: 'none',
                    info: '',
                    answer: ""
                },
                {
                    name: 'box1',
                    info: 'Soil Moistrue',
                    answer: "option_1",
                    letter: "a",
                },
                {
                    name: 'box2',
                    info: 'Soil Temperature',
                    answer: "option_3",
                    letter: "b",
                },
                {
                    name: 'box3',
                    info:  'Number of Soil Animals',
                    answer: "option_2",
                    letter: "c",
                },
            ],
            check: false
        }

        this.onDragStart =  this.onDragStart.bind(this);
        this.onDragOver =  this.onDragOver.bind(this);
        this.onDrop =  this.onDrop.bind(this);
        this.checkAnswers = this.checkAnswers.bind(this);
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

    // Calculate the answered questions.
    answeredQuestions = () => {
        let i = 0;

        this.props.textOptions.map((option) => {
            if (option.answer !== 'none') {
                i++;
            }
        })

        return i;
    } 

    // Calculate correct answers.
    correctAnswers = () => {
        let i = 0;

        this.props.textOptions.map((option) => {
            if (option.answer === 'correct') {
                i++;
            }
        })

        return i;
    }

    // Handle on drop event for droppable elements.
    onDrop = (ev, cat, answer) => {
        this.checkIfBoxIsEmpty(cat)

        // If the test is not completely answered,
        // disabled check button.
        if (this.testAnswered()) {
            this.setState({
                check: false
            })
        }

        let name = ev.dataTransfer.getData("name");
        if (ev.dataTransfer.getData("name") === answer) {
            this.props.onCheckCorrect(name, cat);
        } else if(answer==='none') {
            this.props.onClear(name, cat)

        } else {
            this.props.onCheckIncorrect(name, cat)
        }
    }

    getClass = (form) => {
        const options = this.props.textOptions.filter(ques => ques.name === form)
        const ans = options.length > 0 ? options[0].answer: 'none';
        if (ans === 'none') return 'option';
        if (this.state.check) {
            if (ans === 'correct') return 'option correct no-margin'
            if (ans === 'incorrect') return 'option incorrect no-margin';
        } else {
            return 'option no-margin'
        }
    }

    checkAnswers = () => {
        this.setState({
            check: !this.state.check
        })
    }

    tryAgain = () => {
        this.setState({
            check: false
        })
        this.props.onReset();
    }

    testAnswered = () => {
        return (this.answeredQuestions() === this.props.textOptions.length);
    }

    shouldTryAgain = () => {
        return this.testAnswered() && this.state.check && (this.correctAnswers()!==this.props.textOptions.length);
    }

    render() {
        let boxes = []

        this.state.options =  {
            box: [],
            box1: [],
            box2: [],
            box3: [],
        }

        // OPTIONS TO PLACE INSIDE THE BOXES, MARKED AS DRAGGABLE
        this.props.textOptions.forEach((option)=>{
            this.state.options[option.category].push(
                <div key={option.name} 
                    onDragStart = {(e) => this.onDragStart(e, option.name)}
                    draggable
                    className={this.getClass(option.name) + " " + option.name}
                >
                    {option.text}
                </div>
            );
        })

        // BUILDING OF BOXES WITH THE OPTONS OBJECTS UPDATED
        this.state.textBoxes.forEach((box)=>{
            if (box.info) {
                boxes.push(
                    <div key={box.name + '-answer'} className="box" >
                        <div>
                            {box.letter + '. ' + box.info}
                        </div>
                        <div key={box.name}
                            className="answer"
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, box.name, box.answer)}}
                            >
                                {this.state.options[box.name]}
                        </div>          
                    </div>
                )
            }
        })

        return (
            <div>
                <header className="questions-nav">
                    <h2 className="no-margin">
                        Ava Niyuyen 
                    </h2>
                    <div className="score">
                        <img src={require('./../assets/star.png')}/>
                        <span>
                            {!this.testAnswered() ? this.correctAnswers(): 0}
                        </span>
                    </div>
                </header>
                <div className="navigation-buttons">
                    <img className="arrow rotated" src={require('./../assets/arrow.png')}/>
                    <img className="arrow" src={require('./../assets/arrow.png')}/>
                </div>
                <section className="questions-container">
                    {/* MAIN WRAPPER OF OPTIONS*/}
                    <div className="answers-wrapper" onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, 'box', 'none')}}>
                        <h4 className="header-container-box">
                            Drag and Drop the right answer
                        </h4>
                        {this.state.options.box}
                    </div>
                    <div className="boxes-wrapper" >
                        <div className="question">
                            In general, what effect will soil litter have on.
                        </div>
                        <div className="boxes">
                            {boxes}
                        </div>

                        <div className="buttons">
                            <button onClick={this.checkAnswers} 
                            disabled={!this.testAnswered()}
                            className={this.testAnswered() ? 'check button': 'check button disabled'}>
                                Check
                            </button>

                            { this.shouldTryAgain()?
                                <button onClick={this.tryAgain} 
                                    className="try-again button">
                                        Try Again
                                </button>: <span></span>
                            }
                        </div>

                    </div>
                </section>
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
    onCheckCorrect: optionCorrect,
    onCheckIncorrect: optionIncorrect,
    onClear: optionNone,
    onReset: reset,
}

export default connect(mapStateToProps, mapActionsToProps)(DragAndDropText);