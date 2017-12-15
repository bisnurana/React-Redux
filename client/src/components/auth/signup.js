import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
class Signup extends Component {
  renderInput({ label, type, input, meta: { touched, error } }) {
    return (
      <fieldset className="form-group">
        <label>{label}:</label>
        <input {...input} type={type} className="form-control" />
        {touched && error && <div className="text-warning">{error}</div>}
      </fieldset>
    );
  }
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps, () => {
      this.props.history.push('/feature');
    });
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-warning">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          type="text"
          name="email"
          component={this.renderInput}
          label="Email"
        />
        <Field
          type="password"
          name="password"
          component={this.renderInput}
          label="Password"
        />
        <Field
          name="confirmpassword"
          type="password"
          component={this.renderInput}
          label="Confirm password"
        />
        {this.renderAlert()}
        <button className="btn btn-primary" action="submit">
          Signup
        </button>
      </form>
    );
  }
}
function validateForm(formProps) {
  const errors = {};
  //not working
  /* Object.keys(formProps).forEach(field => {
    if (!formProps[field]) {
      errors[field] = `${field} is required`;
    }
  }); */
  if (!formProps.email) {
    errors.email = 'Email is required';
  }
  if (!formProps.password) {
    errors.password = 'Enter your password';
  }
  if (!formProps.confirmpassword) {
    errors.confirmpassword = 'Retype your password';
  }

  if (formProps.password !== formProps.confirmpassword) {
    errors.confirmpassword = 'Password must match';
  }
  return errors;
}
function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}
Signup = reduxForm({ form: 'signin', validate: validateForm })(Signup);
export default connect(mapStateToProps, actions)(Signup);
