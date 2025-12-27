import { useEffect, useState } from "react"
import Search from "../../components/search"
import Spinner from "../../components/spinner";
import MovieCard from "../../components/Moviecard";
import{ useDebounce} from 'react-use'
import { getTrendingSearches, updateSearchcount } from "../../appwrite.js";
import { useNavigate } from 'react-router';
import { config } from '../../config';

const API_BASE_URL = config.tmdb.apiBaseUrl;
const API_KEY = config.tmdb.apiKey;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovieList] = useState([]);  
  const[trendingmovies,setTrendingMovies]=useState([]);     
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState();
 
   let navigate = useNavigate();

  useDebounce(
    () =>
      setDebouncedSearchTerm(searchTerm),
    500,
    [searchTerm]
  );

  const fetchMovies = async (query='') => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      if (data.response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

if(query&& data.results.length>0){
        await updateSearchcount(query, data.results[0]);
}    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
const loadTrendingMovies=async()=>{
  try{
    const movies=await getTrendingSearches();
    setTrendingMovies(movies);
  }catch(error){
    console.error("Error fetching trending searches:",error);
  }
};
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  useEffect(() => {
    loadTrendingMovies();
  }, []);
  const onClickMoiveCard=(id)=>{
    console.log("Movie card clicked with ID:",id);
    // navigation logic can be added here
    navigate(`/movies/${id}`);
  }

  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero banner" />
          <h1>Find <span className="text-gradient">Movies</span> you'll enjoy without the hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {trendingmovies.length>0&&(
        <section className="trending-searches">
          <h2>Trending Searches</h2>
          <ul>
            {trendingmovies.map((movie,index) => (
              <li key={movie.$id} >
                <p>{index+1}</p>
                <img src={movie.poster_url} alt={movie.title} />
              </li>
            ))}
          </ul>
        </section>
        )}
        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner />
            </div>
          ) : errorMessage ? (
            <div className="text-center py-20">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-500 text-lg font-semibold mb-2">{errorMessage}</p>
                <p className="text-gray-100 text-sm mb-4">Please check your connection and try again.</p>
              </div>
              <button
                onClick={() => {
                  setErrorMessage("");
                  fetchMovies(debouncedSearchTerm);
                }}
                className="px-6 py-3 bg-light-100/10 text-white rounded-lg hover:bg-light-100/20 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : movies.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-gray-100 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-100 text-lg mb-2">No movies found</p>
              <p className="text-gray-100 text-sm">Try searching for a different movie.</p>
            </div>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onClickMovieCard={onClickMoiveCard} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};
export default Home 