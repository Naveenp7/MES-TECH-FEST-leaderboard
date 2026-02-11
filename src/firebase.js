import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const handConfig = {
    apiKey: import.meta.env.VITE_HAND_API_KEY,
    authDomain: import.meta.env.VITE_HAND_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_HAND_DATABASE_URL,
    projectId: import.meta.env.VITE_HAND_PROJECT_ID,
    storageBucket: import.meta.env.VITE_HAND_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_HAND_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_HAND_APP_ID
};

const dinoConfig = {
    apiKey: import.meta.env.VITE_DINO_API_KEY,
    authDomain: import.meta.env.VITE_DINO_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DINO_DATABASE_URL,
    projectId: import.meta.env.VITE_DINO_PROJECT_ID,
    storageBucket: import.meta.env.VITE_DINO_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_DINO_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_DINO_APP_ID
};

// Initialize separate apps to access different projects
const handApp = initializeApp(handConfig, "HandApp");
const dinoApp = initializeApp(dinoConfig, "DinoApp");

export const handDb = getDatabase(handApp);
export const dinoDb = getDatabase(dinoApp);
