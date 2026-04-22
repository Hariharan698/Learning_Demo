// ============================================================
//  SessionCard Component
// ============================================================
import React from 'react';
import { useApp } from '../context/AppContext.jsx';

<<<<<<< HEAD
export default function SessionCard({ session, selected, onSelect, onJoin }) {
=======
export default function SessionCard({ session, selected, onSelect }) {
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
  const { showToast } = useApp();
  const {
    _id, title, instructor, instructorInitial, topicLabel,
    level, status, startTime, duration, viewers, enrolled, tags,
  } = session;

<<<<<<< HEAD
  const handleJoinClick = (e) => {
    e.stopPropagation();
    if (onJoin) {
      onJoin(session);
    } else {
      if (status === 'live') {
        showToast(`🔴 Joining "${title.slice(0, 30)}…"`, 'success');
      } else {
        showToast(`✅ Registered for "${title.slice(0, 30)}…"`, 'success');
      }
=======
  const handleJoin = (e) => {
    e.stopPropagation();
    if (status === 'live') {
      showToast(`🔴 Joining "${title.slice(0, 30)}…"`, 'success');
    } else {
      showToast(`✅ Registered for "${title.slice(0, 30)}…"`, 'success');
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
    }
  };

  return (
    <div
      className={`session-card${selected ? ' selected' : ''}`}
      role="listitem"
      onClick={() => onSelect(session)}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(session)}
    >
      <div className="session-card-inner">
        <div className="session-avatar">{instructorInitial}</div>
        <div className="session-info">
          <div className="session-top">
            <span className={`session-status ${status === 'live' ? 'status-live' : 'status-upcoming'}`}>
              {status === 'live' ? '🔴 LIVE' : '⏰ Upcoming'}
            </span>
            <span className={`level-pill level-${level}`}>{level}</span>
          </div>
          <div className="session-title">{title}</div>
          <div className="session-instructor">by {instructor}</div>
          <div className="session-tags">
            {tags?.map(t => <span key={t} className="session-tag">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="session-meta">
        <span className="session-meta-item">⏱ {duration}</span>
        <span className="session-meta-item">
          {status === 'live' ? `👁 ${viewers} watching` : `📅 ${enrolled?.toLocaleString('en-IN')} registered`}
        </span>
        <span className="session-meta-item">🕒 {startTime}</span>
      </div>

<<<<<<< HEAD
      <button className="join-session-btn" onClick={handleJoinClick}>
=======
      <button className="join-session-btn" onClick={handleJoin}>
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
        {status === 'live' ? 'Join Live →' : 'Register →'}
      </button>
    </div>
  );
}
