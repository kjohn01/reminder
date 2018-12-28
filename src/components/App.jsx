import React, { Component } from 'react';
// import PropTypes from 'prop-types';
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
        if (!isNonEmptyString(text)) return this.setState({ textInputError: true });
        if (!isValidDate(dueDate)) return this.setState({ dateInputError: true });
        this.props.addReminder(text, dueDate);
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
        const { textInputError, dateInputError } = this.state;
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
                            onChange={event => this.setState({ text: event.target.value})}
                        />
                        {
                            textInputError && <h5 className="red-text">What do you have to do?</h5>
                        }
                        <input className={dateInputClasses}
                            type="datetime-local"
                            onChange={event => this.setState({ dueDate: event.target.value})}
                        />
                        {
                            dateInputError && <h5 className="red-text">Plz select a valid due date</h5>
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