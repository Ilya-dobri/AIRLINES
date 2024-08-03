import React, { ChangeEvent, useEffect, useState } from 'react';
import logo from '../svg/logo.svg';
import SortCategories from './SortCategories';
import FullTicket from './FullTicket';
import Transfer from './Transfer';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchTickets, setSortId, setTransferFilter, Ticket } from '../redux/slice/FilterSlise';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Интерфейс для состояния Redux
interface RootState {
  FilterSlise: {
    sortedItems: Ticket[];
    status: string;
    categoryId: number;
    transferFilter: string;
  };
  cart: {
    totalPrice: number;
    items: Ticket[];
    totalCount: number;
  };
}

function Airport() {
  const [selectedSort, setSelectedSort] = useState<'lowPrice' | 'fastest' | 'optimal'>('lowPrice');
  const dispatch = useAppDispatch();
  const useAppSelector: <T>(selector: (state: RootState) => T) => T = useSelector;
  const { totalPrice, totalCount } = useSelector((state: RootState) => state.cart);
  const { sortedItems, status, transferFilter } = useAppSelector(
    (state: RootState) => state.FilterSlise
  );

  useEffect(() => {
    // Загрузка билетов с учетом начального параметра сортировки
    dispatch(fetchTickets({ limit: 5, sort: selectedSort }));
  }, [selectedSort, dispatch]);

  // Обработчик изменения фильтра пересадок
  const handleTransferFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;
    dispatch(setTransferFilter(value));
  };

  // Обработчик изменения сортировки
  const handleSortChange = (sort: 'lowPrice' | 'fastest' | 'optimal') => {
    setSelectedSort(sort);
    dispatch(setSortId({ name: sort, sort }));
  };

  return (
    <div>
      <div className='Header'>
        <img src={logo} alt='logo' />
        
        <Link className='basket' to={'/cart'}>
        {totalCount} 
        <div className='slice'></div>
        {totalPrice} ₽</Link>
      </div>

      <div className='distributor'>
        <div className='categories-transfers'>
          <Transfer handleTransferFilterChange={handleTransferFilterChange} transferFilter={transferFilter} />
        </div>
        <div className='right-panel'>
          <div className='ticket-scroll'>
            <SortCategories value={selectedSort} onSortChange={handleSortChange} />

            {status === 'succeeded' &&
              sortedItems.map((obj) => <FullTicket key={obj.id} {...obj} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Airport;
