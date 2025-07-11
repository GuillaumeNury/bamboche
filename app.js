const notNowSentences = [
  "Va voir Guillaume, il a un tour de magie pour toi !",
  "Tu as goûté du cointro ? C'est délicieux !",
  "As-tu déjà entendu parler de l'opalescence du Cointro ? Non ? Va voir Guillaume !",
  "Guillaume a un truc incroyable à te montrer !",
  "Tu sais que le Cointro est l'ingrédient secret de la magie ? Va voir Guillaume !",
  "Guillaume a un tour de magie qui va te surprendre !",
  "Tu as dit au revoir à tous le monde ? Tu ne vas pas partir comme ça ?!",
  "Allez un dernier tour de magie avant de partir !",
  "Allez, un dernier verre avant de partir !",
  "Dans 20 minutes, il va se passer un truc de dingue ! Tu ne peux pas louper ça !",
  "Attends ! On lance juste une partie de Waloo et après tu peux partir !",
];

// Gestion responsive du nombre d'étoiles
function getStarCount() {
  const width = window.innerWidth;
  if (width <= 480) return 100;
  if (width <= 768) return 150;
  return 200;
}

// Génération d'étoiles adaptative
function createStars() {
  const starsContainer = document.getElementById('stars');
  starsContainer.innerHTML = ''; // Nettoie les étoiles existantes
  const starCount = getStarCount();
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 2 + 's';
    starsContainer.appendChild(star);
  }
}

// Initialisation
createStars();

let leaveCount = 5;
let remainingSentences = [...notNowSentences];

function letMeLeave() {
  setState('leaving');
  const randomIndex = Math.floor(Math.random() * remainingSentences.length);
  const sentence = remainingSentences[randomIndex];
  remainingSentences.splice(randomIndex, 1); // Retire la phrase utilisée
  document.querySelector('.mod-leave').textContent = `Je veux ${Array(6 - leaveCount).fill('vraiment').join(' ')} partir !`;

  leaveCount--;
  if (leaveCount <= 0) {
    document.querySelector('.party-text').innerHTML = "Ok, tu peux partir... mais reviens vite !";
    leaveCount = 5; // Réinitialise le compteur
    remainingSentences = [...notNowSentences]; // Réinitialise les phrases restantes
    document.querySelector('.mod-leave').textContent = `Au revoir !`;
  } else {
    document.querySelector('.party-text').innerHTML = sentence;
  }
}

function letsParty() {
  setState('default');
  document.querySelector('.party-text').innerHTML = "Super ! Viens sur le channel #bamboche11juillet25 :)";
}

function okIStay() {
  setState('staying');
  remainingSentences = [...notNowSentences]; // Réinitialise les phrases restantes
  leaveCount = 5; // Réinitialise le compteur
  document.querySelector('.party-text').innerHTML = "C'est reparti ! 🎉";
    document.querySelector('.mod-leave').textContent = `Je veux partir !`;
}

const states = ['default', 'leaving', 'staying'];

function setState(newState) {
  for (const state of states) {
      document.querySelector('.container').classList.remove(`state-${state}`);
  }
  document.querySelector('.container').classList.add(`state-${newState}`);
}
