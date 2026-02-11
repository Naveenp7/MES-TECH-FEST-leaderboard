import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { Trophy, Medal, Crown, Clock, Target, Activity, ChevronDown, ChevronUp, Crosshair, Zap, Skull, Timer } from 'lucide-react';

const Leaderboard = ({ db, title, color, icon: Icon, type }) => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        const scoresRef = ref(db, 'leaderboard');
        const unsubscribe = onValue(scoresRef, (snapshot) => {
            const data = snapshot.val();
            const scoreList = [];

            if (data) {
                Object.keys(data).forEach((key) => {
                    scoreList.push({
                        id: key,
                        ...data[key],
                    });
                });
            }

            // Sort by score descending
            scoreList.sort((a, b) => b.score - a.score);
            setScores(scoreList);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [db]);

    const toggleExpand = (id) => {
        if (expandedId === id) {
            setExpandedId(null);
        } else {
            setExpandedId(id);
        }
    };

    const getRankIcon = (index) => {
        if (index === 0) return <Crown className="w-6 h-6 text-yellow-400" color="#FFD700" fill="#FFD700" />;
        if (index === 1) return <Medal className="w-6 h-6 text-gray-400" color="#C0C0C0" />;
        if (index === 2) return <Medal className="w-6 h-6 text-orange-400" color="#CD7F32" />;
        return <span className="rank-number">#{index + 1}</span>;
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        return new Date(timestamp).toLocaleDateString(undefined, {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="leaderboard-card" style={{ '--accent-color': color }}>
            <div className="leaderboard-header">
                <div className="icon-wrapper" style={{ backgroundColor: `${color}20` }}>
                    <Icon size={32} color={color} />
                </div>
                <h2>{title} Leaderboard</h2>
            </div>

            <div className="leaderboard-body">
                <div className="table-header">
                    <span className="col-rank">Rank</span>
                    <span className="col-name">Player</span>
                    <span className="col-score">Score</span>
                    <span className="col-action"></span>
                </div>

                {loading ? (
                    <div className="loading-state">Loading scores...</div>
                ) : scores.length === 0 ? (
                    <div className="empty-state">No scores yet!</div>
                ) : (
                    <div className="scores-list">
                        {scores.map((entry, index) => (
                            <div key={entry.id} className="score-item-container">
                                <div
                                    className={`score-row ${index < 3 ? 'top-three' : ''} ${expandedId === entry.id ? 'expanded' : ''}`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                    onClick={() => toggleExpand(entry.id)}
                                >
                                    <div className="col-rank">
                                        {getRankIcon(index)}
                                    </div>
                                    <div className="col-name">
                                        <span className="player-name">{entry.name || 'Anonymous'}</span>
                                        <span className="game-mode-badge">{entry.gameMode || 'Normal'}</span>
                                    </div>
                                    <div className="col-score">
                                        <span className="score-value">{entry.score}</span>
                                    </div>
                                    <div className="col-action">
                                        {expandedId === entry.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </div>

                                {expandedId === entry.id && (
                                    <div className="score-details">
                                        <div className="details-grid">
                                            {type === 'hand' && entry.stats ? (
                                                <>
                                                    <div className="detail-item">
                                                        <Target size={16} className="detail-icon" />
                                                        <span className="detail-label">Accuracy</span>
                                                        <span className="detail-value">{entry.stats.accuracy}%</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <Crosshair size={16} className="detail-icon" />
                                                        <span className="detail-label">Shots/Hits</span>
                                                        <span className="detail-value">{entry.stats.shotsFired} / {entry.stats.targetsHit}</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <Zap size={16} className="detail-icon" />
                                                        <span className="detail-label">Best Combo</span>
                                                        <span className="detail-value">{entry.stats.bestCombo}</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <Skull size={16} className="detail-icon" />
                                                        <span className="detail-label">Missed</span>
                                                        <span className="detail-value">{entry.stats.targetsMissed}</span>
                                                    </div>
                                                </>
                                            ) : type === 'dino' ? (
                                                <>
                                                    <div className="detail-item">
                                                        <Activity size={16} className="detail-icon" />
                                                        <span className="detail-label">Jumps</span>
                                                        <span className="detail-value">{entry.jumps || 0}</span>
                                                    </div>
                                                    <div className="detail-item">
                                                        <Timer size={16} className="detail-icon" />
                                                        <span className="detail-label">Time Alive</span>
                                                        <span className="detail-value">{entry.time || 0}s</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="no-stats">No detailed stats available</div>
                                            )}
                                        </div>
                                        {entry.timestamp && (
                                            <div className="timestamp-footer">
                                                <Clock size={12} />
                                                Played on {formatDate(entry.timestamp)}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
