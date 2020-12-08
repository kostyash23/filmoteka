"use strict"; // - это первый файл не забываем про ‘use strict’ (далее никто его не пишет в своих js файлах);

var URL_POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key=9675092798f3a490a8c4d8f2cf77169b&language=en-US&page=';
var URL_GENRES = 'https://api.themoviedb.org/3/genre/movie/list?api_key=9675092798f3a490a8c4d8f2cf77169b&language=en-US'; // - выбираем из DOM наш список;

var filmList = document.querySelector('.filmList');
filmList.setAttribute('data-name', 'home'); // - создаем глобальные переменные renderFilms и genres, pageNumber 
// (будет использоваться в запросе при плагинации); 

var renderFilms;
var genres;
var pageNumber;

var createCardFunc = function createCardFunc(imgPath, filmTitle, movieId) {
  // - создаем функцию createCardFunc, она принимает параметрами imgPath, filmTitle, movieId создает li согласно макета, вешает на нее слушателем функцию activeDetailsPage c параметрами movieId и флагом false так как фильм из библиотеки (смотри пункт “3)” создание activeDetailsPage);
  var filmListItem = document.createElement('li');
  filmListItem.classList.add('filmList__item');
  filmListItem.setAttribute('data-id', movieId);
  var filmListPoster = document.createElement('img');
  filmListPoster.classList.add('filmList__poster');
  filmListPoster.setAttribute('alt', filmTitle);
  filmListPoster.setAttribute('src', 'https://image.tmdb.org/t/p/' + 'w500' + imgPath);
  filmListItem.append(filmListPoster);
  var filmListTitle = document.createElement('p');
  filmListTitle.classList.add('item__name');
  filmListTitle.textContent = filmTitle;
  filmListItem.append(filmListTitle);
  return filmListItem;
};

var fetchPopularMoviesList = function fetchPopularMoviesList() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  // - создаем функцию fetchPopularMoviesList (должна в запросе в виде переменной использовать pageNumber) в которой используется createCardFunc результат используя fragment кладем в ul, и не забываем заполнить этими же данными переменную renderFilms (она понадобится в работе следующим участникам); 
  fetch("".concat(URL_POPULAR + page)).then(function (responce) {
    return responce.json();
  }).then(function (data) {
    renderFilms = data.results;
    var fragment = document.createDocumentFragment();
    renderFilms.forEach(function (el) {
      var imagePath = el.backdrop_path;
      var title = el.original_title;
      var year = el.release_date.substr(0, 4) ? "(".concat(el.release_date.substr(0, 4), ")") : "";
      var filmId = el.id;
      fragment.append(createCardFunc(imagePath, "".concat(title, " ").concat(year), filmId));
    });
    filmList.innerHTML = "";
    filmList.append(fragment);
    filmList.addEventListener('click', activeDetailsPageListener);
  })["catch"](function (error) {
    var fragment = document.createDocumentFragment();
    var filmListErrorTitle = document.createElement('h2');
    filmListErrorTitle.classList.add('filmList__error');
    filmListErrorTitle.textContent = "Oops, something went wrong";
    fragment.append(filmListErrorTitle);
    var filmListErrorText = document.createElement('h3');
    filmListErrorText.classList.add('filmList__error');
    filmListErrorText.textContent = "Please, try again later";
    fragment.append(filmListErrorText);
    var filmListErrorReason = document.createElement('p');
    filmListErrorReason.classList.add('filmList__error');
    filmListErrorReason.textContent = error;
    fragment.append(filmListErrorReason);
    filmList.innerHTML = "";
    filmList.append(fragment);
  });
};

var fetchGenres = function fetchGenres() {
  // - создаем функцию fetchGenres которая забирает 
  // жанры и кладет их в переменную genres (она понадобится 
  // в работе следующим участникам); 
  fetch(URL_GENRES).then(function (responce) {
    return responce.json();
  }).then(function (data) {
    genres = data.genres;
  })["catch"](console.log);
}; // - запускаем функцию fetchPopularMoviesList и fetchGenres. 


fetchPopularMoviesList(); // функция должна(?) принимать значение pageNum 

fetchGenres();
"use strict";

