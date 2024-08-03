import React from 'react';

interface TransferProps {
  handleTransferFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  transferFilter: string;
}

function Transfer({ handleTransferFilterChange, transferFilter }: TransferProps) {
  const isChecked = (value: string) => transferFilter.includes(value);
  return (
    <div className='transfer-options'>
      <p>Количество пересадок</p>
      <label>
        <input
          className='custom-checkbox'
          type='checkbox'
          name='transfer'
          value='all'
          checked={isChecked('all')}
          onChange={handleTransferFilterChange}
        />{' '}
        Все
      </label>
      <label>
        <input
          className='custom-checkbox'
          type='checkbox'
          name='transfer'
          value='0'
          checked={isChecked('0')}
          onChange={handleTransferFilterChange}
        />{' '}
        Без пересадок
      </label>
      <label>
        <input
          className='custom-checkbox'
          type='checkbox'
          name='transfer'
          value='1'
          checked={isChecked('1')}
          onChange={handleTransferFilterChange}
        />{' '}
        1 пересадка
      </label>
      <label>
        <input
          className='custom-checkbox'
          type='checkbox'
          name='transfer'
          value='2'
          checked={isChecked('2')}
          onChange={handleTransferFilterChange}
        />{' '}
        2 пересадки
      </label>
      <label>
        <input
          className='custom-checkbox'
          type='checkbox'
          name='transfer'
          value='3'
          checked={isChecked('3')}
          onChange={handleTransferFilterChange}
        />{' '}
        3 пересадки
      </label>
    </div>
  );
}

export default Transfer;
