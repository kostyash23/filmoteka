let inputValue = document.querySelector('.search-form__input').value;
const input = document.querySelector('.search-form__input');
const form = document.querySelector('.search-form');
const btnPrev = document.querySelector('.page_prev');
const btnNext = document.querySelector('.page_next');
const btnPageNumber = document.querySelector('.number_page');
const containerBtn = document.querySelector('.button_page');

pageNumber = 1;
let findFilms = [];
btnPageNumber.innerText = pageNumber;

if (pageNumber === 1) {
  btnPrev.classList.add('disable')
}


function fetchFilms() {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=9e008f5d338cd1f22f432e50e537417d&language=en-US&query=${inputValue}&page=${pageNumber}&include_adult=false`)
    .then(response => response.json())
    .then(data => {
      findFilms = data.results;
      //    console.log(findFilms);
      if (!data.results.length) {
        const warning = document.createElement('p');
        warning.classList.add('warning');
        warning.textContent = 'Enter correct query!!!';

        document.querySelector('.search').insertBefore(warning, document.querySelector('.filmList'));

        setTimeout(() => {
          warning.remove();
        }, 2000);
      } else {
        document.querySelector('.filmList').innerHTML = '';


        data.results.map(el => {
          const moviePath = `${el.backdrop_path}`;
          const movieYear = el.release_date ? `(${el.release_date.substr(0, 4)})` : "";
          const movieTitle = `${el.title} ${movieYear}`;
          const movieId = el.id;

          btnPageNumber.classList.add('active')
          btnNext.classList.add('active')
          document.querySelector('.filmList').appendChild(createCardFunc(moviePath, movieTitle, movieId));
        });
      }
    })
    .catch(err => {
      // alert('Sorry, we could not find film by your query')
      const fragment = document.createDocumentFragment();

      const filmListErrorTitle = document.createElement('h2');
      filmListErrorTitle.classList.add('filmList__error');
      filmListErrorTitle.textContent = "Oops, something went wrong";
      fragment.append(filmListErrorTitle);

      const filmListErrorText = document.createElement('h3');
      filmListErrorText.classList.add('filmList__error');
      filmListErrorText.textContent = "We could not find movie";
      fragment.append(filmListErrorText);

      const filmListErrorReason = document.createElement('p');
      filmListErrorReason.classList.add('filmList__error');
      filmListErrorReason.textContent = 'Try again';
      fragment.append(filmListErrorReason);

      btnPrev.classList.add('disable')
      btnPageNumber.classList.add('disable')
      btnNext.classList.add('disable')

      filmList.innerHTML = "";
      filmList.append(fragment);

      console.log(err);
    })
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
    behavior: 'smooth',
  });
}

function plaginationNavigation(e) {

  if (e.target.classList.contains('page_prev')) {
    if (pageNumber > 1) {
      scrollToTop()
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
    scrollToTop()
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
