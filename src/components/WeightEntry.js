import React from "react";
import { connect } from "react-redux";
import { deleteEntry } from "../actions/weightEntries";
import { Button } from "semantic-ui-react";

class WeightEntry extends React.Component {
  handleDelete = () => {
    const { id } = this.props.entry;
    fetch(`http://localhost:3000/weight_entries/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.props.deleteEntry(id);
      });
  };

  render() {
    const { weight, date, id } = this.props.entry;

    const year = date.toString().slice(0, 4);
    const month = date.toString().slice(5, 7);
    const day = date.toString().slice(8, 10);
    const updatedDate = `${month}/${day}/${year}`;
    return (
      <tbody>
        <tr>
          <td
            style={{ fontWeight: "lighter", fontSize: "2.5vh"}}
            data-label="date"
          >
            {updatedDate}
          </td>
          <td
            style={{ fontWeight: "lighter", fontSize: "2.5vh"}}
            data-label="Age"
          >
            {weight} lbs
            <Button
              icon="trash"
              style={{
                padding: "2px",
                float: "right",
                backgroundColor: "white",
              }}
              onClick={() => this.handleDelete(this.props.entry.id)}
            ></Button>
          </td>
        </tr>
      </tbody>
    );
  }
}

const mapDispatchToProps = {
  deleteEntry: deleteEntry,
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeightEntry);
