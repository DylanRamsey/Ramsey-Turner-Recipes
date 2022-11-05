const Recipes = (props) => {
  return (
    <div className="recipes">
    { props.recipes.map((recipe, i) => (
      <div className="recipe" key={recipe.id}>
        <h3>{ recipe.title }</h3>

        <p>{ recipe.desc }</p>

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
          <button className="remove" onClick={() => props.removeRecipe(recipe.id)}>Remove</button>
        </div>              
      </div>
    ))}
  </div>
  )
}

export default Recipes