import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class HomePage extends React.Component {
  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.history.push("/");
    }
  }

  render() {
    const style = {
      margin: "30px",
      minHeight: "100px",
      minWidth: "200px",
      fontSize: "20px",
    };
    return (
      <div>
        <Grid verticalAlign="middle" columns={4} centered>
          <Grid.Row>
            <Grid.Column>
              <Link to="/myWeightJourney">
                <Button className="homebtns" color="white" style={style}>
                  My Weight Journey
                </Button>
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link to="/myDiaries">
                <Button className="homebtns" color="white" style={style}>
                  My Diary
                </Button>
              </Link>
              <br />
              <Link to="/myHabits">
                <Button className="homebtns" color="white" style={style}>
                  My Habits
                </Button>
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link to="/recipes">
                <Button className="homebtns" color="white" style={style}>
                  Recipes
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};
export default connect(mapStateToProps)(HomePage);
