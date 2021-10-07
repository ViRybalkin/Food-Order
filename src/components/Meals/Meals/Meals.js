// = Libs =
import { Fragment } from 'react';

// = Components =
import SummaryMeals from '../SummaryMeals/SummaryMeals';
import AvaliableMeals from '../AvaliableMeals/AvaliableMeals';

const Meals = () => {
  return (
    <Fragment>
      <SummaryMeals />
      <AvaliableMeals />
    </Fragment>
  );
};

export default Meals;
