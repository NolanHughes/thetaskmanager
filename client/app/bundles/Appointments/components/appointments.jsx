import React from 'react';

import AppointmentForm from './appointment_form';
import { AppointmentsList } from './appointments_list';
import { FormErrors } from './FormErrors'

export default class Appointments extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      appointments: this.props.appointments,
      title: '',
      appt_time: '',
      formErrors: {}
    }
  }

  handleUserInput (obj) {
    this.setState(obj);
  }

  resetFormErrors () {
    this.setState({formErrors: {}})
  }

  resetFormTitle() {
    this.setState({title: ''})
  }

  handleFormSubmit () {
    const appointment = {title: this.state.title, appt_time: this.state.appt_time};
    $.post('/appointments', {appointment: appointment})
    .done((data) => {
      this.addNewAppointment(data);
      this.resetFormErrors();
      this.resetFormTitle();
    })
    .fail((response) => {
      console.log(response);
      this.setState({formErrors: response.responseJSON})
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
        <FormErrors formErrors={this.state.formErrors}/>
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
