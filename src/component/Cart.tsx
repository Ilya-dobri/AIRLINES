import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { resetCart } from '../redux/slice/CardSlise';

function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  
  const onClickRemove = () => {
    dispatch(resetCart());
  };
  
  if (items.length === 0) {
    return (
      <div className='container'>
        <div className='basket-block empty'>
          <div className='basket-header'>КОРЗИНА</div>
          <p className='emoge'>😭</p>
          <p>Корзина пуста</p>
          <Link to={'/'} className='button-back'>Вернуться на главную</Link>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='basket-block'>
        <div className='basket-header'>КОРЗИНА</div>
        {items.map((obj: any) => (
          <CartItem key={obj.ticket.id} {...obj.ticket} />
        ))}
        <div className='buttons'>
          <Link className='button-cart' to={'/'}>Вернуться на главную</Link>
          <button className='button clear' onClick={onClickRemove}>Очистить корзину</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
