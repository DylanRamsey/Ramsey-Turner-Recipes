
const RecipeModal = ( {form, popupActive, setPopupActive, handleSubmit, setForm, handleIngredient, handleIngredientCount, handleStep, handleStepCount}) => {
  return (
    <>
        { popupActive && <div className="popup">
        <div className="popup-inner">
          <h2>Add a new recipe</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                type="text" 
                value={form.desc} 
                onChange={e => setForm({...form, desc: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Ingredients</label>
              {
                form.ingredients.map((ingredient, i) => (
                  <input 
                    type="text"
                    key={i}
                    value={ingredient} 
                    onChange={e => handleIngredient(e, i)} />
                ))
              }
              <button type="button" onClick={handleIngredientCount}>Add ingredient</button>
            </div>
            <div className="form-group">
              <label>Steps</label>
              {
                form.steps.map((step, i) => (
                  <textarea 
                    type="text"
                    key={i}
                    value={step} 
                    onChange={e => handleStep(e, i)} />
                ))
              }
              <button type="button" onClick={handleStepCount}>Add step</button>
            </div>
            <div className="buttons">
              <button type="submit" className="submit">Submit</button>
              <button type="button" className="remove" onClick={() => setPopupActive(false)}>Close</button>
            </div>
          </form>
        </div>
      </div>}
    </>
  )
}

export default RecipeModal