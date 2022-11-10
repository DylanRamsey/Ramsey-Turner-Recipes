const RemoveModal = (props) => {
  return (
    <div>
      <button className="remove" onClick={() => props.removeRecipe(props.recipe.id)}>Remove Recipe</button>
    </div>
  )
}

export default RemoveModal