# MTG Collection

This is an application designed to allow users to view registered players, their card collections and any upcoming tournaments they are registered. You can also search a vast database of cards by name and / or rarity as well as add, view, edit or delete upcoming tournaments.

## Installation

Clone this repository and save it to your local environment. Navigate to the server directory and run the following command to install the back end dependencies:

```
pipenv install
```

Next, navigate to the client directory and run the following command to install the front end dependencies:

```
npm install
```

# Running the Program

## Database

The database comes seeded with all MTG cards as well as test data in all other tables.

## Server

While in the server directory run ```pipenv shell``` followed by ```python app.py``` 

## React App

Navigate to the client directory and run ```npm start```

## Usage

Navigate through the app using the nav bar. 

The Players page displays all currently registered players with links to view more information for each player.

Clicking this link will render the player details page where you can view the tournaments they are currently registered in as well as their collection of cards.

The Cards page displays a form used for searching the database for cards. You may search for cards by name and / or rarity. The search results are paginated at 24 cards per page. 

The Tournaments page displays all currently listed tournaments. There is a button to add a tournament that will expose the corresponding form. 

For each tournament listed there are three actions you may take: delete, edit and register. Delete will delete that tournament from the database and the page. Edit will expose a form to edit the tournament's information. Register will expose a form with a select component to choose which player you would like to register to that tournament. 

# Acknowledgments

* Maureen Dempsey for her constant support and belief in me
* Eric Gaspar for his advice and support