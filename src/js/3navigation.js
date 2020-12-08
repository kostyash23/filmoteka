const btnHome = document.querySelector('.header__link--home');
const btnLibrary = document.querySelector('.header__link--library');
const sectionMain = document.querySelector('.home-page');
const sectionCard = document.querySelector('.film-card');
const sectionTeam = document.querySelector('.myTeam');
const sectionLibrary = document.querySelector('main > .myFilmLibraryPage__container');
const btnFavourites = document.querySelector('.myFilmLibraryPage__buttonFavourites');
const btnQueue = document.querySelector('.myFilmLibraryPage__buttonQueue');
const btnAddToFavourite = document.querySelector('.card-details__AddToFavourite');
const btnRemoveFromFavourite = document.querySelector('.card-details__RemoveFromFavourite');
const btnAddToQueue = document.querySelector('.card-details__AddToQueue');
const btnRemoveFromQueue = document.querySelector('.card-details__RemoveFromQueue');
const headerNav = document.querySelector('.header__nav');
const headerLogo = document.querySelector('.header__logo');
const footLink = document.querySelector('.footer__link');

let selectFilm;

function activeHomePage() {
  sectionTeam.classList.add('non-active-section');
  sectionCard.classList.add('non-active-section');
  sectionLibrary.classList.add('non-active-section');
  sectionMain.classList.remove('non-active-section');

  // actionBtnsForm.removeEventListener(toggleToQueue);
  // actionBtnsForm.removeEventListener(toggleToWatched);
  // favouriteButton.removeEventListener(drawWatchedFilmList);
  // queueButton.removeEventListener(drawQueueFilmList);
}

function activeTeamPage() {
  sectionTeam.classList.remove('non-active-section');
  sectionCard.classList.add('non-active-section');
  sectionLibrary.classList.add('non-active-section');
  sectionMain.classList.add('non-active-section');

  // actionBtnsForm.removeEventListener(toggleToQueue);
  // actionBtnsForm.removeEventListener(toggleToWatched);
  // favouriteButton.removeEventListener(drawWatchedFilmList);
  // queueButton.removeEventListener(drawQueueFilmList);
}

function activeLibraryPage() {
  sectionTeam.classList.add('non-active-section');
  sectionCard.classList.add('non-active-section');
  sectionMain.classList.add('non-active-section');
  sectionLibrary.classList.remove('non-active-section');
  drawWatchedFilmList();
  // form.removeEventListener(searchFilms)
  // containerBtn.removeEventListener(plaginationNavigation);
  // actionBtnsForm.removeEventListener(toggleToQueue);
  // actionBtnsForm.removeEventListener(toggleToWatched);
}

function activeDetailsPageListener(e) {
  sectionCard.classList.remove('non-active-section');
  sectionMain.classList.add('non-active-section');
  sectionLibrary.classList.add('non-active-section');
  sectionTeam.classList.add('non-active-section');

  // form.removeEventListener(searchFilms)
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
  let filmsFromLocalWatchedArr;
  let filmsFromLocalQueueArr;

  if (itsLibraryFilm) {
    try {
      const filmsFromLocalWatched = localStorage.getItem('filmsWatched');
      if (filmsFromLocalWatched) {
        filmsFromLocalWatchedArr = JSON.parse(filmsFromLocalWatched);
        selectFilm = filmsFromLocalWatchedArr.find(item => item.id === Number(movieId));
      }
    } catch (err) {
      console.error(err);
    }

    if (!selectFilm) {
      try {
        const filmsFromLocalQueue = localStorage.getItem('filmsQueue');
        if (filmsFromLocalQueue) {
          filmsFromLocalQueueArr = JSON.parse(filmsFromLocalQueue);
          selectFilm = filmsFromLocalQueueArr.find(item => item.id === Number(movieId));
        }
      } catch (err) {
        console.error(err);
      }
    }

  } else {
    selectFilm = renderFilms.find(item => item.id === Number(movieId));
    if (!selectFilm) {
      selectFilm = findFilms.find(item => item.id === Number(movieId));
    }
  }
  showDetails(selectFilm);
}

function chooseActiveLink(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains('header__link')) {
    const currentActiveItem = headerNav.querySelector('.header__link--active');
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