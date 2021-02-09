import React from "react";
import WeightEntry from "./WeightEntry";
import { connect } from "react-redux";
import { createEntry } from "../actions/weightEntries";
import { Button, Form, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { currentUser } from "../actions/auth";

class WeightEntriesContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      weight: "",
      date: "",
      addWeight: true,
      error: "",
    };
  }



  toggleAddWeight = () => {
    this.setState({
      addWeight: !this.state.addWeight,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedDate = this.state.date.replace("-", "").replace("-", "");
    const updatedWeight = parseFloat(this.state.weight);
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        weight: updatedWeight,
        date: updatedDate,
        user_id: this.props.currentUser.id,
      }),
    };
    fetch("http://localhost:3000/weight_entries", reqObj)
      .then((resp) => resp.json())
      .then((newEntry) => {
        if (newEntry.error) {
          this.setState({
            error: newEntry.error,
          });
        } else {
          this.toggleAddWeight();
          this.props.createEntry(newEntry);
          this.props.history.push("/myWeightJourney");
          this.setState({
            weight: "",
            date: "",
            error: "",
          });
        }
      });
  };

  renderTotal = () => {
    let total;
    let weights = this.props.weightEntries.map((entry) => {
      return entry.weight;
    });
    if (weights.length > 0) {
      const a = weights[0];
      const b = weights[weights.length - 1];

      return (total = (a - b).toFixed(1));
    } else {
      return (total = 0);
    }
  };

  render() {
    return (
      <div>
        <h1
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
            marginLeft: "20%",
          }}
        >
          My Weight Journey
        </h1>
        <div>
          <table
            className="ui table"
            style={{
              maxWidth: "600px",
              marginLeft: "10%",
            }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Weight</th>
              </tr>
            </thead>
          </table>
          <div
            style={{
              bottom: "0",
              maxHeight: "300px",
              width: "600px",
              overflowY: "scroll",
              padding: "none",
              marginLeft: "10%",
            }}
          >
            {this.props.weightEntries.map((entry) => {
              return <WeightEntry entry={entry} key={entry.id} />;
            })}
          </div>
          <table
            className="ui table"
            style={{
              maxWidth: "600px",
              marginLeft: "10%",
            }}
          >
            <thead>
              <tr style={{ paddingLeft: "100px" }}>
                {this.state.addWeight ? (
                  <Button
                    onClick={() => this.toggleAddWeight()}
                    className="ui button"
                    style={{ margin: "20px", textAlign: "center" }}
                  >
                    Add weight
                  </Button>
                ) : (
                  <td>
                    <Form>
                      <Input
                        type="date"
                        name="date"
                        value={this.state.date}
                        onChange={this.handleChange}
                      ></Input>
                      <Input
                        type="number"
                        name="weight"
                        value={this.state.weight}
                        onChange={this.handleChange}
                        placeholder="weight"
                        style={{ display: "inline", width: "100px" }}
                      ></Input>
                      <Button
                        type="button"
                        onClick={this.handleSubmit}
                        className="ui blue button"
                        style={{ float: "left", display: "flex" }}
                      >
                        Submit
                      </Button>
                      <Button
                        type="button"
                        onClick={this.toggleAddWeight}
                        className="ui button"
                        style={{ float: "right", display: "flex" }}
                      >
                        Cancel
                      </Button>
                    </Form>
                  </td>
                )}
              </tr>
              <tr>
                <th>Total weight lost</th>

                <th
                  style={{
                    paddingRight: "200px",
                  }}
                  id="total-weight"
                >
                  {this.renderTotal()} lbs
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weightEntries: state.weightEntries,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = {
  createEntry: createEntry
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeightEntriesContainer);
