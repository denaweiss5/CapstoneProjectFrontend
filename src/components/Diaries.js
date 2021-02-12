import React from "react";
import { connect } from "react-redux";
import ExerciseEntriesContainer from "./ExerciseEntriesContainer";
import {
  Divider,
  Header,
  Segment,
  Form,
  Input,

} from "semantic-ui-react";

import MealEntriesContainer from "./MealEntriesContainer";
import { totalExerciseCals } from "../actions/exerciseEntries";
import { totalMealCals } from "../actions/mealEntries";





class Diaries extends React.Component {

    constructor(){
        super()
        let today = new Date();
        let dd = today.getDate()
        let mm = today.getMonth()+1
        let yyyy = today.getFullYear()
        if(dd<10){
            dd = '0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
        const updatedDate = `${yyyy}-${mm}-${dd}`;
        this.state={
            date: updatedDate
        }
    }


handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}


  render() {
let totalExerciseCals;
let totalMealCals;
const exerciseCals = this.props.specificExercises.map(exercise => exercise.calories_burned)
console.log(exerciseCals)
const mealCals = this.props.specificMeals.map(exercise => exercise.calories)
if (exerciseCals.length > 1){
     totalExerciseCals = exerciseCals.reduce((a,b) => a + b, 0)
} else if(exerciseCals.length = 1){
    totalExerciseCals = exerciseCals
} else {
    totalExerciseCals = 0
}
if (mealCals.length > 1){
    totalMealCals = mealCals.reduce((a,b) => a + b, 0)
} else if(mealCals.length = 1){
    totalMealCals = mealCals
} else {
    totalMealCals = 0
}

const totalCals = (totalMealCals - totalExerciseCals).toFixed(1)

    return (
      <div
        style={{ fontFamily: 'sans-serif', position: 'sticky', marginTop: '15vh'}}
      >
        <Segment >
          <Header as="h3">
              <Form>
              <Input
              type='date'
              name= 'date'
              value={this.state.date}
              onChange={this.handleChange}>
              </Input>
            </Form>
          </Header>
          <Divider section />

          <Header as="h3">Meals</Header>
          <MealEntriesContainer date={this.state.date}/>

          <Divider section />

          <Header as="h3">Activities</Header>
          <ExerciseEntriesContainer date={this.state.date} />
          <Divider section />
  <Header as="h3">Net Calories: {totalCals}</Header>
        </Segment>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
      specificMeals: state.specificMeals,
      specificExercises: state.specificExercises
    };
  };


export default connect(mapStateToProps)(Diaries);
