import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { addReminder, deleteReminder, clearReminders } from '../actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: ''
        };
        this.addReminder = this.addReminder.bind(this);
        this.clearReminders = this.clearReminders.bind(this);
        this.renderReminders = this.renderReminders.bind(this);
    };

    addReminder() {
        const { text, dueDate } = this.state;
        this.props.addReminder(text, dueDate);
    }

    deleteReminder(id) {
        this.props.deleteReminder(id);
    }

    clearReminders() {
        this.props.clearReminders();
    }

    renderReminders() {
        const { reminders } = this.props;
        return(
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return(
                            <li key={reminder.id} className="list-group-item">
                                <div className="list-item">
                                    <div>{reminder.text}</div>
                                    <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                                </div>
                                <div onClick={() => this.deleteReminder(reminder.id)}
                                    className="list-item delete-button">
                                    &#x2715;
                                </div>
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
                        <input className="form-control"
                            type="datetime-local"
                            onChange={event => this.setState({ dueDate: event.target.value})}
                        />
                    </div>
                    <button 
                        className="btn btn-success" 
                        type="button"
                        onClick={this.addReminder}>
                        Add
                    </button>
                </div>
                { this.renderReminders() }
                <div className="btn btn-danger"
                    onClick={this.clearReminders}>
                    Clear Reminders
                </div>
                   </div>
        ); 
    }
}

const mapStateToProps = (state) => {
    return {
        reminders: state
    }
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);