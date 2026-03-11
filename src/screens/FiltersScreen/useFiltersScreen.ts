import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  selectFilters,
  selectCities,
  setFilters,
  resetFilters,
} from '@/src/store/eventsSlice';

export function useFiltersScreen(onApply?: () => void) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const cities = useAppSelector(selectCities);

  const [localCity, setLocalCity] = useState<string | null>(filters.city);
  const [search, setSearch] = useState(filters.search);
  const [dateFrom, setDateFrom] = useState(filters.dateFrom ?? '');
  const [dateTo, setDateTo] = useState(filters.dateTo ?? '');

  const apply = useCallback(() => {
    dispatch(
      setFilters({
        city: localCity || null,
        search: search.trim(),
        dateFrom: dateFrom.trim() || null,
        dateTo: dateTo.trim() || null,
      })
    );
    onApply?.();
  }, [dispatch, localCity, search, dateFrom, dateTo, onApply]);

  const reset = useCallback(() => {
    setLocalCity(null);
    setSearch('');
    setDateFrom('');
    setDateTo('');
    dispatch(resetFilters());
    onApply?.();
  }, [dispatch, onApply]);

  return {
    cities,
    search,
    setSearch,
    localCity,
    setLocalCity,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    apply,
    reset,
  };
}
