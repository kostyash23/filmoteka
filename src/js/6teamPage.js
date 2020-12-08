const myTeam = document.querySelector('.myTeam');

const OUR_TEAM = [
  {
    name: 'Nikolay Mykhailenko',
    gitHubLink: 'https://www.github.com/HardRye',
    facebookLink: 'https://www.facebook.com/profile.php?id=100014592882557',
    linkedInLink: 'https://www.linkedin.com/in/nikolay-m',
  },
  {
    name: 'Anna Kholod',
    gitHubLink: 'https://www.github.com/annakholod',
    facebookLink: 'https://www.facebook.com/profile.php?id=100023500111911',
    linkedInLink: 'https://www.linkedin.com/in/anna-kholod-b8930578/',
  },
  {
    name: 'Kostya Shmotoloha',
    gitHubLink: 'https://www.github.com/kostyash23',
    facebookLink: 'https://www.facebook.com/kostia.shmotoloha',
    linkedInLink: 'https://www.linkedin.com/in/kostiash/',
  },
  {
    name: 'Alexandr Kozyr',
    gitHubLink: 'https://www.github.com/AlexxxxK',
    facebookLink: '#',
    linkedInLink: 'https://www.linkedin.com/in/oleksandr-kozyr/',
  },
  {
    name: 'Maksym Osadchuk',
    gitHubLink: 'https://www.github.com/maximusII',
    facebookLink: 'https://www.facebook.com/maxym.osadchuk',
    linkedInLink: 'https://www.linkedin.com/in/maksym-osadchuk-869a80123/',
  },
];

function footLinkHandle() {
  activeTeamPage();

  const fragment = document.createDocumentFragment();

  const teamWrapper = document.createElement('ul');
  teamWrapper.classList.add('new__class', 'contacts');

  OUR_TEAM.forEach(member => {
    const personWrapper = document.createElement('li');
    personWrapper.classList.add('person');

    const personName = document.createElement('p');
    personName.classList.add('person__name');
    personName.textContent = member.name;

    const personSocials = document.createElement('div');
    personSocials.classList.add('person__socials');

    const gitHubLink = document.createElement('a');
    gitHubLink.classList.add(
      'person__socials-icon',
      'person__socials-icon--github',
    );
    gitHubLink.setAttribute('href', member.gitHubLink);
    gitHubLink.setAttribute('target', '_blank');

    const fbLink = document.createElement('a');
    fbLink.classList.add(
      'person__socials-icon',
      'person__socials-icon--facebook',
    );
    fbLink.setAttribute('href', member.facebookLink);
    fbLink.setAttribute('target', '_blank');

    const linkedInLink = document.createElement('a');
    linkedInLink.classList.add(
      'person__socials-icon',
      'person__socials-icon--linkedin',
    );
    linkedInLink.setAttribute('href', member.linkedInLink);
    linkedInLink.setAttribute('target', '_blank');

    personSocials.append(gitHubLink, fbLink, linkedInLink);
    personWrapper.append(personName, personSocials);

    fragment.append(personWrapper);
  });

  teamWrapper.append(fragment);

  myTeam.innerHTML = '';
  myTeam.appendChild(teamWrapper);
}

// footLink.addEventListener('click', footLinkHandle);
