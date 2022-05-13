// React Imports
import React, { Component } from 'react';
import DragAndDropText from './DragAndDropText';
import {
  Route,
  Switch, BrowserRouter, Link
} from 'react-router-dom';
import { store } from '../Redux/store';
import FormsGame from './FormsGame';
import TextGame from './TextGame';

// CSS Import (this style is used when testing React Components on Node.js instead of the Browser)
const canUseDOM = !!(
  (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
);
if (canUseDOM) {
  require('./App.css');
}

class App extends Component {
  constructor(){
    super()
    this.state = {
      questions: store.getState().questions
    } 
    console.log(this.state);
  }
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <button>
              <Link to="/">Forms game</Link>
            </button>
            <button>
              <Link to="test">Questions selection</Link>
            </button>
          </nav>
        </header>
        <main>
            <Switch>
              <Route exact path="/" component={FormsGame} />
              <Route exact path="/test" component={TextGame} />
            </Switch>
        </main>
      </div>
    );
  }
}

export default App;