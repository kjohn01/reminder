import React, { Component } from 'react';
import '../App.css';

class App extends Component {
    render() {
        return(
            <div className="App">
                <div className="title">Reminder</div>
                <div className="form-inline">
                    <div className="form-group">
                        <input className="form-control" placeholder="I have to ..."/>
                    </div>
                    <button className="btn btn-success" type="button">
                        Add
                    </button>
                </div>
            </div>
        ); 
    }
}

export default App;