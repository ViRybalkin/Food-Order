import { useEffect, useState } from 'react';
// = Card =
import Card from '../../UI/Card/Card';

// = Style =
import classes from './AvaliableMeals.module.scss';

// = Components =
import MealItem from '../MealItem/MealItem';

const AvaliableMeals = () => {

  const [meals,setMeals] = useState([])
  const[isLoading,setIsLoading] = useState(true)
  const [error,setError] = useState(null)
useEffect( ()=> {
    const fetchMeals = async () =>{
    const response  = await fetch('https://react-foodorder-4b916-default-rtdb.firebaseio.com/meals.json')
      if(!response.ok) {
        throw new Error('something went wrong!')
      }
    const data = await response.json()
    const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
          })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }
      fetchMeals().catch((error) => {
        setIsLoading(false)
        setError(error.massage)
      })
  },[])

  if( isLoading) {
   return <section className={classes.mealsLoading}>
     <p>Loading...</p>
   </section>
  }

  if(error) {
    return <section className={classes.MealsError}>
      <p>{error}</p>
    </section>
  }

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvaliableMeals;
