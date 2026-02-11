import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const handConfig = {
  apiKey: "AIzaSyCLLdmYRDIEyczB1bZ8limS0SuChl1CAqg",
  authDomain: "game-leaderboard-19d6e.firebaseapp.com",
  databaseURL: "https://game-leaderboard-19d6e-default-rtdb.firebaseio.com/",
  projectId: "game-leaderboard-19d6e",
  storageBucket: "game-leaderboard-19d6e.firebasestorage.app",
  messagingSenderId: "579107167152",
  appId: "1:579107167152:web:a305a810ad513237d41475"
};

const dinoConfig = {
  apiKey: "AIzaSyDSwtWGy_ls9xD2zRfrhhcF77MUv6declw",
  authDomain: "game-leaderboard-dino.firebaseapp.com",
  databaseURL: "https://game-leaderboard-dino-default-rtdb.firebaseio.com/",
  projectId: "game-leaderboard-dino",
  storageBucket: "game-leaderboard-dino.firebasestorage.app",
  messagingSenderId: "1004914568566",
  appId: "1:1004914568566:web:1034a90d337023777fde57"
};

// Initialize separate apps to access different projects
const handApp = initializeApp(handConfig, "HandApp");
const dinoApp = initializeApp(dinoConfig, "DinoApp");

export const handDb = getDatabase(handApp);
export const dinoDb = getDatabase(dinoApp);
