
/*======================================*/
/*  ---------- Création HTML ----------*/
/*======================================*/

/* variables globales */
// valeur par défaut du nombre de lignes de la grille :
let gridSize = 8;

/* la grille */
function generateArea() {
	const gridArea = document.getElementById('invader');
	// 1re boucle qui va générer les div row
	for (let i = 0; i < gridSize; i++) {
		// créer l'élément div :
		const row = document.createElement('div');
		// ajouter une classe row :
		row.classList.add('row');
		// une fois la ligne créée, créer les div pixel dans chaque ligne row :
		for (let i = 0; i < gridSize; i++) {
			const pixel = document.createElement('div');
			pixel.setAttribute('class', 'pixel');
			//  ci dessus on peut écrire pixel.classList.add('pixel');
			// ajouter les pixel dans la ligne en cours de création :
			row.appendChild(pixel); /* : correspond à l'étape 2 = trouver l'element à écouter */
			// à mon pixel, je lui ajoute l'écouteur d'event(etape 3) :
			pixel.addEventListener('click', handlePixelClick);
		}
		// ajouter la ligne comme enfant de div invader
		gridArea.appendChild(row);
	}
}

/* le formulaire */
function fillForm() {
	// on récupère la class du formulaire :
	const form = document.querySelector('.configuration');

	// *les INPUTS ----
	// on crée et ajoute les input :
	const inputElement = document.createElement('input');
	// pour ajouter les attributs :
	inputElement.setAttribute('type', 'number');
	inputElement.setAttribute('id', 'grid-size');
	inputElement.setAttribute('placeholder', 'Taille de la grille');
	// on les ajoute ensuite dans le DOM :
	form.appendChild(inputElement);

	// * LE BOUTON ----
	const buttonElement = document.createElement('button');
	// pour ajouter les attributs :
	buttonElement.type = 'submit';
	buttonElement.textContent = 'Valider';
	// on les ajoute ensuite dans le DOM :
	form.appendChild(buttonElement);

	// écouteur de l'évenement (de l'étape 2 : form et 3) :
	form.addEventListener('submit', handleSubmit);
}

/* reset de la grille (invader) au moment du submit */
function clearGridArea() {
	const gridArea = document.getElementById('invader');
	gridArea.innerHTML = '';
	/*// 2e option, on récupère toutes les lignes  : 
	const allRows = document.querySelectorAll('.row');
	for(let i=1 ; i<allRows.lengtj ; i++){
		allRows[i].remove();
	} */
}

/*======================================*/
/*  ------- Gérer les evenements--------*/
/*======================================*/
//! étape1 : creer la fonction qui sert d'écouteur (handle...)
//! étape2: je trouve l'élément sur lequel brancher l'écouteur
//! étape3: je branche l'élément grâce à addEventListener et je lui spécifie l'event

//* au click (pour changer la couleur et l'enlever)
// (étape 1 : créer la fonction sur le pixel)
function handlePixelClick(event) {
	/*  console.log(event): donne toutes les infos concernant l'objet event */
	// on récupère l'élément  sur lequel a lieu l'event grâce à event.target :
	const pixel = event.target;
	/* 1re version (mettre du css dans le js / pas bonne pratique) = pixel.style.backgroundColor = 'black'; */
	/* 2e version, à rajouter une classe en css :
	puis = si on a la couleur, il faut l'enveler et vice versa : 
	if (pixel.classList.contains('pixel--plain')) {
		pixel.classList.remove('pixel--plain');
	} else {
		pixel.classList.add('pixel--plain');
	} */
	/*3e version : le toggle*/
	pixel.classList.toggle('pixel--plain');
	console.log(pixel);
}

//* dans le formulaire,
// fonction de l'écouteur sur le submit (étape 1) :
// ! Attention, l'écouteur ne se met pas sur le bouton submit mais sur le formulaire lui-même !
function handleSubmit(event) {
	// stoppe le comportement par défaut du formulaire :
	event.preventDefault();
	// l'index 0 correspond à #grid-size :
	const gridInput = event.target[0];
	// met à jour la taille de la grille. :
	// ! l'input sort en string
	// donc on utiliser Number : 
	gridSize = Number(gridInput.value) ;

	//* génération d'une nouvelle grille avec la nouvelle donnée récupéré ci-dessus :
	// si la grille est différent de zéro s.
	if(gridSize){
		clearGridArea();
		generateArea();
	}
}

/*======================================*/
/* éxecution des fonctions au lancement-*/
/*======================================*/

fillForm();
generateArea();
