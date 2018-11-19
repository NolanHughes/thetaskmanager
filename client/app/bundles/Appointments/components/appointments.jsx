import React, { PropTypes } from 'react';

import AppointmentForm from './AppointmentForm';
import { AppointmentsList } from './AppointmentsList';

export default class Appointments extends React.Component {
  constructor (props, railsContext) {
    super(props)
    this.state = {
      appointments: this.props.appointments
    }
  }

  static propTypes = {
    appointments: PropTypes.array.isRequired
  }

  static defaultProps = {
    appointments: []
  }

  componentDidMount() {
    if(this.props.match) {
      $.ajax({
        type: "GET",
        url: `/appointments`,
        dataType: "JSON"
      }).done((data) => {
        this.setState({
          appointments: data
        })
      })
    }
  }

  addNewAppointment = (appointment) => {
    const sortedAppointments = [...this.state.appointments, appointment].sort(function(a,b){
        return new Date(a.appt_time) - new Date(b.appt_time);
      })

    this.setState({
      appointments: sortedAppointments
    });
  }

  render () {
    return (
      <div>
        <AppointmentForm handleNewAppointment={this.addNewAppointment}/>
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}