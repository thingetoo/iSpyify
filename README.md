# iSpyify: A Game to Test Your Album Knowledge

<p>
    <img src="https://i.ibb.co/Wz77R47/Screen-Shot-2021-05-29-at-7-54-50-PM.png" alt="Set and Forget Screen Shot"/>
</p>

## About The Project

iSpyfiy is a game that utilizes the Spotify API to test how well you know your album covers.

Type in your favorite artist and observe the blured image on the screen. Can you guess which album it is? Well we'll make it easy for you. Select from the four choices below based on the color of the blur and the type of music your artist performs. If you guess the correct image, you'll get 1 point. Is it too easy? In the top right, try the medium and hard option and see how well you do. For each medium answer correct, you will get 4 points and for each hard answer correct, you'll get 9 points!

Functionalities:

- A search bar that will allow you to search by artist
- Multiple choice answers. When you click the right one, you get your points
- Your score will persist when you logout

This project was inspired by the other great projects built using the Spotify API.

### Built With

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Node to access NPM

### Installation

#### Registering your application with Spotify

1. Follow the [Web API tutorial](https://developer.spotify.com/documentation/web-api/quick-start/) to obtain a client ID and client secret
2. In your terminal type "touch .env" in the root directory of your project
3. Put your obtained client ID and client secret in your .env file like such:

- CLIENT_ID = your-client-id
- CLIENT_SECRET = your-client-secret

#### Make a Mongo Cluster and DB

1. [Create a cluster](https://codeforgeek.com/mongodb-atlas-node-js/) on Mongo Atlas
2. Obtain your Mongo URI link
3. Paste your Mongo URI into your .env file in this format:
   ISPYIFY_DB_URI=your-unique-mongo-uri-for-your-cluster

#### Setup authentication with firebase

1. Create firebase account and create a new project
2. In project settings select config and copy your app config
3. Create config.js and paste your firebase config
4. gitignore config.js
5. In firebase under sign-in methods, choose Google Authentication
6. Export config from config.js and import config into files using Auth.

#### Install the dependencies and start the application

- Make sure you have [node](https://nodejs.org/en/) installed
- Run 'npm install' to install the dependencies
- Run 'npm start' in one terminal and 'npm run build' in another terminal

# API Documentation

API Routes and Mongo Schema setup
https://docs.google.com/document/d/15YZd_PZaXBtqnHqv1-0PO6uAbcINl_q_OgL6_PhdU3s/edit

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/thingetoo/iSpyify](https://github.com/thingetoo/iSpyify)
