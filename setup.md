# Setup Guide 🛠️

Follow this guide to set up the **Movie Studio** project on your local machine.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Version 18 or higher)
- [pnpm](https://pnpm.io/) (Recommended package manager)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/netflix-app.git
    cd netflix-app
    ```

2.  **Install Dependencies:**
    ```bash
    pnpm install
    # or
    npm install
    # or
    yarn install
    ```

## Environment Variables

This project requires API keys from [The Movie Database (TMDB)](https://www.themoviedb.org/).

1.  Create a `.env` file in the root directory of the project.
2.  Add the following keys to your `.env` file:

    ```env
    # Server-side API Read Access Token (from TMDB API Settings)
    TMDB_READ_ACCESS_KEY=your_tmdb_read_access_token_here

    # Client-side API Key (from TMDB API Settings)
    NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
    ```

### How to get TMDB Keys:

1.  Sign up/Login to [The Movie Database](https://www.themoviedb.org/).
2.  Go to **Settings** > **API**.
3.  Generate a new API key (Developer type is fine).
4.  Copy the **API Key** (for `NEXT_PUBLIC_TMDB_API_KEY`).
5.  Copy the **API Read Access Token** (for `TMDB_READ_ACCESS_KEY`).

## Running the Application

### Development Server

To start the application in development mode with hot-reloading:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To create an optimized production build:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## Troubleshooting

### API Errors

If you see errors related to fetching movies, ensure your `.env` file is correctly set up and the API keys are valid.

### Image Issues

If images are not loading, check if the `next.config.mjs` allows the image hostname. By default, `image.tmdb.org` is configured.