var inputValue = document.querySelector('.search-form__input').value;
var input = document.querySelector('.search-form__input');
var form = document.querySelector('.search-form');
var btnPrev = document.querySelector('.page_prev');
var btnNext = document.querySelector('.page_next');
var btnPageNumber = document.querySelector('.number_page');
var containerBtn = document.querySelector('.button_page');
pageNumber = 1;
var findFilms = [];
btnPageNumber.innerText = pageNumber;

if (pageNumber === 1) {
  btnPrev.classList.add('disable');
}

function fetchFilms() {
  fetch("https://api.themoviedb.org/3/search/movie?api_key=9e008f5d338cd1f22f432e50e537417d&language=en-US&query=".concat(inputValue, "&page=").concat(pageNumber, "&include_adult=false")).then(function (response) {
    return response.json();
  }).then(function (data) {
    findFilms = data.results; //    console.log(findFilms);

    if (!data.results.length) {
      var warning = document.createElement('p');
      warning.classList.add('warning');
      warning.textContent = 'Enter correct query!!!';
      document.querySelector('.search').insertBefore(warning, document.querySelector('.filmList'));
      setTimeout(function () {
        warning.remove();
      }, 2000);
    } else {
      document.querySelector('.filmList').innerHTML = '';
      data.results.map(function (el) {
        var moviePath = "".concat(el.backdrop_path);
        var movieYear = el.release_date ? "(".concat(el.release_date.substr(0, 4), ")") : "";
        var movieTitle = "".concat(el.title, " ").concat(movieYear);
        var movieId = el.id;
        btnPageNumber.classList.add('active');
        btnNext.classList.add('active');
        document.querySelector('.filmList').appendChild(createCardFunc(moviePath, movieTitle, movieId));
      });
    }
  })["catch"](function (err) {
    // alert('Sorry, we could not find film by your query')
    var fragment = document.createDocumentFragment();
    var filmListErrorTitle = document.createElement('h2');
    filmListErrorTitle.classList.add('filmList__error');
    filmListErrorTitle.textContent = "Oops, something went wrong";
    fragment.append(filmListErrorTitle);
    var filmListErrorText = document.createElement('h3');
    filmListErrorText.classList.add('filmList__error');
    filmListErrorText.textContent = "We could not find movie";
    fragment.append(filmListErrorText);
    var filmListErrorReason = document.createElement('p');
    filmListErrorReason.classList.add('filmList__error');
    filmListErrorReason.textContent = 'Try again';
    fragment.append(filmListErrorReason);
    btnPrev.classList.add('disable');
    btnPageNumber.classList.add('disable');
    btnNext.classList.add('disable');
    filmList.innerHTML = "";
    filmList.append(fragment);
    console.log(err);
  });
}

