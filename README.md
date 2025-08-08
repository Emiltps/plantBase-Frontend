# PlantBase Frontend

This is the **PlantBase** mobile frontend application built with Expo and React Native that interfaces with the PlantBase Backend API to manage multi-tenant plant care tracking.

## Table of Contents

- [Features](#features)
- [App Preview](#app-preview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Key Components](#key-components)
- [Contributing](#contributing)

## Features

- User authentication (signup / login) via Supabase Auth
- View, create, edit, and delete plants
- Manage care schedules (water, fertilise, prune) with due dates
- Mark tasks complete / uncomplete
- Profile management with image upload
- Responsive UI with dynamic lists and modal pickers

## App Preview

![app preview](https://ra.thesungod.xyz/Upd12DQw.png 'Screenshots')

## Tech Stack

- **Framework:** Expo (React Native)
- **Language:** TypeScript
- **Styling:** Tailwind (NativeWind)
- **Navigation:** React Navigation (Native Stack)
- **API Client:** Axios + Supabase JS client
- **State Management:** React Context (Auth), local state/hooks

## Prerequisites

- Node.js (>=14)
- npm
- Expo CLI (`npm install -g expo-cli`)
- Supabase project (backend URL and anon key)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Emiltps/plantBase-Frontend.git
   cd plantBase-Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (see below).
4. Start the development server:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the project root with the following keys (Expo will load these via app.json `extra`):

```ini
EXPO_PUBLIC_API_BASE_URL=https://your-api-domain.com
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

Ensure your `app.json` or `app.config.js` is set to expose these under `extra`.

## Available Scripts

- `npm start` / `expo start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator

## Key Components

- **AuthContext**: Provides authentication state and methods.
- **NavContainer**: Root navigation wrapper with splash screen.
- **PlantPreviewCard**: Displays a plant summary with image and title.
- **PlantForm**: Custom text inputs, pickers, and buttons for plant editing.
- **TaskList**: Renders care schedule tasks with complete/uncomplete actions.

## Backend

- Backend repository: https://github.com/Emiltps/plantBase-Backend
