import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
class Signup extends Component {
  renderInput({ label, type, ...field }) {
    return (
      <fieldset className="form-group">
        <label>{label}:</label>
        <input {...field.input} type={type} className="form-control" />
      </fieldset>
    );
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form>
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
          label="confirmPassword"
        />
        <button className="btn btn-primary" action="submit">
          Signup
        </button>
      </form>
    );
  }
}
Signup = reduxForm({ form: 'signin' })(Signup);
export default connect(null, actions)(Signup);
