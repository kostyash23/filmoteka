const btnFix = document.querySelector('.button-fix');
const detailsCard = document.querySelector('.card-details');
const actionBtnsForm = document.querySelector('.card-details__actions');
const posterImg = detailsCard.querySelector('.card-details__img');
const cardDetailsTitle = detailsCard.querySelector('.card-details__title');
const cardDetailsVotes = detailsCard.querySelector(
  '.card-details__votes--value',
);
const cardDetailsPopularity = detailsCard.querySelector(
  '.card-details__popularity--value',
);
const cardDetailsName = detailsCard.querySelector('.card-details__name--value');
const cardDetailsGenre = detailsCard.querySelector(
  '.card-details__genre--value',
);
const cardDetailsAbout = detailsCard.querySelector(
  '.card-details__about--text',
);
const addToFavBtn = actionBtnsForm.querySelector(
  "button[data-action='add-to-favorite']",
);
const delFromFavBtn = actionBtnsForm.querySelector(
  "button[data-action='delete-from-favorite']",
);
const addToQueueBtn = actionBtnsForm.querySelector(
  "button[data-action='add-to-queue']",
);
const delFromQueueBtn = actionBtnsForm.querySelector(
  "button[data-action='delete-from-queue']",
);
let filmsQueue, filmsWatched;

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

const toggleBtn = (btnToShow, btnToHide) => {
  btnToShow.classList.remove('hide');
  btnToShow.classList.add('show');
  btnToHide.classList.remove('show');
  btnToHide.classList.add('hide');
};

const monitorButtonStatusText = () => {
  if (filmsQueue && filmsQueue.find(film => film.id === selectFilm.id)) {
    toggleBtn(delFromQueueBtn, addToQueueBtn);
  } else {
    toggleBtn(addToQueueBtn, delFromQueueBtn);
  }

  if (filmsWatched && filmsWatched.find(film => film.id === selectFilm.id)) {
    toggleBtn(delFromFavBtn, addToFavBtn);
  } else {
    toggleBtn(addToFavBtn, delFromFavBtn);
  }
};

const toggleToQueue = ({ target }) => {
  if (
    target.parentNode.dataset.action !== 'add-to-queue' &&
    target.parentNode.dataset.action !== 'delete-from-queue'
  )
    return;
  if (!filmsQueue) filmsQueue = [];

  if (filmsQueue.find(film => film.id === selectFilm.id)) {
    filmsQueue = filmsQueue.filter(film => film.id !== selectFilm.id);
    // console.log(filmsQueue);
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

const toggleToWatched = ({ target }) => {
  if (
    target.parentNode.dataset.action !== 'add-to-favorite' &&
    target.parentNode.dataset.action !== 'delete-from-favorite'
  )
    return;
  if (!filmsWatched) filmsWatched = [];

  if (filmsWatched.find(film => film.id === selectFilm.id)) {
    filmsWatched = filmsWatched.filter(film => film.id !== selectFilm.id);
    // console.log(filmsWatched);
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

const showDetails = selectFilm => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  detailsCard.dataset.id = selectFilm.id;
  posterImg.src = `https://image.tmdb.org/t/p/w500${selectFilm.poster_path}`;
  posterImg.alt = selectFilm.original_title;
  cardDetailsTitle.textContent = selectFilm.original_title;
  cardDetailsVotes.textContent = `${selectFilm.vote_average} / ${selectFilm.vote_count}`;
  cardDetailsPopularity.textContent = selectFilm.popularity;
  cardDetailsName.textContent = selectFilm.original_title;
  let genreIds = selectFilm.genre_ids.map(genreId => genreId);
  let filmGenres = genres
    .filter(e => {
      return genreIds.includes(e.id);
    })
    .map(e => e.name);
  cardDetailsGenre.textContent = filmGenres.join(', ');
  cardDetailsAbout.textContent = selectFilm.overview;

  monitorButtonStatusText();
};

actionBtnsForm.addEventListener('click', toggleToQueue);
actionBtnsForm.addEventListener('click', toggleToWatched);

window.onscroll = function() {
  if (document.documentElement.scrollTop > 40) {
    btnFix.style.display = 'block';
  } else {
    btnFix.style.display = 'none';
  }
};
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

btnFix.addEventListener('click', scrollToTop);
