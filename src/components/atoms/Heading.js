import Cutlery from "../../svgs/cutlery.svg"

const Heading = () => {
  return (
    <div className="flex justify-center items-center">
      <h1>Ramsey + Turner Recipes</h1>
      <img className="mx-4" src={ Cutlery } alt="Cutlery Logo" />
    </div>
  )
}

export default Heading