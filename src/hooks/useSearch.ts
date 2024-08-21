import envConfig from '@/configs/environments';
import {useEffect, useRef, useState} from 'react';

type useSearchParams = {
  endpoint: string;
  action?: string;
  auto?: boolean;
};

export default function useSearch({
  endpoint,
  action,
  auto = true,
}: useSearchParams) {
  const [isLoadingSt, setIsLoadingSt] = useState<boolean>(false);
  const [optionsSt, setOptionsSt] = useState<any>('');
  const [valuesSt, setValuesSt] = useState<any[]>([]);
  let autoRf = useRef<boolean>(auto);

  useEffect(() => {
    if (auto) load();
  }, [optionsSt]);

  const setAuto = (auto: boolean) => {
    autoRf.current = auto;
  };

  const addFilters = (filters: any | any[]) => {
    setOptionsSt((prevOptions: any) => {
      let newFilters: any[] = [
        ...(prevOptions.filters ?? []),
        ...(Array.isArray(filters) ? filters : [filters]),
      ];
      return {...prevOptions, ...{filters: newFilters}};
    });
  };

  const load = async () => {
    setIsLoadingSt(true);
    let data: any;

    const result = await fetch(`${envConfig.api}${endpoint}`);
    data = await result.json();

    if (data) setValuesSt(data);

    setIsLoadingSt(false);
    return {data};
  };

  return {
    values: valuesSt,
    options: optionsSt,
    isLoading: isLoadingSt,
    setAuto,
    addFilters,
    load,
  };
}
