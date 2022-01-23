/*JS*/
let winP = document.getElementById("winP");
let winC = document.getElementById("winC");
let btnV = document.getElementById("btnV");
let pseudo = document.getElementById("pseudo");
let pseudonyme = document.getElementById("pseud");
let pioche = document.getElementById("pioche");

//Audio

const music = new Audio("https://github.com/Rigoki/Battle/blob/main/audio/hono-no-megami.mp3");
music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
document.getElementById("music").addEventListener('click', () => {
        if (document.getElementById("music").checked) {
            music.play();
        } else {
            music.pause();
            music.currentTime = 0;
        }
    })
    //Récupérer le pseudonyme du joueur
btnV.addEventListener('click', () => {
        pseudonyme.innerHTML = pseudo.value;
        btnV.style.display = "none";
        pseudo.style.display = "none";
        pioche.style.visibility = "visible";
    })
    // Création de l'objet cartes
class Card {
    constructor(nom, puissance, score, couleur, cardName) {
        this.nom = nom;
        this.puissance = puissance;
        this.score = score;
        this.couleur = couleur; // Couleur =  Trefle / Pique / Coeur / Carreau
        this.cardName = cardName;
    }
}

nom = new Array("Sept", "Huit", "Neuf", "Dix", "Valet", "Dame", "Roi", "As");
couleur = new Array("Trefle", "Pique", "Coeur", "Carreau");
puissance = new Array(7, 8, 9, 10, 11, 12, 13, 14);
score = new Array(1, 2, 3, 4, 5, 6, 7, 8);
// Creéation du deck


function newPackage(array) {
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 8; i++) {
            let cardName = nom[i] + couleur[j];
            let carte = new Card(nom[i], puissance[i], score[i], couleur[j], cardName);
            array.push(carte);
        }

    }
}
//Declaration des 3 decks necessaire (Le complet et celui des joueurs)
let cardDeck = new Array();
let deckP = new Array();
let deckC = new Array();
//Chargement d'un deck automatiquement à l'ouverture de la page
window.onload = newPackage(cardDeck)

// Fonction pour mélanger les cartes avec utilisation de deux variables aléatoires pour mélanger 2 par 2 500 fois.
function shuffleCard(e) {
    for (let i = 0; i < 500; i++) {
        let c1 = Math.floor(Math.random() * e.length);
        let c2 = Math.floor(Math.random() * e.length);
        temp = e[c1];
        e[c1] = e[c2];
        e[c2] = temp;
    }
}


function distribution(e, array1, array2) {
    //On récupère la moitié des cartes du deck (cardDeck.length / 2) et on les ajoute une par une dans le tableau deckP (.push)
    for (let i = 0; i < e.length / 2; i++) {
        array1.push(e[i])
    }
    for (let i = e.length / 2; i < e.length; i++) {
        array2.push(e[i])
    }
}
let carteC = document.getElementById("carteC")
let carteP = document.getElementById("carteP")
let piocheClick = document.getElementById("piocheClick")
piocheClick.addEventListener("click", playCard)
    //Les variables globales nécessaires pour la fonction playcard
