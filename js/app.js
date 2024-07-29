/* Création d'un objet géant appelé MODULE*/
const app = {
	// valeur par défaut du nombre de lignes de la grille :
	gridSize: 8,
	pixelSize: 20,
	styles: ['plain', 'empty', 'light', 'highlight'],
	styleSelected: 'empty',

	init: function () {
		console.log(app.gridSize);
		// execution des fonctions au lancement
		app.fillForm();
		app.generateArea();
		app.generatePalette();
	},

	/* la grille */
	generateArea: function () {
		const gridArea = document.getElementById('invader');
		// 1re boucle qui va générer les div row
		for (let i = 0; i < app.gridSize; i++) {
			// créer l'élément div :
			const row = document.createElement('div');
			// ajouter une classe row :
			row.classList.add('row');
			// une fois la ligne créée, créer les div pixel dans chaque ligne row :
			for (let i = 0; i < app.gridSize; i++) {
				const pixel = document.createElement('div');
				pixel.setAttribute('class', 'pixel');
				//  ci dessus on peut écrire pixel.classList.add('pixel');
				pixel.style.width = app.pixelSize + 'px';
				pixel.style.height = app.pixelSize + 'px';
				// ajouter les pixel dans la ligne en cours de création :
				row.appendChild(pixel); /* : correspond à l'étape 2 = trouver l'element à écouter */
				// à mon pixel, je lui ajoute l'écouteur d'event(etape 3) :
				pixel.addEventListener('click', app.handlePixelClick);
			}
			// ajouter la ligne comme enfant de div invader
			gridArea.appendChild(row);
		}
	},
	//* au click (pour changer la couleur et l'enlever)
	// (étape 1 : créer la fonction sur le pixel)
	handlePixelClick: function (event) {
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
		/* pixel.classList.toggle('pixel--light'); */
		

		// pour cliquer sur la palette de couleur :
		for(const style of app.styles){
			pixel.classList.remove('pixel--' + style);
		}
		pixel.classList.add('pixel--' + app.styleSelected);
	},

	/* le formulaire */
	fillForm: function () {
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

		const inputPixel = document.createElement('input');
		inputPixel.setAttribute('type', 'number');
		inputPixel.setAttribute('id', 'pixel-size');
		inputPixel.setAttribute('placeholder', 'Taille du pixel');
		form.appendChild(inputPixel);

		// * LE BOUTON ----
		const buttonElement = document.createElement('button');
		// pour ajouter les attributs :
		buttonElement.type = 'submit';
		buttonElement.textContent = 'Valider';
		// on les ajoute ensuite dans le DOM :
		form.appendChild(buttonElement);

		// écouteur de l'évenement (de l'étape 2 : form et 3) :
		form.addEventListener('submit', app.handleSubmit);
	},

	//* dans le formulaire,
	// fonction de l'écouteur sur le submit (étape 1) :
	// ! Attention, l'écouteur ne se met pas sur le bouton submit mais sur le formulaire lui-même !
	handleSubmit: function (event) {
		// stoppe le comportement par défaut du formulaire :
		event.preventDefault();
		/* console.dir(event.target); */
		// l'index 0 correspond à #grid-size :
		const gridInput = event.target[0];
		// met à jour la taille de la grille. :
		// ! l'input sort en string
		// donc on utiliser Number :
		app.gridSize = Number(gridInput.value);

		// pour le 2e input :
		const pixelInput = event.target[1];
		app.pixelSize = Number(pixelInput.value);

		//* génération d'une nouvelle grille avec la nouvelle donnée récupéré ci-dessus :
		// si la grille est différent de zéro s.
		if (app.gridSize) {
			app.clearGridArea();
			app.generateArea();
		} else {
			alert('tu dois saisir un nombre');
		}
	},

	/* reset de la grille (invader) au moment du submit */
	clearGridArea: function () {
		const gridArea = document.getElementById('invader');
		gridArea.innerHTML = '';
		/*// 2e option, on récupère toutes les lignes  : 
	const allRows = document.querySelectorAll('.row');
	for(let i=1 ; i<allRows.lengtj ; i++){
		allRows[i].remove();
	} */
	},

	/* création de la palette de couleurs */
	generatePalette: function () {
		// création de la div .palette en 3/4 étapes
		const paletteElement = document.createElement('div');
		paletteElement.classList.add('palette');
		const body = document.querySelector('body');
		// boucler sur les 4 styles  avec for..of / mais on n'a pas accès à l'index avec of :
		for (const style of app.styles) {
			const paletteButton = document.createElement('button');
			paletteButton.classList.add('palette-color');
			paletteButton.classList.add('palette--' + style);

			//* dataset permet de pouvoir lier une donnée à un element html en lui créant une "data-qqch". Ici on nomme qqhch=color :
			paletteButton.dataset.color = style;

			// si c'est le style selectionné : mis en avant avec une forme particulière :
			if (style === app.styleSelected) {
				paletteButton.classList.add('palette-color--active');
			}
			paletteElement.appendChild(paletteButton);
			paletteButton.addEventListener('click', app.handleColorPicker);
		}

		// autre méthode avec forEach (pour un tableau)
		/* app.styles.forEach((style, index) => {
			console.log(`index ${index}, et sa valeur ${style}`);
		}); */

		// 3e méthode avec for..in / récupère l'index / utilisable pour boucler sur un objet :
		/* for (const index in app.styles) {
			console.log(app.styles[index]);
		} */

		body.appendChild(paletteElement);
	},

	handleColorPicker: function(event){
		/* console.log(event.target); */
		const buttonClicked = event.target;
		const colorPicked = buttonClicked.dataset.color;
		console.log(colorPicked);
		app.styleSelected = colorPicked;
	},
};

//* on utilise un event sur document pour lancer app.init quand tout le DOM est chargé : (ça nous permet aussi de mettre la balise script dans le head)
document.addEventListener('DOMContentLoaded', app.init);
