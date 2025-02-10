# Application de gestion de projets

https://task-manager-journal.onrender.com/

L'application ne possède pas encore de version mobile.

## Description

Task Manager est une application de gestion de projets qui permet à l'utilisateur de créer, modifier, dupliquer ou supprimer des tâches.
Ces tâches peuvent être rangées par catégories : Design, Frontend, Backend ou Testing. 
En fonction de l'avancée d'une tâche, celle-ci peut être déplacée de catégorie en catégorie.  

## Fonctionnalités

### - Créer une note
### - Modifier une note
### - Dupliquer une note
### - Supprimer une note
### - Déplacer une note
### - Afficher une vue détaillée d'une note

## Utilisation

### 1. Créer un projet
Sur la page d'accueil, cliquer sur le bouton "Créer un projet" ; cela va créer un projet avec un titre aléatoire. 
Cliquer sur le nom du projet afin d'être dirigé vers la page /dashboard  de ce projet.

### 2. Créer une note
Une fois sur la page /dashboard du projet sélectionné, cliquer sur le bouton "Ajouter une note" dasn la catégorie souhaitée.
Ajouter un titre, une description, un tag, une date et les personnes de l'équipes impliquées dans la tâche. 
Cliquer sur "Valider". 
La note est incrémentée dans la catégorie associée.
Seuls le titre, la date, l'équipe et le tag sont visibles. 

### 3. Visualiser une note
Pour visualiser en détail la note créée, cliquer sur celle-ci afin qu'elle s'ouvre dans une lightbox.
Toutes les informations sont regroupées dans cette note. 

### 4. Intéragir avec une note
Une fois la note ouverte, il est possible de la dupliquer, de la modifier ou de la supprimer en cliquant sur les boutons associés.
Il est possible de déplacer la note de catégorie en catégorie. 

## Pistes d'amélioration

### - Possibilité d'ajouter des images ou fichiers dans les notes.
### - Possibilité de marquer quand une tâche a été effectuée. 
### - Créer une page avec les tâches archivées. 

## Installation

Projet lancé avec Create React App.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.