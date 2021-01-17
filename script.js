const buttons = [...document.getElementsByClassName('buttons__radio')];
const filmMenu = document.getElementById('allfilms__list')
const input = document.getElementById('header__textbox');

const addMoviesToDom = ((movies) => {
    const clearDom = () => filmMenu.innerHTML = '';
    clearDom();
    const movieList = movies.map((film) => {
        const filmLi = document.createElement('li');
        filmLi.classList.add('allfilms__list-item');
        const imdbLink = document.createElement('a');
        imdbLink.href = `https://www.imdb.com/title/${film.imdbID}`;
        imdbLink.target = '_blank';
        const img = document.createElement('img');
        img.src = film.Poster;
        img.alt = 'image of movie';

        imdbLink.append(img);
        filmLi.append(imdbLink);
        return filmLi;
    })
    movieList.forEach(filmLi => {
        filmMenu.append(filmLi);
    })
})
addMoviesToDom(movies)


const addEventListeners = () => {
    const handleOnChangeEvent = (event) => {
        const filterMovies = (wordInMovieTitle) => {
            return movies.filter(film => film.Title.toLowerCase().includes(wordInMovieTitle));
        }
        const filterLatestMovies = () => movies.filter(film => film.Year >= 2014);
        switch (event.target.id) {
            case 'avengers':
            case 'x-men':
            case 'princess':
            case 'batman':
                addMoviesToDom(filterMovies(event.target.id));
                break;
            case 'nieuwste':
                addMoviesToDom(filterLatestMovies());
                break;
            case 'all':
                addMoviesToDom(movies);
                break;
            case 'header__textbox':
                let inputText = input.value.toLowerCase();
                addMoviesToDom(filterMovies(inputText));
                break;
            default:
                addMoviesToDom(movies);
        }
    }
    input.addEventListener('keyup', handleOnChangeEvent);
    buttons.forEach(button => {
        button.addEventListener('change', handleOnChangeEvent)
    })
}
addEventListeners()


