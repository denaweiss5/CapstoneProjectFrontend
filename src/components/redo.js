import _ from 'lodash'

import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }
export default class SearchExampleStandard extends Component {

    constructor(){
        super()
        this.state = initialState
    }

    source = () => { 
        const query = this.state.value
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${query}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "d6d30feb34msh027ba22c7ad5d85p111652jsn5e503987bf98",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
        .then(resp => resp.json())
        .then(data => {
           const text = data.results.map(result => {
                return  result.title
           })
           return text
        })
         }
        


  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e) => {
    this.setState({ 
        isLoading: true, 
        value: e.target.value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.source(), isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    console.log(this.state)
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            input={{ icon: 'search', iconPosition: 'left' }}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
          />
        </Grid.Column>
      </Grid>
    )
  }
}