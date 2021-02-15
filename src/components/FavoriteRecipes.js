import React from "react";
import { connect } from "react-redux";
import { Button, Grid , Card, Image} from "semantic-ui-react";
import { deleteEntry } from '../actions/favoriteRecipes'


class FavoriteRecipes extends React.Component {

    constructor(){
        super()

        this.state={
            name: '',
            fat: '',
            carbs: '',
            protein: '',
            calories: '',
            instructions: '',
            ingredients: '',
            error: ''
        }
    }

    handleDelete = (id) => {
        fetch(`http://localhost:3000/recipes/${id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(data => {
            this.props.deleteEntry(id)
        })
    }

    renderCard = (recipe) => {

        const { name, image, id } = recipe;
        return (
          <Card
            onClick={() => this.handleClick(id)}
      
            style={{
              padding: "10px",
              height: '50vh',
              width: '20vw',
              margin: "1vh"
            }}
          >
            <Image
              src={image}
              wrapped
              ui={false}
              style={{
                height: "auto",
                width: "auto",
              }}
            />
            <Card.Content>
              <Card.Header style={{fontSize: '3vh', fontFamily: 'sans-serif', fontWeight: 'lighter'}}>{name}</Card.Header>
            </Card.Content>
            <Button style={{ padding: '1px', backgroundColor: 'white'}} icon='trash' onClick={() => this.handleDelete(id)}></Button>
          </Card>
        );
      };

    render(){
     console.log(this.props.favoriteRecipe)
        return(
            <div>
                <Grid >
            <Grid.Row >
              
              {this.props.favoriteRecipe.length > 0 ?
              this.props.favoriteRecipe.map((recipe) => {
                return this.renderCard(recipe);
              })
              :
              <p>No Recipes Found. Please Consider Searching For New Ones</p>
            }
            </Grid.Row>
          </Grid>
            </div>
        )
    }
}
const mapDispatchToProps = {
   deleteEntry: deleteEntry
}
const mapStateToProps = (state) => {
    return {
        favoriteRecipe: state.favoriteRecipe
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipes)