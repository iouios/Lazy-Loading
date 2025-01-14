import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) => useSelector(selector);
