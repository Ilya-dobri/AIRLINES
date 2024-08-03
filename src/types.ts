export interface Ticket {
  id: string;
  price: number;
  transfer: string;
  timego: string;
  timego2: string;
  transfer2?: string;
  MOWHKT?: string;
  MOWHKT2?: string;
  sortId?: string;
}

export interface FilterState {
  sortedItems: Ticket[];
  status: string;
  categoryId: number;
  transferFilter: string;
}

export interface CartState {
  totalPrice: number;
  items: { ticket: Ticket; count: number }[];
  totalCount: number;
}

export interface RootState {
  FilterSlise: FilterState;
  cart: CartState;
}