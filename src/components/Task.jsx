import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import moment from 'moment';
import { deleteReminder } from '../actions';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overDue: false
        };
    }

    componentDidMount() {
        if (moment(new Date(this.props.reminder.dueDate)).isBefore()) this.setState({ overDue: true });
    }

    render() {
        const { reminder } = this.props;
        const classes = classNames(
            'list-group-item',
            this.state.overDue ? 'overDue' : ''
        );
        return(
            <li className={classes}>
                <div className="list-item">
                    <div>{reminder.text}</div>
                    <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div onClick={() => this.props.deleteReminder(reminder.id)}
                    className="list-item delete-button">
                    &#x2715;
                </div>
            </li>
        );
    }
}

Task.propTypes = {
    reminder: PropTypes.shape({
        text: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    })
}

const mapStateToProps = (state) => {
    return {
        reminders: state
    }
}

export default connect(mapStateToProps, { deleteReminder })(Task);