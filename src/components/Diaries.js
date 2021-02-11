import React from "react";
import { connect } from "react-redux";
import ExerciseEntriesContainer from "./ExerciseEntriesContainer";
import {
  Divider,
  Header,
  Image,
  Grid,
  Segment,
  Form,
  Input,
  Label,
} from "semantic-ui-react";
import NetCalories from "./NetCalories";
import MealEntriesContainer from "./MealEntriesContainer";



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
//     let total;
//     let updatedCalories;
//     const entries = (this.props.mealEntries.filter(entry => entry.date === this.state.date))
//     let calories = entries.map(entry => {
//         return entry.calories
//     })
//     if (calories.length === 0){
//          updatedCalories = 0
//     } else {
//        updatedCalories = calories.map(entry => {
//            return entry})
// }
//     console.log(calories)
//     if (updatedCalories.length > 0){
//         const mealCals = updatedCalories.reduce((a, b) => a + b, 0).toFixed(2)
//         this.props.totalMealCals(mealCals)
//         return mealCals
//     } else {
//         return total = 0
//     }
const netCals = ((parseInt(this.props.mealCalories)) - (this.props.exerciseCalories)).toFixed(2)
console.log(netCals)
}


  render() {


const netCals = ((parseInt(this.props.mealCalories)) - (this.props.exerciseCalories)).toFixed(2)

    return (
      <div
        style={{ marginTop: "80px", marginBottom: "80px", textAlign: "center" }}
      >
        <Segment definition>
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
  <Header as="h3">Net Calories: {}</Header>
        </Segment>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
      mealCalories: state.mealCalories,
      exerciseCalories: state.exerciseCalories,
      mealEntries: state.mealEntries
    };
  };

export default connect(mapStateToProps)(Diaries);
