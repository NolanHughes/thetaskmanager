import React from 'react';
import AppointmentForm from './appointment_form';
import { AppointmentsList } from './appointments_list';

export default class Appointments extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      appointments: this.props.appointments,
      title: '',
      appt_time: ''
    }
  }

  handleUserInput (obj) {
    this.setState(obj);
  }

  handleFormSubmit () {
    const appointment = {title: this.state.title, appt_time: this.state.appt_time};
    $.post('/appointments',
            {appointment: appointment})
          .done((data) => {
            this.addNewAppointment(data);
          });
  }

  addNewAppointment(appointment) {
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
        <AppointmentForm input_title={this.state.title}
                         input_appt_time={this.state.appt_time}
                         onUserInput={(obj) => this.handleUserInput(obj)}
                         onFormSubmit={() => this.handleFormSubmit()} 
        />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}
