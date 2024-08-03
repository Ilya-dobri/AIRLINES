import React from 'react';
import img from '../img/img.png';
import { Ticket } from 'redux/slice/FilterSlise'; // Убедитесь, что интерфейс Ticket правильно импортирован
import { addItem, removeItem } from '../redux/slice/CardSlise';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types';

interface FullTicketProps extends Ticket {}

function FullTicket({
  price,
  transfer,
  timego,
  timego2,
  transfer2,
  MOWHKT,
  MOWHKT2,
  id,
}: FullTicketProps) {
  const item = useSelector((state: RootState) =>
    state.cart.items.some(item => item.ticket.id === id)
  );
  const dispatch = useDispatch();

  const onClickAdd = () => {
    const ticket: Ticket = {
      id,
      price,
      transfer,
      timego,
      timego2,
      transfer2,
      MOWHKT,
      MOWHKT2,
    };
    console.log(ticket)
    if (item) {
      dispatch(removeItem(id));
    } else {
      dispatch(addItem(ticket));
    }
  };

  return (
    <div className={`ticket ${item ? 'active' : ''}`} onClick={onClickAdd}>
      <div className='ticket-header'>
        <h1>{price}</h1>
        <img src={img} alt='' />
      </div>
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
}

export default FullTicket;
