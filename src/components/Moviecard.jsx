import React from 'react'

const MovieCard = (props) => {
    const { movie, onClickMovieCard } = props;
    const { id, title, poster_path, vote_average, release_date } = movie;

    return (
        <div className='movie-card' as="button" onClick={() => onClickMovieCard(id)}>
            <img
                src={poster_path ?
                    `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
                alt={title}
            />
            <div className="mt-4">
                <h3>{title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="star icon" />
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>

                    </div>
                    <span></span>
                    <p className='lang'></p>
                    <span></span>
                    <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </div>

        </div>


    )
}

export default MovieCard

