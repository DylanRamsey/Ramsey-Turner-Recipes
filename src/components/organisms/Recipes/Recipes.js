import RemoveModal from "../../molecules/RemoveModal"

const Recipes = (props) => {
  return (
    <div className="recipes">
    { props.recipes.map((recipe, i) => (
      <div className="recipe" key={recipe.id}>
        <h2>{ recipe.title }</h2>

        <h5>{ recipe.desc }</h5>

        { recipe.viewing && <div>
          <h4>Ingredients</h4>
          <ul>
            { recipe.ingredients.map((ingredient, i) => (
              <li key={i}>{ ingredient }</li>
            ))}
          </ul>

          <h4>Steps</h4>
          <ol>
            { recipe.steps.map((step, i) => (
              <li key={i}>{ step }</li>
            ))}
          </ol>
        </div>}

        <div className="buttons">
          <button onClick={() => props.handleView(recipe.id)}>View { recipe.viewing ? 'less' : 'more' }</button>
            <RemoveModal removeRecipe={props.removeRecipe} recipe={recipe}/>
        </div>              
      </div>
    ))}
  </div>
  )
}

export default Recipes