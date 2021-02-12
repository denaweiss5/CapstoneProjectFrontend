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
      addWeight: false,
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
const myEntry = this.props.weightEntries.map((entry) => {
          return <WeightEntry entry={entry} key={entry.id} />;
        })
    return (
<div style={{fontFamily: 'sans-serif', position: 'sticky', marginTop: '15vh'}}>
  <p style={{fontSize: '3vh', fontWeight: 'lighter'}}>My Weight Journey</p>
  <p>
  Total Weight Lost: {this.renderTotal()} lbs
  </p>
   
 
      <table class="ui celled table" style={{marginBottom:'5vh', fontFamily: 'sans-serif', fontWeight: 'lighter', width: '600px'}}>
  <thead>
  <tr>
    <th style={{fontWeight: 'lighter', fontSize: '3vh'}}>Date</th>
    <th style={{fontWeight: 'lighter', fontSize: '3vh'}}>Weight</th>
  </tr>
  </thead>
{myEntry}
<tr >
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
                    <Form style={{width: '250px'}}>
                      <Input
                        type="date"
                        name="date"
                        value={this.state.date}
                        onChange={this.handleChange}
                        style={{ display: 'inline'}}
                      ></Input>
                      <Input
                        type="number"
                        name="weight"
                        value={this.state.weight}
                        onChange={this.handleChange}
                        placeholder="weight"
                        style={{ display: 'inline'}}
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

</table>
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
