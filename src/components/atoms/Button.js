const Button = (props) => {
  return (
    <button onClick={() => props.setPopupActive(!props.popupActive)}>{props.text}</button>
  )
}

export default Button