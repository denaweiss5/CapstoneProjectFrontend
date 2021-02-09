import React from 'react'

import { Form, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css' 

class SearchBar extends React.Component {
    constructor(){
        super()

        this.state = {
            keyword: ''
        }
    }



  handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSubmit = (e) => {
      const query = e.target[0].value
      console.log(query)
      e.preventDefault()

   
      fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${query}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "d6d30feb34msh027ba22c7ad5d85p111652jsn5e503987bf98",
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        }
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
    })
  }


  render(){
    return(
      <div >
      <Form  onSubmit={this.handleSubmit}  >
        <Input 
        icon='search'
        name='keyword' 
        placeholder='Search'
        value={this.state.keyword}
        onChange={this.handleChange}
        />
       
    </Form>
    </div>
   )
  }
}




export default SearchBar