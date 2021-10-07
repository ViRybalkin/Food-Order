// = Libs =
import { Fragment } from 'react';

// = Components =
import HeaderCartButton from '../HeaderCartButton/HeaderCartButton';

// = Styles and image =
import mealsImage from '../../../assets/img/meals.jpg';
import classes from './Header.module.scss';

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="measl image" />
      </div>
    </Fragment>
  );
};

export default Header;
