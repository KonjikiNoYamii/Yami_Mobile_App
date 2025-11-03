// src/hooks/useElegantData.ts
import { useState } from 'react';

interface FlatItem { id: string; title: string; }
interface SectionData { title: string; data: string[]; }

export const useData = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [scrollItems] = useState<string[]>(['Overview', 'Stats', 'Quick Actions']);
  const [flatData, setFlatData] = useState<FlatItem[]>(
    Array.from({ length: 12 }, (_, i) => ({ id: String(i+1), title: `Entry ${i+1}` }))
  );
  const [sections, setSections] = useState<SectionData[]>([
    { title: 'A', data: ['Alpha', 'Arrow'] },
    { title: 'B', data: ['Beta', 'Box'] },
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulasi fetch
    await new Promise<void>((r) => setTimeout(r, 800));
    setFlatData(prev => [...prev, { id: String(prev.length+1), title: `Entry ${prev.length+1}` }]);
    setSections(prev => [{ title: 'New', data: ['New One'] }, ...prev]);
    setRefreshing(false);
  };

  return { refreshing, scrollItems, flatData, sections, onRefresh };
};
