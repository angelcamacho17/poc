import React, { Component } from 'react';
import { blankOptionCorrect, blankOptionIncorrect, blankOptionNone } from '../Redux/actions/blankOptionsActions';
import { connect } from 'react-redux';

class DragAndDropBlankSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {},
            textBoxes: [
                {
                    name: 'text',
                    text: '',
                    answer: ""
                },
                {
                    name: 'text1',
                    text: 'Lorem ipsum dolor sit amet, consectetur *_text1_* elit, sed do eiusmod tempor *_text2_* incididunt ut labore et dolore magna aliqua. Ut *_text3_* enim ad minim veniam, quis nostrud exercitation ullamco',
                    answers: {
                        text1: 'option_3',
                        text2: 'option_4',
                        text3: 'option_1',
                    },
                },
            ],
        }

        this.onDragStart =  this.onDragStart.bind(this);
        this.onDragOver =  this.onDragOver.bind(this);
        this.onDrop =  this.onDrop.bind(this);
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
        const options = this.props.blankOptions.filter(ques => ques.name === form)
        const ans = options.length > 0 ? options[0].answer: 'none';
        if (ans === 'none') return 'option';
        if (ans === 'correct') return 'option correct no-margin'
        if (ans === 'incorrect') return 'option incorrect no-margin';
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
        this.props.blankOptions.forEach((option)=>{
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
        this.state.textBoxes.forEach((paragrah, index)=>{
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
            <div className="questions-container">
                <section>
                    {/* MAIN WRAPPER OF OPTIONS*/}
                    <div className="answers-wrapper" onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, 'text', 'none')}}>
                        {this.state.options.text}
                    </div>
                    <div className="boxes-wrapper" >
                        {boxes}
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
    onCheckCorrect: blankOptionCorrect,
    onCheckIncorrect: blankOptionIncorrect,
    onClear: blankOptionNone
}

export default connect(mapStateToProps, mapActionsToProps)(DragAndDropBlankSpace);