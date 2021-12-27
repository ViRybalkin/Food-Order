// = Libs =
import { useContext, useState } from 'react';

// Styles =
import classes from './Cart.module.scss';

// = Components =
import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout';

// = Context =
import CartContext from '../../store/CartContext';

const Cart = props => {
  const [isCheckout,isSetCheckout] = useState(false)
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler =() =>{
    isSetCheckout(true)
  }

  const onConfirmHandler = (data) =>{
    fetch('https://react-foodorder-4b916-default-rtdb.firebaseio.com/orders.json',{
      method: 'POST',
      body: JSON.stringify({
        user: data,
        orderedItems: cartCtx.items
      })
    })
  }

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onClose} className={classes['button-alt']}>
        Close
      </button>
      {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  )

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} onConfirm={onConfirmHandler}/>}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
