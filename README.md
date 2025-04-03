# **Wordle**

The Wordle Clone is a recreation of the popular New York Times Wordle game. This web application allows users to guess a 5-letter word and receive feedback in the form of color-coded clues (green, yellow, grey) to guide their guesses. Built with a FastAPI Python backend and a React.js frontend, this game offers an engaging and fun experience for players.

![React.js Badge](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI Badge](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python Badge](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![OpenAI Badge](https://img.shields.io/badge/OpenAI-000000?style=for-the-badge&logo=openai&logoColor=white)

## Features

- **5-Letter Word Guessing**: Players try to guess a 5-letter word, receiving feedback after each guess.
- **Color-Coded Feedback**: Feedback is provided using green (correct letter and position), yellow (correct letter but wrong position), and grey (incorrect letter) colors for each guessed letter.
- **Game Reset**: Players can start a new game and guess a new word by resetting the game via the FastAPI backend.
- **OpenAI Integration**: FastAPI backend makes a GET request to the OpenAI API to randomly select a 5-letter word for the game.

## Technology Stack

- **Frontend**: React.js
- **Backend**: FastAPI (Python)
- **API**: OpenAI (for random word selection)
- **Styling**: Custom CSS (for color feedback)

## How it Works

1. **FastAPI Backend**: The FastAPI backend has an HTTP GET route that calls the OpenAI API to select a random 5-letter word for the game.
2. **React.js Frontend**: The frontend is built using React.js, displaying the player’s guesses and providing feedback using color-coding (green, yellow, grey) based on whether the guess matches the word.
3. **Game Reset**: Once the game ends, players can reset the game and get a new word from the FastAPI route to start fresh.

## How to Play

1. Enter a 5-letter word guess.
2. View feedback for each letter in your guess:
   - Green: Correct letter in the correct position.
   - Yellow: Correct letter in the wrong position.
   - Grey: Incorrect letter.
3. Keep guessing until you find the word or run out of attempts.
4. Start a new game anytime by pressing the reset button.
