import React, { Component } from 'react';
import { optionCorrect, optionIncorrect, optionNone } from '../Redux/actions/textOptionActions';
import { connect } from 'react-redux';

class DragAndDropText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options:  {
                box: [],
                box1: [],
                box2: [],
                box3: [],
                box4: [],
            },
            textBoxes: [
                {
                    name: 'none',
                    info: [],
                    answer: ""
                },
                {
                    name: 'box1',
                    info: [
                        'Lorem',
                        'Lorem',
                        'Text 1',
                    ],
                    answer: "option_1"
                },
                {
                    name: 'box2',
                    info: [
                        'Lorem',
                        'Lorem',
                        ' Text 3',
                    ],
                    answer: "option_3"
                },
                {
                    name: 'box3',
                    info: [
                        'Lorem',
                        'Lorem',
                        'Text 4',
                    ],
                    answer: "option_4"
                },
                {
                    name: 'box4',
                    info: [
                        'Lorem',
                        'Lorem',
                        'Text 2',
                    ],
                    answer: "option_2"
                }
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
        const options = this.props.textOptions.filter(ques => ques.name === form)
        const ans = options.length > 0 ? options[0].answer: 'none';
        if (ans === 'none') return 'option';
        if (ans === 'correct') return 'option correct no-margin'
        if (ans === 'incorrect') return 'option incorrect no-margin';
    }

    render() {
        let boxes = []

        // let options = {
        //     box: [],
        //     box1: [],
        //     box2: [],
        //     box3: [],
        // }

        this.state.options =  {
            box: [],
            box1: [],
            box2: [],
            box3: [],
            box4: [],
        }

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

        this.state.textBoxes.forEach((box)=>{
            if (box.info.length > 0) {
                boxes.push(
                    <div key={box.name + '-answer'} className="box" >
                        <div key={box.name}
                            className="answer"
                            onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, box.name, box.answer)}}
                            >
                                {this.state.options[box.name]}
                        </div>          
                        <ul>
                            {box.info.map((line, index)=>{
                                return <li key={index}>{line}</li>
                            })}
                        </ul>
                    </div>
                )
            }
        })

        return (
            <div className="questions-container">
                <h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </h4>
                <section>
                    <div className="answers-wrapper" onDragOver={(e)=>this.onDragOver(e)}
                            onDrop={(e)=>{this.onDrop(e, 'box', 'none')}}>
                        {this.state.options.box}
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
    onCheckCorrect: optionCorrect,
    onCheckIncorrect: optionIncorrect,
    onClear: optionNone
}

export default connect(mapStateToProps, mapActionsToProps)(DragAndDropText);