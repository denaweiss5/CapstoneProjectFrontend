import React from "react";
import { Table, Button, Form, Input } from "semantic-ui-react";


class Popup extends React.Component{
  constructor() {
    
    super();

    this.state = {
      name: '',
      fat: '',
      carbs: '',
      protein: '',
      calories: '',
      date: '',
      addMeal: true,
      error: ''
    };
  }

  render(){
    return(
      <div className='popup'>  
<div className='popup\_inner'> 
<h1>Add new meal</h1> 
<Form style={{}}>
            <Input
             style={{display: 'block', width:'75%', marginLeft: '12%'}}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Meal Name"
            ></Input>
            <Input
             style={{display: 'block', width: '75%', marginLeft: '12%'}}
              type="number"
              name="fat"
              value={this.state.fat}
              onChange={this.handleChange}
              placeholder="fat"
            ></Input>
            <Input
             style={{display: 'block', width: '75%', marginLeft: '12%'}}
              type="number"
              name="carbs"
              value={this.state.carbs}
              onChange={this.handleChange}
              placeholder="carbs"
            ></Input>
             <Input
              style={{display: 'block', width: '75%', marginLeft: '12%'}}
              type="number"
              name="protein"
              value={this.state.protein}
              onChange={this.handleChange}
              placeholder="protein"
            ></Input>
             <Input
              style={{display: 'block', width: '75%', marginLeft: '12%'}}
              type="number"
              name="calories"
              value={this.state.calories}
              onChange={this.handleChange}
              placeholder="calories"
            ></Input>
              <Input
              style={{display: 'block', width: '75%', marginLeft: '12%'}}
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
              placeholder="date"
            ></Input>
            <Button
              type="button"
              onClick={this.handleSubmit}
              className="ui blue button"
            >
              Submit
            </Button>
            <Button
              type="button"
              onClick={this.props.closePopup}
              className="ui button"
            >
              Cancel
            </Button>
          </Form>
        
<h1>{this.props.text}</h1>  

</div>  
</div>  
    )
  }
}

export default Popup;