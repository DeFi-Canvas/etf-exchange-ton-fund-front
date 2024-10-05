import { useDispatch } from 'react-redux';
import { RootDispatchType } from '@/store';

export const useAppDispatch = () => useDispatch<RootDispatchType>();
