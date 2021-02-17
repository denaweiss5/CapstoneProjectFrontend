import React from "react";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { Form, Input, Button } from "semantic-ui-react";
import { editUser } from "../actions/users";

class AccountInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.currentUser.name,
      email: props.currentUser.email,
      password: "",
      error: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.currentUser;
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        password: this.state.password,
      }),
    };
    fetch(`http://localhost:3000/users/${id}`, reqObj)
      .then((resp) => resp.json())
      .then((updatedUser) => {
        if (updatedUser.error) {
          this.setState({
            error: updatedUser.error,
          });
        } else {
          this.props.editUser(updatedUser);
          this.props.history.push("/home");
        }
      });
  };
  render() {
    return (
      <div className="land">
        {this.state.error ? (
          <h4 style={{ color: "red" }}>{this.state.error}</h4>
        ) : null}
        <Form className="acctform" widths="equal" style={{ textAlign: "left" }}>
          <h1>Account Info</h1>
          <br></br>
          <Form.Field>
            <label>Name</label>
            <Input
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <Input
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password confirmation</label>
            <Input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button
            type="submit"
            content="Save changes"
            onClick={this.handleSubmit}
          />
          <Button
            type="cancel"
            content="Cancel"
            onClick={() => this.props.history.push("/home")}
          />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = {
  editUser: editUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
