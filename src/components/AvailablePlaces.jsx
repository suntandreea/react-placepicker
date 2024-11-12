import {useEffect, useState} from 'react';
import {fetchAvailablePlaces} from '../http.js';
import {sortPlacesByDistance} from '../loc.js';
import Error from './Error.jsx';
import Places from './Places.jsx';

export default function AvailablePlaces({onSelectPlace}) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {

    async function getPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition(position => {
          console.log("position", position);

          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({message: error.message || 'Could not fetch data, please try again later.'});
        setIsFetching(false);
      }
    }

    getPlaces();
  }, []);

  if (error) {
    return <Error message={error?.message} title="Error" />;
  }

  return (
    <Places
      title="Available Places"
      isLoading={isFetching}
      loadingText="Loading ..."
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
