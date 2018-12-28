import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Task from './Task';
import { addReminder, clearReminders } from '../actions';
import { isNonEmptyString, isValidDate } from '../utilities';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: '',
            textInputError: false,
            dateInputError: false
        };
        this.addReminder = this.addReminder.bind(this);
        this.clearReminders = this.clearReminders.bind(this);
        this.renderReminders = this.renderReminders.bind(this);
    };

    addReminder() {
        const { text, dueDate } = this.state;
        const textInputError = !isNonEmptyString(text);
        const dateInputError = !isValidDate(dueDate);
        if ( !textInputError && !dateInputError ) {
            this.props.addReminder(text, dueDate);
            this.setState({ 
                text: '', 
                dueDate: '', 
                textInputError, 
                dateInputError 
            })
        }
        else this.setState({ textInputError, dateInputError });
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
                            <Task reminder={reminder} key={reminder.id} />
                        );
                    })
                }
            </ul>
        );
    }

    render() {
        const { text, dueDate, textInputError, dateInputError } = this.state;
        const textInputClasses = classNames(
            'form-control', textInputError && 'error'
        );
        const dateInputClasses = classNames(
            'form-control', dateInputError && 'error'
        );
        return(
            <div className="App">
                <div className="title">Reminder</div>
                <div className="form-inline">
                    <div className="form-group">
                        <input 
                            className={textInputClasses} 
                            placeholder="I have to ..."
                            value={text}
                            onChange={event => this.setState({ text: event.target.value})}
                            onKeyPress={event => {
                                if (event.key === 'Enter') this.addReminder();
                            }}
                        />
                        {
                            textInputError && <h5 className="text-danger">What do you have to do?</h5>
                        }
                        <input className={dateInputClasses}
                            type="datetime-local"
                            value={dueDate}
                            onChange={event => this.setState({ dueDate: event.target.value})}
                            onKeyPress={event => {
                                if (event.key === 'Enter') this.addReminder();
                            }}
                        />
                        {
                            dateInputError && <h5 className="text-danger">Plz select a valid due date</h5>
                        }
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

export default connect(mapStateToProps, { addReminder, clearReminders })(App);