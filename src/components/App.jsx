import React, { Component } from 'react';
import '../App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.addReminder = this.addReminder.bind(this);
    };

    addReminder() {
        console.log('this.state', this.state);
    }

    render() {
        return(
            <div className="App">
                <div className="title">Reminder</div>
                <div className="form-inline">
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            placeholder="I have to ..."
                            onChange={event => this.setState({ text: event.target.value})}
                        />
                    </div>
                    <button 
                        className="btn btn-success" 
                        type="button"
                        onClick={() => this.addReminder()}
                    >
                        Add
                    </button>
                </div>
            </div>
        ); 
    }
}

export default App;