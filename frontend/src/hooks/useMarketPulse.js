import useSWR from 'swr';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/_backend/api';

const fetcher = url => axios.get(url).then(res => res.data);

export const useMarketPulse = () => {
  const { data, error, mutate, isValidating } = useSWR(`${API_URL}/market-pulse`, fetcher, {
    refreshInterval: 1000 * 60 * 60 * 24, // 24 hours
    revalidateOnFocus: false,
    dedupingInterval: 1000 * 60, // 1 minute
  });

  const { data: healthData } = useSWR(`${API_URL}/health`, fetcher, {
    refreshInterval: 1000 * 30, // 30 seconds for system health
  });

  const manualSync = async () => {
    await mutate();
  };

  return {
    pulse: data,
    health: healthData,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    manualSync
  };
};
