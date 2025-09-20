# JaZeeGH‑WeatherApp_2

A modern web application that lets users create personalized weather stations, record detailed weather reports, and view aggregated statistics. Developed as part of the Web Development 2 module of the HDip in Computer Science at South East Technological University (SETU).

* * *

## Table of Contents

1.  [Overview]
2.  [Features]
3.  [Demo]
4.  [Installation & Setup]
5.  [Technology Stack]
6.  [Project Structure]
7.  [Contributing]
8.  [License]
9.  [Contact]

* * *

## Overview

WebDev2‑WeatherApp enables users to:

*   Register and authenticate securely.
*   Create multiple weather stations by specifying a name and geographic coordinates (latitude & longitude).
*   Record weather reports for each station, automatically timestamped and containing:
    *   Weather code
    *   Temperature
    *   Wind speed & direction (selectable via dropdown)
    *   Atmospheric pressure
*   View reports in a sortable table, with real‑time, minimum, and maximum values displayed per station.
*   Access a dashboard summarising all owned stations, showing the latest readings and overall min/max statistics.
*   Manage personal account details and logout gracefully.

The UI adapts to mobile devices through a responsive navigation bar (hamburger menu).

* * *

## Features

| Category | Description |
| --- | --- |
| User Management | Sign‑up, login, profile editing, secure logout |
| Station Management | Add, edit, delete custom weather stations |
| Report Management | Create, delete, and list weather reports per station |
| Data Visualization | Latest, minimum, and maximum values shown on both station and dashboard views |
| Responsive Design | Mobile‑friendly navigation with a burger menu |
| Deployment | Hosted on Render with continuous deployment from GitHub |

* * *

## Demo

*   Source Code: [https://github.com/JaZeeGH/JaZeeGH-WeatherApp_2](https://github.com/JaZeeGH/JaZeeGH-WeatherApp_2)

* * *

## Installation & Setup

`# Clone the repository git clone https://github.com/JaZeeGH/JaZeeGH-WeatherApp_2.git cd WebDev2-WeatherApp # Install dependencies npm install # Set environment variables (e.g., session secret, database URL) cp .env.example .env # Edit .env with your configuration # Run the development server npm start`

The app will be accessible at `http://localhost:4000`.

* * *

## Technology Stack

*   Node.js – Server‑side runtime
*   Express – Web framework for routing and middleware
*   Handlebars – Templating engine for dynamic HTML rendering
*   JavaScript (ES6+) – Client‑side interactivity
*   Render – Cloud hosting platform (continuous deployment)
*   Git & GitHub – Version control and collaboration

* * *

## Project Structure

`WebDev2-WeatherApp/ ├─ src/ │  ├─ routes/          # Express route definitions │  ├─ views/           # Handlebars templates │  ├─ public/          # Static assets (CSS, JS, images) │  └─ models/          # Data models (if applicable) ├─ .env.example        # Example environment configuration ├─ package.json        # npm scripts and dependencies └─ README.md           # This document`

* * *

## License

This project is licensed under the MIT License – see the `LICENSE` file for details.

* * *

## Contact

*   Author: JaZeeGH
*   GitHub: [https://github.com/JaZeeGH](https://github.com/JaZeeGH)
*   Email: _(provide email if desired)_

Feel free to open an issue or submit a pull request for any questions, suggestions, or improvements. Thank you for checking out JaZeeGH‑WeatherApp_2!