import { db } from "./firebase.config"
import { useState, useEffect } from "react"
import Heading from "./components/atoms/Heading"
import Recipes from "./components/organisms/Recipes/Recipes"
import RecipeModal from "./components/organisms/Recipes/RecipeModal"
import Versioning from "./components/atoms/Versioning"

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
      <button onClick={() => setPopupActive(!popupActive)}>Add Recipe</button>
      <RecipeModal 
        popupActive={popupActive}
        setPopupActive={setPopupActive}
        handleSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        handleIngredient={handleIngredient}
        handleIngredientCount={handleIngredientCount}
        handleStep={handleStep}
        handleStepCount={handleStepCount}
        />
        <Versioning />
    </div>
  );
}

export default App;