import React from "react";
import WeightEntry from "./WeightEntry";
import { connect } from "react-redux";
import { createEntry } from "../actions/weightEntries";
import { Button, Form, Input, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import LineGraph from "./LineGraph";

class WeightEntriesContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      weight: "",
      date: "",
      addWeight: false,
      showMessage: false,
      error: "",
      userW: [],
      userD: [],
    };
  }

  componentDidMount() {
    let userW = this.props.weightEntries.map((entry) => {
      return parseInt(entry.weight);
    });
    let userD = this.props.weightEntries.map((entry) => {
      const year = entry.date.replace("-", "").replace("-", "").slice(0, 4);
      const month = entry.date.replace("-", "").replace("-", "").slice(4, 6);
      const day = entry.date.replace("-", "").replace("-", "").slice(6, 8);
      return `${month}/${day}/${year}`;
    });
    this.setState({
      userD: userD,
      userW: userW,
    });
  }

  renderNewDate = (entry) => {
    const year = entry.date.replace("-", "").replace("-", "").slice(0, 4);
    const month = entry.date.replace("-", "").replace("-", "").slice(4, 6);
    const day = entry.date.replace("-", "").replace("-", "").slice(6, 8);
    return `${month}/${day}/${year}`;
  };
  showMessage = () => {
    this.setState({
      showMessage: true,
    });
    setTimeout(() => {
      this.setState({ showMessage: false });
    }, 3000);
  };

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
          this.showMessage();
          this.setState({
            weight: "",
            date: "",
            error: "",
            userD: [...this.state.userD, this.renderNewDate(newEntry)],
            userW: [...this.state.userW, parseInt(newEntry.weight)],
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
    const myEntry = this.props.weightEntries.map((entry) => {
      return <WeightEntry entry={entry} key={entry.id} />;
    });
    return (
      <div style={{ marginTop: "12vh", width: "100%" }}>
        <p>My Weight Journey</p>
        <p>Total Weight Lost: {this.renderTotal()} lbs</p>
        <div
          style={{
            height: "100%",
            width: "100%",
            fontFamily: "sans-serif",
            display: "flex",
            marginTop: "5vh",
            bottom: 0,
          }}
        >
          <div style={{ flex: 1, margin: "10px" }}>
            {this.state.showMessage ? (
              <Message
                style={{ fontSize: "2vh" }}
                success
                header="Your Weight Submission Was Successful!"
              />
            ) : null}

            <table
              class="ui table"
              style={{
                marginBottom: "5vh",
                fontFamily: "sans-serif",
                fontWeight: "lighter",
                width: "60%",
                marginLeft: "10vh",
              }}
            >
              <thead>
                <tr>
                  <th style={{ fontWeight: "lighter", fontSize: "3vh" }}>
                    Date
                  </th>
                  <th style={{ fontWeight: "lighter", fontSize: "3vh" }}>
                    Weight
                  </th>
                </tr>
              </thead>
              {myEntry}
              <tr style={{ width: "100%", float: "right" }}>
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
                    <Form style={{ width: "250px" }}>
                      <Input
                        type="date"
                        name="date"
                        value={this.state.date}
                        onChange={this.handleChange}
                        style={{ display: "inline" }}
                      ></Input>
                      <Input
                        type="number"
                        name="weight"
                        value={this.state.weight}
                        onChange={this.handleChange}
                        placeholder="weight"
                        style={{ display: "inline" }}
                      ></Input>

                      <Button
                        type="button"
                        onClick={this.handleSubmit}
                        className="ui blue button"
                        style={{
                          float: "left",
                          marginTop: "1vh",
                          marginLeft: "4vh",
                        }}
                      >
                        Submit
                      </Button>
                      <Button
                        type="button"
                        onClick={this.toggleAddWeight}
                        className="ui button"
                        style={{
                          float: "right",
                          marginTop: "1vh",
                          marginRight: "4vh",
                        }}
                      >
                        Cancel
                      </Button>
                    </Form>
                  </td>
                )}
              </tr>
            </table>
          </div>
          <div style={{ flex: 1, margin: "10vh", padding: "5px" }}>
            <LineGraph userD={this.state.userD} userW={this.state.userW} />
          </div>
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
  createEntry: createEntry,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeightEntriesContainer);
