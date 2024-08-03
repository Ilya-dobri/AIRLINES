import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'redux/store';
// Интерфейсы
export interface Ticket {
  id: string;
  price: number;
  transfer: string;
  timego: string;
  timego2: string;
  transfer2?: string;
  MOWHKT?: string;
  MOWHKT2?: string;
  SortId?: string
  
}

interface SortId {
  name: string;
  sort: 'lowPrice' | 'fastest' | 'optimal';
}

interface FilterState {
  items: Ticket[];
  sortedItems: Ticket[];
  categoryId: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  sortId: SortId; // Ensure this line exists
  transferFilter: string;
}

// Начальное состояние
const initialState: FilterState = {
  items: [],
  sortedItems: [],
  categoryId: 0,
  status: 'idle',
  error: null,
  sortId: { name: 'Самый дешевый', sort: 'lowPrice' },
  transferFilter: 'all',
};

// Асинхронный экшен для загрузки билетов с сортировкой
export const fetchTickets = createAsyncThunk<Ticket[], { limit: number; sort: 'lowPrice' | 'fastest' | 'optimal' }>(
  'data/fetchTickets',
  async ({ limit, sort }) => {
    const sortOrder = sort === 'fastest' ? 'asc' : 'desc'; // Пример сортировки, адаптируйте по необходимости
    const { data } = await axios.get(`http://localhost:3000/items?_limit=${limit}&_sort=${sort}&_order=${sortOrder}`);
    return data as Ticket[];
  }
);

// Функция для парсинга времени
const parseTime = (timeStr: string): number | null => {
  if (!timeStr || typeof timeStr !== 'string') {
    return null;
  }
  const timeParts = timeStr.match(/(\d+):(\d+)/);
  if (!timeParts) {
    return null;
  }

  let [hours, minutes] = timeParts.slice(1).map(Number);

  if (minutes >= 60) {
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
  }
  if (hours >= 24) {
    hours = hours % 24;
  }

  return hours * 60 + minutes;
};

// Функция для вычисления продолжительности
const calculateDuration = (timeGoStr: string, timeGo2Str: string): number => {
  const timeGo = parseTime(timeGoStr);
  const timeGo2 = parseTime(timeGo2Str);

  if (timeGo === null || timeGo2 === null) {
    return Infinity;
  }

  return timeGo2 >= timeGo ? timeGo2 - timeGo : 24 * 60 - timeGo + timeGo2;
};

// Функция для сортировки билетов
const sortItems = (items: Ticket[], sortKey: 'lowPrice' | 'fastest' | 'optimal'): Ticket[] => {
  switch (sortKey) {
    case 'lowPrice':
      return [...items].sort(
        (a, b) => a.price - b.price
      );
    case 'fastest':
      return [...items].sort((a, b) => {
        const durationA = calculateDuration(a.timego, a.timego2);
        const durationB = calculateDuration(b.timego, b.timego2);
        return durationA - durationB;
      });
    case 'optimal':
      // Логика для оптимальной сортировки
      return [...items]; // Замените на вашу логику
    default:
      return items;
  }
};

// Функция для фильтрации билетов по пересадкам
const filterItems = (items: Ticket[], transferFilter: string): Ticket[] => {
  if (transferFilter === 'all') {
    return items;
  }
  const transferCount = parseInt(transferFilter, 10);
  return items.filter((item) => {
    const transferCountItem =
      item.transfer === '' || item.transfer === 'none' ? 0 : item.transfer.split(',').length;
    return transferCountItem === transferCount;
  });
};

// Срез состояния фильтра
const FilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<{ categoryId: number }>) {
      state.categoryId = action.payload.categoryId || 0;
    },
    setSortId(state, action: PayloadAction<SortId>) {
      state.sortId = action.payload;
      // Загрузка билетов с новым параметром сортировки
      state.status = 'loading';
    },
    setTransferFilter(state, action: PayloadAction<string>) {
      state.transferFilter = action.payload;
      state.sortedItems = filterItems(state.items, state.transferFilter);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.sortedItems = sortItems(state.items, state.sortId.sort);
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { setFilter, setSortId, setTransferFilter } = FilterSlice.actions;
export default FilterSlice.reducer;
