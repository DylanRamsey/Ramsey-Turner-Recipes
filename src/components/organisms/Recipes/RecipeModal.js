const RecipeModal = (props) => {
  return (
    <>
      { props.recipe.viewing && <div>
        <h4>Ingredients</h4>
        <ul>
          { props.recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ ingredient }</li>
          ))}
        </ul>

        <h4>Steps</h4>
        <ol>
          { props.recipe.steps.map((step, i) => (
            <li key={i}>{ step }</li>
          ))}
        </ol>
      </div>}    
    </>
  )
}

export default RecipeModal