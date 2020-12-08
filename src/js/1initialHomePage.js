"use strict";

// - это первый файл не забываем про ‘use strict’ (далее никто его не пишет в своих js файлах);
const URL_POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key=9675092798f3a490a8c4d8f2cf77169b&language=en-US&page=';
const URL_GENRES = 'https://api.themoviedb.org/3/genre/movie/list?api_key=9675092798f3a490a8c4d8f2cf77169b&language=en-US'

// - выбираем из DOM наш список;
const filmList = document.querySelector('.filmList');
filmList.setAttribute('data-name', 'home');

// - создаем глобальные переменные renderFilms и genres, pageNumber 
// (будет использоваться в запросе при плагинации); 
let renderFilms;
let genres;
let pageNumber;


const createCardFunc = (imgPath, filmTitle, movieId) => {
  // - создаем функцию createCardFunc, она принимает параметрами imgPath, filmTitle, movieId создает li согласно макета, вешает на нее слушателем функцию activeDetailsPage c параметрами movieId и флагом false так как фильм из библиотеки (смотри пункт “3)” создание activeDetailsPage);

  const filmListItem = document.createElement('li');
  filmListItem.classList.add('filmList__item')
  filmListItem.setAttribute('data-id', movieId)

  const filmListPoster = document.createElement('img');
  filmListPoster.classList.add('filmList__poster');
  filmListPoster.setAttribute('alt', filmTitle);
  filmListPoster.setAttribute('src',
    'https://image.tmdb.org/t/p/' + 'w500' + imgPath);

  filmListItem.append(filmListPoster);

  const filmListTitle = document.createElement('p');
  filmListTitle.classList.add('item__name');
  filmListTitle.textContent = filmTitle;
  filmListItem.append(filmListTitle);

  return filmListItem;
}

const fetchPopularMoviesList = (page = 1) => {
  // - создаем функцию fetchPopularMoviesList (должна в запросе в виде переменной использовать pageNumber) в которой используется createCardFunc результат используя fragment кладем в ul, и не забываем заполнить этими же данными переменную renderFilms (она понадобится в работе следующим участникам); 

  fetch(`${URL_POPULAR + page}`)
    .then(responce => responce.json())
    .then(data => {
      renderFilms = data.results;
      const fragment = document.createDocumentFragment();

      renderFilms.forEach(el => {
        const imagePath = el.backdrop_path;
        const title = el.original_title;
        const year = el.release_date.substr(0, 4) ? `(${el.release_date.substr(0, 4)})` : "";
        const filmId = el.id;

        fragment.append(
          createCardFunc(imagePath, `${title} ${year}`, filmId))
      }
      )

      filmList.innerHTML = "";
      filmList.append(fragment);
      filmList.addEventListener('click', activeDetailsPageListener)
    })

    .catch(error => {
      const fragment = document.createDocumentFragment();

      const filmListErrorTitle = document.createElement('h2');
      filmListErrorTitle.classList.add('filmList__error');
      filmListErrorTitle.textContent = "Oops, something went wrong";
      fragment.append(filmListErrorTitle);

      const filmListErrorText = document.createElement('h3');
      filmListErrorText.classList.add('filmList__error');
      filmListErrorText.textContent = "Please, try again later";
      fragment.append(filmListErrorText);

      const filmListErrorReason = document.createElement('p');
      filmListErrorReason.classList.add('filmList__error');
      filmListErrorReason.textContent = error;
      fragment.append(filmListErrorReason);

      filmList.innerHTML = "";
      filmList.append(fragment);
    })
}

const fetchGenres = () => {
  // - создаем функцию fetchGenres которая забирает 
  // жанры и кладет их в переменную genres (она понадобится 
  // в работе следующим участникам); 

  fetch(URL_GENRES)
    .then(responce => responce.json())
    .then(data => {
      genres = data.genres
    })
    .catch(console.log)
}


// - запускаем функцию fetchPopularMoviesList и fetchGenres. 
fetchPopularMoviesList(); // функция должна(?) принимать значение pageNum 
fetchGenres();