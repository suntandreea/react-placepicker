import {useFetch} from '../hooks/useFetch.js';
import {fetchAvailablePlaces} from '../http.js';
import {sortPlacesByDistance} from '../loc.js';
import Error from './Error.jsx';
import Places from './Places.jsx';

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();
  // force it to return a Promise because the useFetch custom hook is expecting a fct that returns a Promise!
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(position => {
      const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
      resolve(sortedPlaces);
    });
  })
}

export default function AvailablePlaces({onSelectPlace}) {

  const {
    isFetching,
    error,
    fetchedData: availablePlaces
  } = useFetch(fetchSortedPlaces, []);

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
