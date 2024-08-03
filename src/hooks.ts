import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type {  AppDispatch } from './redux/store';
import { RootState } from 'types';

// Используйте вместо обычного `useDispatch` и `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
