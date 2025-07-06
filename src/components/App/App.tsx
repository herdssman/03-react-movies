import { useState } from 'react'
import css from './App.module.css'
import { Toaster, toast } from 'react-hot-toast'
import type { Movie } from '../../types/movie'
import fetchMovies from '../../services/movieService'
import SearchBar from '../SearchBar/SearchBar'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieGrid from '../MovieGrid/MovieGrid'
import MovieModal from '../MovieModal/MovieModal'




export default function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie:Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  const handleSearch = async (query: string) => {
    try {

      setIsLoading(true);
      setIsError(false);
      setMovies([]);

      const hits = await fetchMovies(query);
      setMovies(hits);

      if (hits.length === 0) {
        toast.error("No movies found for your request.")
      }

    } catch {

      setIsError(true);
    
    } finally {

      setIsLoading(false);

    }
  };

  
  return (
    <div className={css.app}>

      <Toaster />

      <SearchBar onSubmit={handleSearch} />
      
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}


      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}

      <MovieGrid movies={movies} onSelect={openModal}/>

    </div>
  )
}