function searchFilms(e) {
  e.preventDefault();
  inputValue = input.value;
  pageNumber = 1;
  btnPageNumber.innerText = pageNumber;
  btnPrev.classList.remove('active');
  btnPrev.classList.add('disable');
  fetchFilms();
  e.target.reset();
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function plaginationNavigation(e) {
  if (e.target.classList.contains('page_prev')) {
    if (pageNumber > 1) {
      scrollToTop();
      btnPageNumber.innerText--;
      pageNumber--;

      if (inputValue) {
        fetchFilms();
      } else fetchPopularMoviesList(pageNumber);

      if (pageNumber === 1) {
        btnPrev.classList.remove('active');
        btnPrev.classList.add('disable');
      }
    }
  }

  if (e.target.classList.contains('page_next')) {
    scrollToTop();
    btnPrev.classList.add('active');
    btnPageNumber.innerText++;
    pageNumber++;

    if (inputValue) {
      fetchFilms();
    } else fetchPopularMoviesList(pageNumber);
  }
}

form.addEventListener('submit', searchFilms);
containerBtn.addEventListener('click', plaginationNavigation);
"use strict";

var btnHome = document.querySelector('.header__link--home');
var btnLibrary = document.querySelector('.header__link--library');
var sectionMain = document.querySelector('.home-page');
var sectionCard = document.querySelector('.film-card');
var sectionTeam = document.querySelector('.myTeam');
var sectionLibrary = document.querySelector('main > .myFilmLibraryPage__container');
var btnFavourites = document.querySelector('.myFilmLibraryPage__buttonFavourites');
var btnQueue = document.querySelector('.myFilmLibraryPage__buttonQueue');
var btnAddToFavourite = document.querySelector('.card-details__AddToFavourite');
var btnRemoveFromFavourite = document.querySelector('.card-details__RemoveFromFavourite');
var btnAddToQueue = document.querySelector('.card-details__AddToQueue');
var btnRemoveFromQueue = document.querySelector('.card-details__RemoveFromQueue');
var headerNav = document.querySelector('.header__nav');
var headerLogo = document.querySelector('.header__logo');
var footLink = document.querySelector('.footer__link');
var selectFilm;

function activeHomePage() {
  sectionTeam.classList.add('non-active-section');
  sectionCard.classList.add('non-active-section');
  sectionLibrary.classList.add('non-active-section');
  sectionMain.classList.remove('non-active-section'); // actionBtnsForm.removeEventListener(toggleToQueue);
  // actionBtnsForm.removeEventListener(toggleToWatched);
  // favouriteButton.removeEventListener(drawWatchedFilmList);
  // queueButton.removeEventListener(drawQueueFilmList);
}

function activeTeamPage() {
  sectionTeam.classList.remove('non-active-section');
  sectionCard.classList.add('non-active-section');
  sectionLibrary.classList.add('non-active-section');
  sectionMain.classList.add('non-active-section'); // actionBtnsForm.removeEventListener(toggleToQueue);
  // actionBtnsForm.removeEventListener(toggleToWatched);
  // favouriteButton.removeEventListener(drawWatchedFilmList);
  // queueButton.removeEventListener(drawQueueFilmList);
}

function activeLibraryPage() {
  sectionTeam.classList.add('non-active-section');
  sectionCard.classList.add('non-active-section');
  sectionMain.classList.add('non-active-section');
  sectionLibrary.classList.remove('non-active-section');
  drawWatchedFilmList(); // form.removeEventListener(searchFilms)
  // containerBtn.removeEventListener(plaginationNavigation);
  // actionBtnsForm.removeEventListener(toggleToQueue);
  // actionBtnsForm.removeEventListener(toggleToWatched);
}

function activeDetailsPageListener(e) {
  sectionCard.classList.remove('non-active-section');
  sectionMain.classList.add('non-active-section');
  sectionLibrary.classList.add('non-active-section');
  sectionTeam.classList.add('non-active-section'); // form.removeEventListener(searchFilms)
  // containerBtn.removeEventListener(plaginationNavigation);
  // favouriteButton.removeEventListener(drawWatchedFilmList);
  // queueButton.removeEventListener(drawQueueFilmList);

  if (e.currentTarget.dataset.name === 'home') {
    activeDetailsPage(e.target.dataset.id, false);
  } else if (e.currentTarget.dataset.name === 'favourites' || e.currentTarget.dataset.name === 'queue') {
    activeDetailsPage(e.target.dataset.id, true);
  }
}

function activeDetailsPage(movieId, itsLibraryFilm) {
  var filmsFromLocalWatchedArr;
  var filmsFromLocalQueueArr;

  if (itsLibraryFilm) {
    try {
      var filmsFromLocalWatched = localStorage.getItem('filmsWatched');

      if (filmsFromLocalWatched) {
        filmsFromLocalWatchedArr = JSON.parse(filmsFromLocalWatched);
        selectFilm = filmsFromLocalWatchedArr.find(function (item) {
          return item.id === Number(movieId);
        });
      }
    } catch (err) {
      console.error(err);
    }

    if (!selectFilm) {
      try {
        var filmsFromLocalQueue = localStorage.getItem('filmsQueue');

        if (filmsFromLocalQueue) {
          filmsFromLocalQueueArr = JSON.parse(filmsFromLocalQueue);
          selectFilm = filmsFromLocalQueueArr.find(function (item) {
            return item.id === Number(movieId);
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  } else {
    selectFilm = renderFilms.find(function (item) {
      return item.id === Number(movieId);
    });

    if (!selectFilm) {
      selectFilm = findFilms.find(function (item) {
        return item.id === Number(movieId);
      });
    }
  }

  showDetails(selectFilm);
}

function chooseActiveLink(evt) {
  evt.preventDefault();

  if (evt.target.classList.contains('header__link')) {
    var currentActiveItem = headerNav.querySelector('.header__link--active');

    if (currentActiveItem) {
      currentActiveItem.classList.remove('header__link--active');
    }

    evt.target.classList.add('header__link--active');
  }
}

activeHomePage();
btnHome.addEventListener('click', activeHomePage);
headerLogo.addEventListener('click', activeHomePage);
btnLibrary.addEventListener('click', activeLibraryPage);
headerNav.addEventListener('click', chooseActiveLink);
footLink.addEventListener('click', footLinkHandle);
"use strict";

var btnFix = document.querySelector('.button-fix');
var detailsCard = document.querySelector('.card-details');
var actionBtnsForm = document.querySelector('.card-details__actions');
var posterImg = detailsCard.querySelector('.card-details__img');
var cardDetailsTitle = detailsCard.querySelector('.card-details__title');
var cardDetailsVotes = detailsCard.querySelector('.card-details__votes--value');
var cardDetailsPopularity = detailsCard.querySelector('.card-details__popularity--value');
var cardDetailsName = detailsCard.querySelector('.card-details__name--value');
var cardDetailsGenre = detailsCard.querySelector('.card-details__genre--value');
var cardDetailsAbout = detailsCard.querySelector('.card-details__about--text');
var addToFavBtn = actionBtnsForm.querySelector("button[data-action='add-to-favorite']");
var delFromFavBtn = actionBtnsForm.querySelector("button[data-action='delete-from-favorite']");
var addToQueueBtn = actionBtnsForm.querySelector("button[data-action='add-to-queue']");
var delFromQueueBtn = actionBtnsForm.querySelector("button[data-action='delete-from-queue']");
var filmsQueue, filmsWatched;

try {
  if (localStorage.getItem('filmsQueue')) {
    filmsQueue = JSON.parse(localStorage.getItem('filmsQueue'));
  } else {
    filmsQueue = [];
  }
} catch (error) {
  throw error;
}

try {
  if (localStorage.getItem('filmsWatched')) {
    filmsWatched = JSON.parse(localStorage.getItem('filmsWatched'));
  } else {
    filmsWatched = [];
  }
} catch (error) {
  throw error;
}

var toggleBtn = function toggleBtn(btnToShow, btnToHide) {
  btnToShow.classList.remove('hide');
  btnToShow.classList.add('show');
  btnToHide.classList.remove('show');
  btnToHide.classList.add('hide');
};

var monitorButtonStatusText = function monitorButtonStatusText() {
  if (filmsQueue && filmsQueue.find(function (film) {
    return film.id === selectFilm.id;
  })) {
    toggleBtn(delFromQueueBtn, addToQueueBtn);
  } else {
    toggleBtn(addToQueueBtn, delFromQueueBtn);
  }

  if (filmsWatched && filmsWatched.find(function (film) {
    return film.id === selectFilm.id;
  })) {
    toggleBtn(delFromFavBtn, addToFavBtn);
  } else {
    toggleBtn(addToFavBtn, delFromFavBtn);
  }
};

var toggleToQueue = function toggleToQueue(_ref) {
  var target = _ref.target;
  if (target.parentNode.dataset.action !== 'add-to-queue' && target.parentNode.dataset.action !== 'delete-from-queue') return;
  if (!filmsQueue) filmsQueue = [];

  if (filmsQueue.find(function (film) {
    return film.id === selectFilm.id;
  })) {
    filmsQueue = filmsQueue.filter(function (film) {
      return film.id !== selectFilm.id;
    }); // console.log(filmsQueue);
  } else {
    filmsQueue.push(selectFilm);
  }

  try {
    if (filmsQueue.length) {
      localStorage.setItem('filmsQueue', JSON.stringify(filmsQueue));
    } else {
      localStorage.removeItem('filmsQueue');
    }
  } catch (error) {
    throw error;
  }

  monitorButtonStatusText();
};

var toggleToWatched = function toggleToWatched(_ref2) {
  var target = _ref2.target;
  if (target.parentNode.dataset.action !== 'add-to-favorite' && target.parentNode.dataset.action !== 'delete-from-favorite') return;
  if (!filmsWatched) filmsWatched = [];

  if (filmsWatched.find(function (film) {
    return film.id === selectFilm.id;
  })) {
    filmsWatched = filmsWatched.filter(function (film) {
      return film.id !== selectFilm.id;
    }); // console.log(filmsWatched);
  } else {
    filmsWatched.push(selectFilm);
  }

  try {
    if (filmsWatched.length) {
      localStorage.setItem('filmsWatched', JSON.stringify(filmsWatched));
    } else {
      localStorage.removeItem('filmsWatched');
    }
  } catch (error) {
    throw error;
  }

  monitorButtonStatusText();
};

var showDetails = function showDetails(selectFilm) {
  document.body.scrollTop = 0; // For Safari

  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

  detailsCard.dataset.id = selectFilm.id;
  posterImg.src = "https://image.tmdb.org/t/p/w500".concat(selectFilm.poster_path);
  posterImg.alt = selectFilm.original_title;
  cardDetailsTitle.textContent = selectFilm.original_title;
  cardDetailsVotes.textContent = "".concat(selectFilm.vote_average, " / ").concat(selectFilm.vote_count);
  cardDetailsPopularity.textContent = selectFilm.popularity;
  cardDetailsName.textContent = selectFilm.original_title;
  var genreIds = selectFilm.genre_ids.map(function (genreId) {
    return genreId;
  });
  var filmGenres = genres.filter(function (e) {
    return genreIds.includes(e.id);
  }).map(function (e) {
    return e.name;
  });
  cardDetailsGenre.textContent = filmGenres.join(', ');
  cardDetailsAbout.textContent = selectFilm.overview;
  monitorButtonStatusText();
};

actionBtnsForm.addEventListener('click', toggleToQueue);
actionBtnsForm.addEventListener('click', toggleToWatched);

window.onscroll = function () {
  if (document.documentElement.scrollTop > 40) {
    btnFix.style.display = 'block';
  } else {
    btnFix.style.display = 'none';
  }
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

btnFix.addEventListener('click', scrollToTop);
"use strict";

var films = document.querySelector('.myFilmLibraryPage__film-card');
var favouriteButton = document.querySelector('.myFilmLibraryPage__buttonFavourites');
var queueButton = document.querySelector('.myFilmLibraryPage__buttonQueue');

var createLibraryCardFunc = function createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage) {
  var card = document.createElement('li');
  card.classList.add('film');
  card.setAttribute('data-id', movieId);
  var image = document.createElement('img');
  image.setAttribute('src', 'https://image.tmdb.org/t/p/' + 'w500' + imgPath);
  image.setAttribute('alt', filmTitle);
  var title = document.createElement('p');
  title.classList.add('myFilmLibraryPage__film-title');
  title.textContent = filmTitle;
  var rating = document.createElement('div');
  rating.classList.add('myFilmLibraryPage__rating');
  rating.textContent = voteAverage;
  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(rating);
  return card;
};

var drawWatchedFilmList = function drawWatchedFilmList() {
  favouriteButton.classList.remove('button__white');
  favouriteButton.classList.add('button__colored');
  queueButton.classList.remove('button__colored');
  queueButton.classList.add('button__white');
  var fragment = document.createDocumentFragment();

  if (localStorage.getItem('filmsWatched') === null) {
    var _fragment = document.createDocumentFragment();

    var emptyStorage = document.createElement('h2');
    emptyStorage.classList.add('storage__empty');
    emptyStorage.textContent = 'You do not have favourite movies. Add them.';

    _fragment.append(emptyStorage);

    films.innerHTML = '';
    films.append(_fragment);
    return;
  }

  var favouriteMovies = JSON.parse(localStorage.getItem('filmsWatched'));

  if (favouriteMovies.length === 0) {
    var _fragment2 = document.createDocumentFragment();

    var _emptyStorage = document.createElement('h2');

    _emptyStorage.classList.add('storage__empty');

    _emptyStorage.textContent = 'You do not have favourite movies. Add them.';

    _fragment2.append(_emptyStorage);

    films.innerHTML = '';
    films.append(_fragment2);
    return;
  }

  favouriteMovies.forEach(function (el) {
    return fragment.append(createLibraryCardFunc(el.backdrop_path, el.original_title, el.id, el.vote_average));
  });
  films.setAttribute('data-name', 'favourites');
  films.innerHTML = '';
  films.append(fragment);
  films.addEventListener('click', activeDetailsPageListener);
};

var drawQueueFilmList = function drawQueueFilmList() {
  queueButton.classList.remove('button__white');
  queueButton.classList.add('button__colored');
  favouriteButton.classList.remove('button__colored');
  favouriteButton.classList.add('button__white');
  var fragment = document.createDocumentFragment();

  if (localStorage.getItem('filmsQueue') === null) {
    var _fragment3 = document.createDocumentFragment();

    var emptyStorage = document.createElement('h2');
    emptyStorage.classList.add('storage__empty');
    emptyStorage.textContent = 'You do not have to queue movies to watch. Add them.';

    _fragment3.append(emptyStorage);

    films.innerHTML = '';
    films.append(_fragment3);
    return;
  }

  var queueMovies = JSON.parse(localStorage.getItem('filmsQueue'));

  if (queueMovies.length === 0) {
    var _fragment4 = document.createDocumentFragment();

    var _emptyStorage2 = document.createElement('h2');

    _emptyStorage2.classList.add('storage__empty');

    _emptyStorage2.textContent = 'You do not have to queue movies to watch. Add them.';

    _fragment4.append(_emptyStorage2);

    films.innerHTML = '';
    films.append(_fragment4);
    return;
  }

  queueMovies.forEach(function (el) {
    return fragment.append(createLibraryCardFunc(el.backdrop_path, el.original_title, el.id, el.vote_average));
  });
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
"use strict";

var myTeam = document.querySelector('.myTeam');
var OUR_TEAM = [{
  name: 'Nikolay Mykhailenko',
  gitHubLink: 'https://www.github.com/HardRye',
  facebookLink: 'https://www.facebook.com/profile.php?id=100014592882557',
  linkedInLink: 'https://www.linkedin.com/in/nikolay-m'
}, {
  name: 'Anna Kholod',
  gitHubLink: 'https://www.github.com/annakholod',
  facebookLink: 'https://www.facebook.com/profile.php?id=100023500111911',
  linkedInLink: 'https://www.linkedin.com/in/anna-kholod-b8930578/'
}, {
  name: 'Kostya Shmotoloha',
  gitHubLink: 'https://www.github.com/kostyash23',
  facebookLink: 'https://www.facebook.com/kostia.shmotoloha',
  linkedInLink: 'https://www.linkedin.com/in/kostiash/'
}, {
  name: 'Alexandr Kozyr',
  gitHubLink: 'https://www.github.com/AlexxxxK',
  facebookLink: '#',
  linkedInLink: 'https://www.linkedin.com/in/oleksandr-kozyr/'
}, {
  name: 'Maksym Osadchuk',
  gitHubLink: 'https://www.github.com/maximusII',
  facebookLink: 'https://www.facebook.com/maxym.osadchuk',
  linkedInLink: 'https://www.linkedin.com/in/maksym-osadchuk-869a80123/'
}];

function footLinkHandle() {
  activeTeamPage();
  var fragment = document.createDocumentFragment();
  var teamWrapper = document.createElement('ul');
  teamWrapper.classList.add('new__class', 'contacts');
  OUR_TEAM.forEach(function (member) {
    var personWrapper = document.createElement('li');
    personWrapper.classList.add('person');
    var personName = document.createElement('p');
    personName.classList.add('person__name');
    personName.textContent = member.name;
    var personSocials = document.createElement('div');
    personSocials.classList.add('person__socials');
    var gitHubLink = document.createElement('a');
    gitHubLink.classList.add('person__socials-icon', 'person__socials-icon--github');
    gitHubLink.setAttribute('href', member.gitHubLink);
    gitHubLink.setAttribute('target', '_blank');
    var fbLink = document.createElement('a');
    fbLink.classList.add('person__socials-icon', 'person__socials-icon--facebook');
    fbLink.setAttribute('href', member.facebookLink);
    fbLink.setAttribute('target', '_blank');
    var linkedInLink = document.createElement('a');
    linkedInLink.classList.add('person__socials-icon', 'person__socials-icon--linkedin');
    linkedInLink.setAttribute('href', member.linkedInLink);
    linkedInLink.setAttribute('target', '_blank');
    personSocials.append(gitHubLink, fbLink, linkedInLink);
    personWrapper.append(personName, personSocials);
    fragment.append(personWrapper);
  });
  teamWrapper.append(fragment);
  myTeam.innerHTML = '';
  myTeam.appendChild(teamWrapper);
} // footLink.addEventListener('click', footLinkHandle);