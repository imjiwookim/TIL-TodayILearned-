import { useState } from 'react';

export function useViewOptions() {
  const [part, setPart] = useState('전체');
  const [sort, setSort] = useState('latest');
  const [search, setSearch] = useState('');

  return { part, setPart, sort, setSort, search, setSearch };
}