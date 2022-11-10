import { db } from "./firebase.config"
import { useState, useEffect } from "react"
import Heading from "./components/atoms/Heading"
import Recipes from "./components/organisms/Recipes/Recipes"
import Button from "./components/atoms/Button"

import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc
} from "firebase/firestore"

function App() {
  const [recipes, setRecipes] = useState([])
  const [form, setForm] = useState({
    title: "",
    desc: "",
    ingredients: [],
    steps: []
  })
  const [popupActive, setPopupActive] = useState(false)

  const recipesCollectionRef = collection(db, "recipes")

  useEffect(() => {
    onSnapshot(recipesCollectionRef, snapshot => {
      setRecipes(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          viewing: false,
          ...doc.data()
        }
      }))
    })
  }, [])

  const handleView = id => {
    const recipesClone = [...recipes]

    recipesClone.forEach(recipe => {
      if (recipe.id === id) {
        recipe.viewing = !recipe.viewing
      } else {
        recipe.viewing = false
      }
    })

    setRecipes(recipesClone)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (
      !form.title ||
      !form.desc ||
      !form.ingredients ||
      !form.steps
    ) {
      alert("Please fill out all fields")
      return
    }

    addDoc(recipesCollectionRef, form)

    setForm({
      title: "",
      desc: "",
      ingredients: [],
      steps: []
    })

    setPopupActive(false)
  }

  const handleIngredient = (e, i) => {
    const ingredientsClone = [...form.ingredients]

    ingredientsClone[i] = e.target.value

    setForm({
      ...form,
      ingredients: ingredientsClone
    })
  }

  const handleStep = (e, i) => {
    const stepsClone = [...form.steps]

    stepsClone[i] = e.target.value

    setForm({
      ...form,
      steps: stepsClone
    })
  }

  const handleIngredientCount = () => {
    setForm({
      ...form,
      ingredients: [...form.ingredients, ""]
    })
  }

  const handleStepCount = () => {
    setForm({
      ...form,
      steps: [...form.steps, ""]
    })
  }

  const removeRecipe = id => {
    deleteDoc(doc(db, "recipes", id))
  }

  return (
    <div className="App">
      <Heading />
      <Recipes recipes={recipes} handleView={handleView} removeRecipe={removeRecipe} />
      
      <Button text="Add Recipe" setPopupActive={setPopupActive} popupActive={popupActive}/>
      

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
    </div>
  );
}

export default App;