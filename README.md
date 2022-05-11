# visualify

A web application for Spotify users who want to see & visualize their music listening behaviors.

Visualify was inspired by Spotify Wrapped, a feature that shows Spotify users their music listening data from the previous year. With that said, users can only see their music listening data from that previous year. This eventually led to me creating Visualify which allows users to see their music listening data at different time ranges.

## Live Demo

You can check out the application at https://visualifyapp.herokuapp.com/

## Technologies Used

- Spotify API (O-Auth)
- React.js
- Express.js
- Node.js
- JavaScript
- CSS3
- HTML5
- Webpack
- Babel
- Heroku
## Features

1. Users can login to their Spotify account.
2. Users can view their profile page with an overview of their Spotify account details.
3. Users can view their top tracks of all time.
4. Users can view their top artists of all time.
5. Users can view their top tracks from 6 months ago.
6. Users can view their top tracks from a month ago.
7. Users can view their top artists from 6 months ago.
8. Users can view their top artists from a month ago.

# Stretch Features

- Users can play songs on the browser.
- Users can share their top tracks & artists.

# Preview

![visualify1](https://user-images.githubusercontent.com/97268025/167945013-0391a295-9cdf-4b93-9cfc-514198f04ffc.gif)
![visualify2](https://user-images.githubusercontent.com/97268025/167945025-13a04438-7d3f-4b74-b233-33126439b0ed.gif)

## System Requirements

- Browser
- Node.js 16 or higher
- NPM 8 or higher

## Getting Started

1. **Clone repository.**

   ```git clone git@github.com:justintaeson/ajax-project.git```

2. **Install dependencies.**

   ```npm install```

3. **Create a copy of the .env.example file.**

    ```cp .env.example .env```

4. **Create an app on Spotify's developer dashboard.**

    https://developer.spotify.com/dashboard/applications

5. **Input the client ID & client given by Spotify for you app into the .env file.**

    - CLIENT_ID=bcaf96c9c8a246dbb00a2348debeb62c
    - CLIENT_SECRET=a51cbec077d9441f852fb65eb7011098

6. **Run the application. Once live, you can view the application at http://localhost:3000 in your browser.**

    ```npm run dev```

7. **Login with the following demo account if you'd like to see how the app functions.**

    - EMAIL: mrjustinson@gmail.com
    - PW: Demo1234@

8. **If you'd like to use your personal Spotify account with this application, please send me a message on LinkedIn with your Spotify email address.**

    - https://www.linkedin.com/in/justinson/

The web application is currently being reviewed by Spotify at the moment. Once it's given approval, any Spotify users will be able to use their own personal Spotify account with Visualify. Until given approval, application access has to be given to users individually due to Spotify's policy.
