import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder } from '../actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.addReminder = this.addReminder.bind(this);
        this.renderReminders = this.renderReminders.bind(this);
    };

    addReminder() {
        this.props.addReminder(this.state.text);
    }

    renderReminders() {
        const { reminders } = this.props;
        return(
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return(
                            <li key={reminder.id} className="list-group-item">
                                <div>{reminder.text}</div>
                            </li>
                        );
                    })
                }
            </ul>
        );
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
                { this.renderReminders() }
            </div>
        ); 
    }
}

const mapStateToProps = (state) => {
    return {
        reminders: state
    }
}

export default connect(mapStateToProps, { addReminder })(App);