let defausseC = new Array();
let defausseP = new Array();
let defausseB = new Array();
let bataille = false;
let scoreC = 0;
let scoreP = 0;
let BscoreP = 0;
let BscoreC = 0;
//La fonction du jeu
function playCard() {
    document.getElementById("instruct").style.visibility = "hidden"
    let cardPnb = deckP.length + defausseP.length;
    let cardCnb = deckC.length + defausseC.length;
    document.getElementById("cardsP").innerHTML = cardPnb;
    document.getElementById("cardsC").innerHTML = cardCnb;
    // Si le nombre de carte d'un joueur est à 0, alors il a perdu
    if (cardPnb == 0) {
        document.getElementById("modP").style.display = "block";
        //Le trophé s'affiche uniquement à côté du joueur ayant gagné la partie précédente.
        winC.style.visibility = "visible";
        winP.style.visibility = "hidden";
        //Reset du score joueur en cas de défaite désolé  seul les plus méritant entre au tableau ! ;)
        scoreP = 0;
        scoreC = 0;
    }
    if (cardCnb == 0) {
        document.getElementById("modV").style.display = "block";
        winP.style.visibility = "visible";
        winC.style.visibility = "hidden";
        //Ajoute le score actuelle au tableau si nécessaire.
        checkScore();
    }
    //Si le nombre de carte dans la pioche est de 0, on récupère celles qui sont dans la défausse.
    if (deckC.length == 0) {
        for (let i of defausseC) {
            deckC.push(i);
        }
        defausseC.length = 0;
        shuffleCard(deckC);
    }
    if (deckP.length == 0) {
        for (let i of defausseP) {
            deckP.push(i);
        }
        defausseP.length = 0;
        shuffleCard(deckP);

    }
    if (bataille == false) {
        //affichage des images au click
        let compCard = deckC.shift();
        carteC.innerHTML = '<img src="img/' + compCard.cardName + '.png" class="rounded"  alt="" ></img>';
        let playerCard = deckP.shift();
        carteP.innerHTML = '<img src="img/' + playerCard.cardName + '.png" class="rounded" alt="" ></img>';
        //Calcule des puissance + score
        if (compCard.puissance > playerCard.puissance) {
            defausseC.push(playerCard, compCard);
            //Afficher la défausseB pour l'ordinateur
            document.getElementById("batailleC").innerHTML = " ";
            for (let i = 0; i < defausseB.length; i++) {
                document.getElementById("batailleC").insertAdjacentHTML(position = "afterbegin", text = '<img src="img/' + defausseB[i].cardName + '.png"  alt=""></img>');
            } //Pour que la main gagnante puisse récupérer la défausse
            for (let i of defausseB) {
                defausseC.push(i);
            }
            //Pour vider la défausse si elle est pleine
            if (defausseB.length > 0) {
                defausseB.length = 0;
            }
            // Le calcule du score est simple, on ajoute la valeur de la carte gagnée et celles des cartes gagnée en cas de bataille. Puis on remet le score bataille à 0
            scoreC += playerCard.score;
            scoreC += BscoreC
            BscoreC = 0;
            document.getElementById("scoreC").innerHTML = scoreC;

        } else if (compCard.puissance < playerCard.puissance) {
            defausseP.push(playerCard, compCard);
            //Afficher la défausseB pour le joueur
            document.getElementById("batailleP").innerHTML = " ";
            for (let i = 0; i < defausseB.length; i++) {
                document.getElementById("batailleP").insertAdjacentHTML(position = "afterbegin", text = '<img src="img/' + defausseB[i].cardName + '.png"  alt=""></img>');
            } // Push de la défausse
            for (let i of defausseB) {
                defausseP.push(i);
            }
            //Pour vider la défausse si elle est pleine
            if (defausseB.length > 0) {
                defausseB.length = 0;
            }
            // Le calcule du score est simple, on ajoute la valeur de la carte gagnée et celles des cartes gagnée en cas de bataille. Puis on remet le score bataille à 0
            scoreP += compCard.score
            scoreP += BscoreP;
            BscoreP = 0;
            document.getElementById("scoreP").innerHTML = scoreP;
        }
        if (compCard.puissance == playerCard.puissance) {
            defausseB.push(playerCard, compCard);
            bataille = true;
        }
    } else {
        //On défausse les cartes dans une défausse spéciale bataille que le joueur gagnant emporte.
        let compCardB = deckC.shift();
        let playerCardB = deckP.shift();
        defausseB.push(playerCardB, compCardB);
        carteC.innerHTML = '<img src="img/backcartebleuegrandebatrect.png" class="img-thumbnail rounded"  alt="" ></img>'
        carteP.innerHTML = '<img src="img/backcartegrandebatrect.png"  class="img-thumbnail rounded" alt="" ></img>'
        bataille = false;
        //Un score par joueur pour ne pas compter ses propres cartes.
        BscoreC += playerCardB.score;
        BscoreP += compCardB.score;
    }
}
/*Bouton "recommencer"*/
function fermer() {
    location.reload();
}
/*Bouton Fermer*/
function recommencer() {
    //Réinitialisation de tout sauf du score
    document.getElementById("instruct").style.visibility = "visible";
    document.getElementById("modV").style.display = "none";
    document.getElementById("modP").style.display = "none";
    cardDeck.length = 0;
    defausseB.length = 0;
    defausseC.length = 0;
    defausseP.length = 0;
    deckP.length = 0;
    deckC.length = 0;
    document.getElementById("cardsP").innerHTML = 16;
    document.getElementById("cardsC").innerHTML = 16;
    carteC.innerHTML = " "
    carteP.innerHTML = " "
        //Recréation d'un paquet de carte.
    newPackage(cardDeck);
    shuffleCard(cardDeck);
    distribution(cardDeck, deckP, deckC);
}

/*High score*/
document.getElementById("scorebtn").addEventListener('click', () => {
    if (document.getElementById("scorebtn").checked) {
        document.getElementById("hscore").style.display = "block";
    } else { document.getElementById("hscore").style.display = "none"; }
});

const hiscores = JSON.parse(localStorage.getItem('hiscores')) || [];
const scoreList = document.querySelector('.scoretable');
//Fonction pour remplir le tableau de score.
function populateTable() {
    scoreList.innerHTML = hiscores.map((row) => {
        return `<tr><td>${row.clicker}</td><td>${row.scoreP}</tr>`;
    }).join('');
}
//Fonction qui vérifie le score à chaque début et fin de partie et ne conserve que les 3 meilleurs.
function checkScore() {
    let worstScore = 0;
    //Permet de comparer avec l'avant dernière entrée du tableau
    if (hiscores.length > 2) {
        worstScore = hiscores[hiscores.length - 1].scoreP;
    }
    //Si le score actuelle est meilleurs que le pire score, il est ajouté au tableau.
    if (scoreP > worstScore) {
        const clicker = pseudo.value;
        hiscores.push({ scoreP, clicker });
    }
    //Permet de trier le tableau en fonction des scores pour que le premier soit toujours en tête de tableau.
    hiscores.sort((a, b) => a.scoreP > b.scoreP ? -1 : 1);
    //Permet de conserver 3 scores et supprime automatiquement le 4eme.
    if (hiscores.length > 3) {
        hiscores.pop();
    }
    populateTable();
    localStorage.setItem('hiscores', JSON.stringify(hiscores));
}

function clearScores() {
    hiscores.splice(0, hiscores.length);
    localStorage.setItem('hiscores', JSON.stringify(hiscores));
    populateTable();
}

// Fonctions aux lancement de la page
checkScore()
shuffleCard(cardDeck);
distribution(cardDeck, deckP, deckC);
