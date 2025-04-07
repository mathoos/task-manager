# 🗂️ Task Manager – Application de gestion de projets

Task Manager est une application de gestion de projets intuitive permettant de créer, modifier, dupliquer, déplacer et supprimer des tâches.
Les tâches sont organisées par catégories (Design, Frontend, Backend & Testing).

Grâce à une interface claire, vous pouvez suivre l’évolution des tâches en les déplaçant de catégorie en fonction de leur avancement.
  
  
## 🚀 Fonctionnalités

✅ Créer un projet  
✅ Supprimer un projet  
✅ Visualiser toutes les tâches d'un projet  
✅ Créer une tâche   
✅ Modifier une tâche   
✅ Dupliquer une tâche   
✅ Supprimer une tâche   
✅ Définir une tâche comme étant terminée  
✅ Déplacer une tâche d'une catégorie à une autre   
✅ Afficher le nombre de total de tâches créées  
✅ Afficher le nombre total de tâches terminées  
✅ Afficher les tâches du jour  
  
  
## 🎯 Utilisation 

### 📁 Gérer un projet

1️⃣ Pour créer un projet, cliquer sur le gros bouton **+**.  

📌Un projet avec un titre aléatoire est généré dans la liste de **Tous les projets**.

2️⃣ Cliquer sur le bouton **supprimer** pour effacer un projet.    
3️⃣ Cliquer sur le bouton **voir** pour accéder à la page du projet.

### 📝 Créer une tâche

1️⃣ Rendez-vous sur la page d’un projet.  
2️⃣ Cliquer sur le bouton **Ajouter une note** dans la catégorie souhaitée (Design, Frontend, Backend ou Testing).  
3️⃣ Remplir tous les champs (Titre, Description Tag, Date et Equipe).  
4️⃣ Cliquer sur le bouton **Valider**. 

📌 La tâche s’affiche dans la catégorie correspondante. 

### ⚙️ Gérer une tâche

1️⃣ Cliquer sur une tâche pour l'afficher dans une lightbox.  
2️⃣ Pour supprimer une tâche, cliquer sur le bouton **Supprimer**.  
3️⃣ Pour dupliquer une tâche, cliquer sur le bouton **Dupliquer**.   
4️⃣ Pour modifier une tâche, cliquer sur le bouton **Modifier** et éditer les champs nécessaires.  
5️⃣ Pour indiquer une tâche comme étant terminée, cliquer sur la **checkbox**.  
6️⃣ Pour fermer une tâche, cliquer sur la **❌** en haut à droite.  
7️⃣ Pour déplacer une tâche, cliquer sur la tâche et utiliser le système de **glisser-déposer** (drag & drop) entre les colonnes.

### 📅 Afficher les tâches par date
1️⃣ Sur la d’accueil, utiliser le **calendrier** à droite.  
2️⃣ Cliquer sur une date pour voir toutes les tâches prévues ce jour-là.

📌 Les tâches sont regroupées par projet, avec leur titre affiché.
   

## 🛠️ Technologies utilisées

- ⚛️ **React** – Librairie JavaScript pour construire l’interface  
- 🗓️ **React Calendar** – Sélecteur de date intégré dans le dashboard  
- 📦 **Redux Toolkit** – Gestion d’état centralisée simplifiée  
- 🎨 **SCSS** – Styling modulaire et maintenable  
- 💾 **localStorage** – Sauvegarde des projets/tâches côté client
  

## Installation 

### 📋 Prérequis

- Node.js (version >=16.0.0)    
- npm ou yarn 

### 💻 Commandes utiles

    npm install  
    npm start 
    npm test
    npm run build   
    npm run eject 