// React Imports
import React, { Component } from 'react';

// Redux Imports
import { connect } from 'react-redux';

class Score extends Component {
    getCount(questions, criteria) {
        let acum = 0;
        questions.map((qu)=>{
            if(qu.answer === criteria) acum++;
        })
        return acum;
    }

    render() {
        return (
            <div>
                <h1>
                    Correct: {this.getCount(this.props.checkResponse, 'correct')}
                </h1>
                <h1>
                    Incorrect: {this.getCount(this.props.checkResponse, 'incorrect')}
                </h1>
            </div>
        )
    }
}

// state is the state from Redux Store
// props is the props from the parent component (which is App.js in this case)
const mapStateToProps = (state, props) => {
    return state
};

export default connect(mapStateToProps)(Score);