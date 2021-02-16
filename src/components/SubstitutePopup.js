import React from "react";
import { Form, Input, Button } from "semantic-ui-react";

class SubstitutePopup extends React.Component {
  constructor() {
    super();

    this.state = {
      keyword: "",
      substitutes: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const keyword = this.state.keyword;
    fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/substitutes?ingredientName=${keyword}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d6d30feb34msh027ba22c7ad5d85p111652jsn5e503987bf98",
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          substitutes: data.substitutes,
          keyword: "",
        });
      });
  };
  render() {
    return (
      <div className="sub_popup">
        <div className="popup\_inner">
          <Form onSubmit={this.handleSubmit}>
            <Input
              style={{ marginTop: "5vh", width: "60%" }}
              icon="search"
              name="keyword"
              placeholder="Search for Ingredient Substitutes..."
              value={this.state.keyword}
              onChange={this.handleChange}
            />
            <Button
              type="button"
              onClick={this.props.closePopup}
              className="ui button"
              icon="window close outline"
              style={{
                float: "right",
                marginTop: "2vh",
                padding: "3px",
                marginRight: "2vh",
                backgroundColor: "white",
              }}
            ></Button>
          </Form>
          {this.state.substitutes ? (
            <ul>
              {this.state.substitutes.map((sub) => {
                return (
                  <li
                    style={{ color: "white", margin: "3vh", fontSize: "2vh" }}
                  >
                    {sub}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p style={{ color: "white", margin: "3vh", fontSize: "2vh" }}>
              Sorry, we currently do not have any substitutes for that
              ingredient.
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default SubstitutePopup;
