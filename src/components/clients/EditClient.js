import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.inputFirstName = React.createRef();
    this.inputLastName = React.createRef();
    this.inputEmail = React.createRef();
    this.inputPhone = React.createRef();
    this.inputBalance = React.createRef();
  }
  onSubmit = e => {
    e.preventDefault();
    const updatedClient = {
      firstName: this.inputFirstName.current.value,
      lastName: this.inputLastName.current.value,
      email: this.inputEmail.current.value,
      phone: this.inputPhone.current.value,
      balance: this.inputBalance.current.value
    };
    const { client, firestore, history } = this.props;

    if (updatedClient.balance === "") {
      updatedClient.balance = 0;
    }
    console.log(updatedClient);
    firestore
      .update({ collection: "clients", doc: client.id }, updatedClient)
      .then(() => history.push(`/client/${client.id}`));
  };

  render() {
    const { client } = this.props;

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
          </div>
          <div className=" card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName"> First Name</label>
                <input
                  type="text"
                  name="firstName"
                  minLength="3"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  ref={this.inputFirstName}
                  defaultValue={client.firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName"> Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  minLength="3"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  ref={this.inputLastName}
                  defaultValue={client.lastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email"> Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  required
                  ref={this.inputEmail}
                  onChange={this.onChange}
                  defaultValue={client.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone"> Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  ref={this.inputPhone}
                  onChange={this.onChange}
                  defaultValue={client.phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance"> Balance</label>
                <input
                  type="text"
                  name="balance"
                  className="form-control"
                  onChange={this.onChange}
                  ref={this.inputBalance}
                  defaultValue={client.balance}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};
export default compose(
  connect((state, props) => ({
    client: state.firestore.ordered.client && state.firestore.ordered.client[0],
    auth: state.firebase.auth
  })),
  firestoreConnect(props => [
    {
      collection: "clients",
      storeAs: "client",
      doc: props.match.params.id
    }
  ])
)(EditClient);
