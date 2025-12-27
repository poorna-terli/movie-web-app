import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner';
import { config } from '../../config';

const API_BASE_URL = config.tmdb.apiBaseUrl;
const API_KEY = config.tmdb.apiKey;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

export default function Movie() {
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMovieDetails = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Fetch movie details with credits, similar, images, and videos
            const movieResponse = await fetch(
                `${API_BASE_URL}/movie/${id}?append_to_response=credits,similar,images,videos`,
                API_OPTIONS
            );
            
            if (!movieResponse.ok) {
                if (movieResponse.status === 404) {
                    throw new Error('Movie not found');
                }
                throw new Error('Failed to fetch movie details');
            }
            
            const movieData = await movieResponse.json();
            setMovie(movieData);
            setCast(movieData.credits?.cast?.slice(0, 10) || []);
            setSimilarMovies(movieData.similar?.results?.slice(0, 8) || []);
            
            // Set images (backdrops and posters)
            const allImages = [
                ...(movieData.images?.backdrops || []),
                ...(movieData.images?.posters || [])
            ].slice(0, 12); // Limit to 12 images
            setImages(allImages);
            
            // Set videos (filter for trailers and teasers)
            const trailers = (movieData.videos?.results || [])
                .filter(video => video.type === 'Trailer' || video.type === 'Teaser')
                .slice(0, 6); // Limit to 6 videos
            setVideos(trailers);
        } catch (err) {
            console.error('Error fetching movie:', err);
            setError(err.message || 'Failed to load movie details. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchMovieDetails();
        }
    }, [id, fetchMovieDetails]);

    if (isLoading) {
        return (
            <main>
                <div className="pattern" />
                <div className="wrapper">
                    <div className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
                        <Spinner />
                        <p className="text-light-200 mt-4 text-lg">Loading movie details...</p>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !movie) {
        return (
            <main>
                <div className="pattern" />
                <div className="wrapper">
                    <div className="text-center py-20 min-h-[60vh] flex flex-col items-center justify-center">
                        <div className="mb-6">
                            <svg className="w-20 h-20 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h2 className="text-red-500 text-2xl font-bold mb-2">{error || 'Movie not found'}</h2>
                            <p className="text-gray-100 text-sm mb-6">We couldn't load the movie details. Please try again later.</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={fetchMovieDetails}
                                className="px-6 py-3 bg-light-100/10 text-white rounded-lg hover:bg-light-100/20 transition-colors"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-3 bg-light-100/10 text-white rounded-lg hover:bg-light-100/20 transition-colors"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    const backdropUrl = movie.backdrop_path 
        ? `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`
        : null;
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : '/no-movie.png';

    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                {/* Back button */}
                <button
                    onClick={() => navigate('/')}
                    className="mb-6 flex items-center gap-2 text-light-200 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </button>

                {/* Hero Section with Backdrop */}
                <div className="relative mb-12 rounded-2xl overflow-hidden">
                    {backdropUrl && (
                        <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${backdropUrl})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
                        </div>
                    )}
                    <div className="relative z-10 p-8 md:p-12 lg:p-16">
                        <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
                            {/* Poster */}
                            <div className="flex-shrink-0">
                                <img
                                    src={posterUrl}
                                    alt={movie.title}
                                    className="w-full max-w-[300px] md:w-[300px] rounded-2xl shadow-2xl"
                                />
                            </div>
                            
                            {/* Movie Info */}
                            <div className="flex-1 flex flex-col justify-end">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-left">
                                    {movie.title}
                                </h1>
                                
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <div className="rating">
                                        <img src="/star.svg" alt="star icon" className="size-5" />
                                        <p className="text-xl font-bold text-white">
                                            {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                        </p>
                                    </div>
                                    <span className="text-gray-100">•</span>
                                    <p className="text-gray-100 text-lg">
                                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                                    </p>
                                    <span className="text-gray-100">•</span>
                                    <p className="text-gray-100 text-lg">
                                        {movie.runtime ? `${movie.runtime} min` : 'N/A'}
                                    </p>
                                </div>

                                {/* Genres */}
                                {movie.genres && movie.genres.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {movie.genres.map((genre) => (
                                            <span
                                                key={genre.id}
                                                className="px-4 py-2 bg-light-100/10 text-light-200 rounded-lg text-sm font-medium"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Overview */}
                                {movie.overview && (
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-white mb-2">Overview</h3>
                                        <p className="text-light-200 leading-relaxed text-lg">
                                            {movie.overview}
                                        </p>
                                    </div>
                                )}

                                {/* Additional Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    {movie.production_companies && movie.production_companies.length > 0 && (
                                        <div>
                                            <p className="text-gray-100 mb-1">Production</p>
                                            <p className="text-light-200">
                                                {movie.production_companies.slice(0, 3).map(c => c.name).join(', ')}
                                            </p>
                                        </div>
                                    )}
                                    {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                                        <div>
                                            <p className="text-gray-100 mb-1">Language</p>
                                            <p className="text-light-200 capitalize">
                                                {movie.spoken_languages.map(l => l.name).join(', ')}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cast Section */}
                {cast.length > 0 && (
                    <section className="mb-12">
                        <h2 className="mb-6">Cast</h2>
                        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
                            {cast.map((actor) => (
                                <div
                                    key={actor.id}
                                    className="flex-shrink-0 w-[150px] bg-dark-100 rounded-xl p-4 hover:bg-dark-100/80 transition-colors"
                                >
                                    <img
                                        src={actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                                            : '/no-movie.png'}
                                        alt={actor.name}
                                        className="w-full h-[200px] object-cover rounded-lg mb-3"
                                    />
                                    <p className="text-white font-semibold text-sm line-clamp-1 mb-1">
                                        {actor.name}
                                    </p>
                                    <p className="text-gray-100 text-xs line-clamp-1">
                                        {actor.character}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Videos/Trailers Section */}
                {videos.length > 0 && (
                    <section className="mb-12">
                        <h2 className="mb-6">Trailers & Videos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {videos.map((video) => (
                                <div key={video.id} className="bg-dark-100 rounded-xl overflow-hidden">
                                    <div className="relative w-full aspect-video">
                                        <iframe
                                            src={`${config.youtube.embedBaseUrl}/${video.key}`}
                                            title={video.name}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-white font-semibold text-lg mb-1">{video.name}</h3>
                                        <p className="text-gray-100 text-sm capitalize">{video.type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Images Section */}
                {images.length > 0 && (
                    <section className="mb-12">
                        <h2 className="mb-6">Images</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative group cursor-pointer bg-dark-100 rounded-xl overflow-hidden"
                                    onClick={() => {
                                        // Open image in full screen or modal (you can enhance this)
                                        window.open(`https://image.tmdb.org/t/p/original/${image.file_path}`, '_blank');
                                    }}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={`Movie scene ${index + 1}`}
                                        className="w-full h-[200px] object-cover transition-transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Similar Movies Section */}
                {similarMovies.length > 0 && (
                    <section>
                        <h2 className="mb-6">Similar Movies</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
                            {similarMovies.map((similarMovie) => (
                                <div
                                    key={similarMovie.id}
                                    className="movie-card cursor-pointer"
                                    onClick={() => navigate(`/movies/${similarMovie.id}`)}
                                >
                                    <img
                                        src={similarMovie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`
                                            : '/no-movie.png'}
                                        alt={similarMovie.title}
                                    />
                                    <div className="mt-4">
                                        <h3>{similarMovie.title}</h3>
                                        <div className="content">
                                            <div className="rating">
                                                <img src="/star.svg" alt="star icon" />
                                                <p>
                                                    {similarMovie.vote_average
                                                        ? similarMovie.vote_average.toFixed(1)
                                                        : 'N/A'}
                                                </p>
                                            </div>
                                            <span></span>
                                            <p className="year">
                                                {similarMovie.release_date
                                                    ? similarMovie.release_date.split('-')[0]
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}