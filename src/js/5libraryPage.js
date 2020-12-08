const films = document.querySelector('.myFilmLibraryPage__film-card');
const favouriteButton = document.querySelector(
  '.myFilmLibraryPage__buttonFavourites',
);
const queueButton = document.querySelector('.myFilmLibraryPage__buttonQueue');

const createLibraryCardFunc = function (
  imgPath,
  filmTitle,
  movieId,
  voteAverage,
) {
  const card = document.createElement('li');
  card.classList.add('film');
  card.setAttribute('data-id', movieId);

  const image = document.createElement('img');
  image.setAttribute('src', 'https://image.tmdb.org/t/p/' + 'w500' + imgPath);
  image.setAttribute('alt', filmTitle);

  const title = document.createElement('p');
  title.classList.add('myFilmLibraryPage__film-title');
  title.textContent = filmTitle;
  const rating = document.createElement('div');
  rating.classList.add('myFilmLibraryPage__rating');
  rating.textContent = voteAverage;
  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(rating);
  return card;
};

const drawWatchedFilmList = function () {
  favouriteButton.classList.remove('button__white');
  favouriteButton.classList.add('button__colored');
  queueButton.classList.remove('button__colored');
  queueButton.classList.add('button__white');

  const fragment = document.createDocumentFragment();

  if (localStorage.getItem('filmsWatched') === null) {
    const fragment = document.createDocumentFragment();
    const emptyStorage = document.createElement('h2');
    emptyStorage.classList.add('storage__empty');
    emptyStorage.textContent = 'You do not have favourite movies. Add them.';

    fragment.append(emptyStorage);
    films.innerHTML = '';
    films.append(fragment);
    return;
  }

  const favouriteMovies = JSON.parse(localStorage.getItem('filmsWatched'));

  if (favouriteMovies.length === 0) {
    const fragment = document.createDocumentFragment();

    const emptyStorage = document.createElement('h2');
    emptyStorage.classList.add('storage__empty');
    emptyStorage.textContent = 'You do not have favourite movies. Add them.';
    fragment.append(emptyStorage);
    films.innerHTML = '';
    films.append(fragment);
    return;
  }

  favouriteMovies.forEach(el =>
    fragment.append(
      createLibraryCardFunc(
        el.backdrop_path,
        el.original_title,
        el.id,
        el.vote_average,
      ),
    ),
  );
  films.setAttribute('data-name', 'favourites');
  films.innerHTML = '';
  films.append(fragment);
  films.addEventListener('click', activeDetailsPageListener);
};

const drawQueueFilmList = function () {
  queueButton.classList.remove('button__white');
  queueButton.classList.add('button__colored');
  favouriteButton.classList.remove('button__colored');
  favouriteButton.classList.add('button__white');

  const fragment = document.createDocumentFragment();

  if (localStorage.getItem('filmsQueue') === null) {
    const fragment = document.createDocumentFragment();

    const emptyStorage = document.createElement('h2');
    emptyStorage.classList.add('storage__empty');
    emptyStorage.textContent =
      'You do not have to queue movies to watch. Add them.';

    fragment.append(emptyStorage);
    films.innerHTML = '';
    films.append(fragment);
    return;
  }

  const queueMovies = JSON.parse(localStorage.getItem('filmsQueue'));

  if (queueMovies.length === 0) {
    const fragment = document.createDocumentFragment();

    const emptyStorage = document.createElement('h2');
    emptyStorage.classList.add('storage__empty');
    emptyStorage.textContent =
      'You do not have to queue movies to watch. Add them.';
    fragment.append(emptyStorage);
    films.innerHTML = '';
    films.append(fragment);
    return;
  }

  queueMovies.forEach(el =>
    fragment.append(
      createLibraryCardFunc(
        el.backdrop_path,
        el.original_title,
        el.id,
        el.vote_average,
      ),
    ),
  );
  films.setAttribute('data-name', 'queue');
  films.innerHTML = '';
  films.append(fragment);
  films.addEventListener('click', activeDetailsPageListener);
};

favouriteButton.addEventListener('click', drawWatchedFilmList);
queueButton.addEventListener('click', drawQueueFilmList);

/******************************************************** */

// const footLink = document.querySelector('.footer__link');
// const ul = document.querySelector('.filmList');
// const homePage = document.querySelector('.home-page');
// const buttons = document.querySelector('.button_page');
// const search = document.querySelector('.search');

// function footLinkHandle() {
//   ul.classList.add('new__class');
//   const contacts = document.createElement('li');
//   contacts.classList.add('contacts');

//   const person1 = document.createElement('div');
//   const a1 = document.createElement('a');
//   a1.setAttribute('href', 'https://github.com/HardRye');
//   a1.textContent = 'https://github.com/HardRye';
//   person1.classList.add('contacts__info');
//   person1.textContent = 'Nikolay Mykhailenko';
//   // contacts.appendChild(a1);
//   // console.log(a1);

//   const person2 = document.createElement('div');
//   const a2 = document.createElement('a');
//   a2.setAttribute('href', 'https://github.com/annakholod');
//   a2.textContent = 'https://github.com/annakholod';
//   person2.classList.add('contacts__info');
//   person2.textContent = 'Anna Kholod';

//   const person3 = document.createElement('div');
//   const a3 = document.createElement('a');
//   a3.setAttribute('href', 'https://github.com/kostyash23');
//   a3.textContent = 'https://github.com/kostyash23';
//   person3.classList.add('contacts__info');
//   person3.textContent = 'Kostya Shmotoloha';

//   const person4 = document.createElement('div');
//   const a4 = document.createElement('a');
//   a4.setAttribute('href', 'https://github.com/AlexxxxK');
//   a4.textContent = 'https://github.com/AlexxxxK';
//   person4.classList.add('contacts__info');
//   person4.textContent = 'Alexandr Kozyr';

//   const person5 = document.createElement('div');
//   const a5 = document.createElement('a');
//   a5.setAttribute('href', 'https://github.com/maximusII');
//   a5.textContent = 'https://github.com/maximusII';
//   person5.classList.add('contacts__info');
//   person5.textContent = 'Maksym Osadchuk';

//   const person6 = document.createElement('div');
//   person6.classList.add('contacts__info--last');

//   contacts.appendChild(person1);
//   contacts.appendChild(a1);
//   contacts.appendChild(person2);
//   contacts.appendChild(a2);
//   contacts.appendChild(person3);
//   contacts.appendChild(a3);
//   contacts.appendChild(person4);
//   contacts.appendChild(a4);
//   contacts.appendChild(person5);
//   contacts.appendChild(a5);
//   contacts.appendChild(person6);

//   homePage.removeChild(buttons);
//   homePage.removeChild(search);

//   ul.innerHTML = '';
//   ul.appendChild(contacts);
// }

// footLink.addEventListener('click', footLinkHandle);
