import { useState } from 'react'
import { handDb, dinoDb } from './firebase'
import Leaderboard from './components/Leaderboard'
import { Gamepad2, Ghost, MonitorPlay, Zap } from 'lucide-react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('hand')

  return (
    <div className="app-container">
      <div className="background-gradient"></div>

      <header className="main-header">
        <h1>MES TECH FEST <span className="highlight">2026</span></h1>
        <p className="subtitle">LIVE GAME LEADERBOARDS</p>
      </header>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'hand' ? 'active' : ''}`}
          onClick={() => setActiveTab('hand')}
        >
          <Gamepad2 size={20} />
          <span>Hand Shoot Arena</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'dino' ? 'active' : ''}`}
          onClick={() => setActiveTab('dino')}
        >
          <Ghost size={20} />
          <span>Jumping Dino</span>
        </button>
      </div>

      <main className="content-area">
        {activeTab === 'hand' ? (
          <div className="leaderboard-wrapper fade-in">
            <Leaderboard
              db={handDb}
              gameName="Hand Shoot"
              title="Hand Shoot"
              color="#00f3ff"
              icon={Zap}
              type="hand"
            />
          </div>
        ) : (
          <div className="leaderboard-wrapper fade-in">
            <Leaderboard
              db={dinoDb}
              gameName="Dino Run"
              title="Dino Run"
              color="#ff0055"
              icon={MonitorPlay}
              type="dino"
            />
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Live Realtime Updates • Powered by Firebase</p>
      </footer>
    </div>
  )
}

export default App
