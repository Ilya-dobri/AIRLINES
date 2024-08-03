import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortId, fetchTickets } from '../redux/slice/FilterSlise';
import { AppDispatch } from '../redux/store';
import { RootState } from '../redux/store';

const buttons = [
  { name: 'Самый дешевый', sort: 'lowPrice' as const },
  { name: 'Самый быстрый', sort: 'fastest' as const },
  { name: 'Оптимальный', sort: 'optimal' as const }
];

interface SortCategoriesProps {
  value: 'lowPrice' | 'fastest' | 'optimal';
  onSortChange: (sort: 'lowPrice' | 'fastest' | 'optimal') => void;
}

const SortCategories: React.FC<SortCategoriesProps> = ({ value }) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeSort = useSelector((state: RootState) => state.FilterSlise.sortId.sort);

  const handleButtonClick = (button: { name: string; sort: 'lowPrice' | 'fastest' | 'optimal' }) => {
    dispatch(setSortId({ name: button.name, sort: button.sort }));
    // Обновляем состояние сортировки
    dispatch(fetchTickets({ limit: 10, sort: button.sort }));
  };

  return (
    <div className="tabs">
      {buttons.map((btn, index) => (
        <li
          key={index}
          className={`button ${activeSort === btn.sort ? 'button-active' : ''} ${value === btn.sort ? 'first' : ''} ${value === buttons[buttons.length - 1].sort && btn.sort === buttons[buttons.length - 1].sort ? 'last' : ''}`}
          onClick={() => handleButtonClick(btn)}
        >
          {btn.name}
        </li>
      ))}
    </div>
  );
};

export default SortCategories;
