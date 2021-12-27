// ==Libs==
import { useRef, useState } from 'react';

// == Style ==
import classes from './Checkout.module.scss'

const isEmpty = value => value.trim() === '';
const isNotFiveChars = value => value.trim().length !== 5;

const Checkout = props => {
  const [formInputsValidity,setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  })
  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalInputRef = useRef()
  const cityInputRef = useRef()

  const confirmHandler = (event) =>{
    event.preventDefault()

    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostal = postalInputRef.current.value
    const enteredCity = cityInputRef.current.value

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalIsValid = !isEmpty(enteredPostal)
    const enteredCityIsValid = isNotFiveChars(enteredCity)

    setFormInputsValidity({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    })

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid

    if(!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    })

  }

  const nameControlClass = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
  const streetControlClass = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
  const postalControlClass = `${classes.control} ${formInputsValidity.postal ? '' : classes.invalid}`
  const cityControlClass = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
    <div className={nameControlClass}>
      <label htmlFor="name">Your Name</label>
      <input type="text" id="name" ref={nameInputRef}/>
      {!formInputsValidity.name && <p>Please enter a valid name</p>}
    </div>
    <div className={streetControlClass}>
      <label htmlFor="street">Street</label>
      <input type="text" id="street" ref={streetInputRef}/>
      {!formInputsValidity.street && <p>Please enter a valid street</p>}
    </div>
    <div className={postalControlClass}>
      <label htmlFor="postal">Postal Code</label>
      <input type="text" id="postal" ref={postalInputRef}/>
      {!formInputsValidity.postal && <p>Please enter a valid postal code</p>}
    </div>
    <div className={cityControlClass}>
      <label htmlFor="city">City</label>
      <input type="text" id="city" ref={cityInputRef}/>
      {!formInputsValidity.city && <p>Please enter a valid city</p>}
    </div>
    <div className={classes.actions}>
      <button onClick={props.onCancel} >Cancel</button>
      <button type='submit' className={classes.submit}>Confirm</button>
    </div>
  </form>
  )
}

export default Checkout
