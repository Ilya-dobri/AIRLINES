import React from 'react';
import img from '../img/img.png';
import { Ticket } from 'redux/slice/FilterSlise';
import { useDispatch } from 'react-redux';
import { removeItemCart } from '../redux/slice/CardSlise'; // Ensure correct path to removeItemCart

interface CartItemProps extends Ticket {
  // Define props interface to avoid any prop-type issues
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  price,
  transfer,
  timego,
  timego2,
  transfer2,
  MOWHKT,
  MOWHKT2,
}: CartItemProps) => {
  const dispatch = useDispatch();

  const onClickRemove = () => {
    dispatch(removeItemCart(id)); // Dispatch removeItemCart with ticket id
  };

  return (
    <div className='ticket'>
      <div className='ticket-header'>
        <h1>{price}</h1>
        <img src={img} alt='' />
      </div>
      <svg onClick={onClickRemove} className='x' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
      </svg>
      <div className='schedule'>
        <div className='time'>
          <h3 className='color'>MOW – HKT</h3>
          <h3>{MOWHKT || 'N/A'}</h3>
        </div>
        <div className='time'>
          <h3 className='color'>В пути</h3>
          <h3>{timego}</h3>
        </div>
        <div className='time'>
          <h3 className='color'>Пересадки</h3>
          <h3>{transfer}</h3>
        </div>
      </div>
      {MOWHKT2 && timego2 && transfer2 && (
        <div className='schedule'>
          <div className='time'>
            <h3 className='color'>MOW – HKT</h3>
            <h3>{MOWHKT2}</h3>
          </div>
          <div className='time'>
            <h3 className='color'>В пути</h3>
            <h3>{timego2}</h3>
          </div>
          <div className='time'>
            <h3 className='color'>Пересадки</h3>
            <h3>{transfer2}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
