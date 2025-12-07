# 🎬 Movie App

> A modern, responsive movie discovery application built with React Native, Expo, and NativeWind.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![NativeWind](https://img.shields.io/badge/NativeWind-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)

## ✨ Features

- 📈 **Trending Movies**: Real-time trending list based on community searches.
- 🔍 **Search**: Powerful search functionality to find your favorite movies.
- 📝 **Details**: View comprehensive movie details, including ratings, release dates, and posters.
- 💾 **Save/Favorite**: Bookmark movies to your personal list for later viewing.
- 📱 **Responsive Design**: Beautifully crafted UI that works seamlessly on both Android and iOS.

## 🛠️ Tech Stack

- **Frontend**: [React Native](https://reactnative.dev/), [Expo](https://expo.dev/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Backend Data**: [Appwrite](https://appwrite.io/) (Database & Realtime)
- **Movie API**: [TMDB](https://www.themoviedb.org/) (The Movie Database)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [Expo Go](https://expo.dev/go) app on your physical device, or an Android/iOS emulator.

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory.

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Environment Setup**:

    Create a `.env` file in the root directory by copying the example:

    ```bash
    cp .env.example .env
    ```

    Fill in your API keys in the `.env` file:

    ```env
    EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key
    EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
    EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
    EXPO_PUBLIC_DATABASE_ID=your_database_id
    EXPO_PUBLIC_COLLECTION_ID=your_collection_id
    ```

### Running the App

Start the development server:

```bash
npx expo start
```

- Scan the QR code with **Expo Go** (Android) or the Camera app (iOS).
- Press `a` to run on Android Emulator.
- Press `i` to run on iOS Simulator.

## 📂 Project Structure

```
e:\MovieApp\
├── 📂 app/                 # Screens and Navigation (Expo Router)
│   ├── (tabs)/            # Main tab navigation
│   └── movies/            # Movie specific routes
├── 📂 components/          # Reusable UI components
├── 📂 services/            # API services (TMDB, Appwrite)
├── 📂 hook/                # Custom React Hooks
├── 📂 assets/              # Images and fonts
└── 📄 package.json         # Project dependencies
```

