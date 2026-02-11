import { useState, useEffect } from 'react'
import { handDb, dinoDb } from './firebase'
import Leaderboard from './components/Leaderboard'
import { Gamepad2, Ghost, MonitorPlay, Zap, QrCode } from 'lucide-react'
import QRCode from "react-qr-code"
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('hand')
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  return (
    <div className="app-container">
      <div className="background-gradient"></div>

      <div className="layout-grid">
        <div className="left-panel">
          <header className="main-header">
            <div className="logo-container">
              <div className="logo-glitch" data-text="MES">MES</div>
              <div className="logo-glitch" data-text="TECH">TECH</div>
              <div className="logo-glitch" data-text="FEST">FEST</div>
            </div>
            <h1>2026</h1>
            <div className="live-indicator">
              <span className="pulse-dot"></span>
              LIVE LEADERBOARD
            </div>
          </header>

          <div className="tabs-container">
            <button
              className={`glass-tab-btn ${activeTab === 'hand' ? 'active' : ''}`}
              onClick={() => setActiveTab('hand')}
            >
              <div className="tab-icon-bg">
                <Gamepad2 size={24} />
              </div>
              <div className="tab-info">
                <span className="tab-title">Hand Shoot Arena</span>
                <span className="tab-subtitle">Gesture Control</span>
              </div>
            </button>
            <button
              className={`glass-tab-btn ${activeTab === 'dino' ? 'active' : ''}`}
              onClick={() => setActiveTab('dino')}
            >
              <div className="tab-icon-bg">
                <Ghost size={24} />
              </div>
              <div className="tab-info">
                <span className="tab-title">Jumping Dino</span>
                <span className="tab-subtitle">Classic Arcade</span>
              </div>
            </button>
          </div>
        </div>

        <div className="right-panel">
          <main className="content-area">
            {activeTab === 'hand' ? (
              <div className="leaderboard-wrapper fade-in">
                <Leaderboard
                  db={handDb}
                  gameName="Hand Shoot"
                  title="Hand Shoot Arena"
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
                  title="Jumping Dino"
                  color="#ff0055"
                  icon={MonitorPlay}
                  type="dino"
                />
              </div>
            )}
          </main>
        </div>

        <div className="qr-code-container">
          <div className="qr-wrapper">
            {currentUrl && (
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={currentUrl}
                viewBox={`0 0 256 256`}
                fgColor="#000000"
                bgColor="transparent"
              />
            )}
          </div>
          <div className="qr-label">
            <QrCode size={16} />
            <span>SCAN FOR LIVE SCORES</span>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>Live Realtime Updates • Powered by AdTec</p>
      </footer>
    </div>
  )
}

export default App
