import {useEffect, useState} from 'react';

export function useFetch(fetchFn, initialVal) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialVal);

  useEffect(() => {

    async function fetchData() {
      setIsFetching(true);

      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({message: error.message || 'Could not fetch data, please try again later.'});
      }

      setIsFetching(false);
    }


    fetchData();
  }, [fetchFn]);

  return {isFetching, error, fetchedData, setFetchedData};
}
