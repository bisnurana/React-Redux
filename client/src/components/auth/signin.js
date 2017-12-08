import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
class Signin extends Component {
  handleSubmit({ email, password }) {
    this.props.signinUser({ email, password }, () => {
      this.props.history.push('/feature');
    });
  }
  renderInput({ label, ...field }) {
    return (
      <fieldset className="form-group">
        <label>{label}:</label>
        <input {...field.input} type="text" className="form-control" />
      </fieldset>
    );
  }
  renderAlert() {
    if (this.props.errMsg) {
      console.log('hello');
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
        <Field name="email" component={this.renderInput} label="Email" />
        <Field name="password" component={this.renderInput} label="Password" />
        {this.renderAlert()}
        <button className="btn btn-primary" action="submit">
          Signin
        </button>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return { errMsg: state.auth.err };
}
export default reduxForm({ form: 'signin' })(
  connect(mapStateToProps, actions)(Signin)
);
