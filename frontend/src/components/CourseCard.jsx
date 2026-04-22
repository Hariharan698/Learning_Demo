// ============================================================
//  CourseCard Component – with video preview on click
// ============================================================
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import VideoPreviewModal from './VideoPreviewModal.jsx';

const DOMAIN_IMAGES = {
  'webdev': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
  'datascience': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
  'ai': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80',
  'design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80',
  'mobile': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80',
  'devops': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80',
  'cybersec': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80',
  'business': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
};

function starRating(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const { showToast, user } = useApp();
  const [showPreview, setShowPreview] = useState(false);

  const {
    _id, title, instructor, domainLabel, emoji, level,
    rating, reviews, students, duration, price, originalPrice, badge, tags,
    videoUrl,
  } = course;

  const discount = originalPrice && price > 0
    ? Math.round((1 - price / originalPrice) * 100) : 0;

  const handleCardClick = () => {
    if (!user) {
      showToast('Please sign in to watch previews', 'error');
      navigate('/login');
      return;
    }
    if (videoUrl) {
      setShowPreview(true);
    } else {
      showToast(`▶ Opening "${title.slice(0, 30)}…"`, 'info');
    }
  };

  const handleEnroll = (e) => {
    e.stopPropagation();
    if (!user) {
      showToast('Please sign in to enroll', 'error');
      navigate('/login');
      return;
    }
    showToast(`🎉 Enrolled in "${title.slice(0, 40)}…"`, 'success');
  };

  return (
    <>
      <div className="course-card" role="listitem" tabIndex={0}
           aria-label={title} onClick={handleCardClick}
           style={{ cursor: 'pointer' }}>

        <div style={{ position: 'relative' }}>
          {/* Thumbnail with play button overlay */}
          <div className="course-thumb-placeholder" style={{ 
            position: 'relative',
            backgroundImage: `url(${DOMAIN_IMAGES[course.domain] || DOMAIN_IMAGES['webdev']})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
            {videoUrl && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.35)',
                borderRadius: 'inherit',
                opacity: 0,
                transition: 'opacity 0.2s',
              }} className="play-overlay">
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.92)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>▶</div>
              </div>
            )}
          </div>

          {badge && (
            <div className="course-badge-row">
              <span className={`course-badge badge-${badge}`}>
                {badge.charAt(0).toUpperCase() + badge.slice(1)}
              </span>
            </div>
          )}
          {discount > 0 && (
            <div style={{
              position:'absolute', top:'var(--space-3)', right:'var(--space-3)',
              background:'hsl(0,75%,58%)', color:'#fff',
              fontSize:'.7rem', fontWeight:700, padding:'2px 7px',
              borderRadius:'var(--radius-full)',
            }}>-{discount}%</div>
          )}
        </div>

        <div className="course-body">
          <div className="course-domain-tag">{domainLabel}</div>
          <div className="course-title">{title}</div>
          <div className="course-instructor">by {instructor}</div>
          <div className="course-meta">
            <div className="course-rating">
              <span className="stars">{starRating(rating)}</span>
              <span className="rating-val">{rating} ({(reviews/1000).toFixed(1)}K)</span>
            </div>
            <span className={`level-pill level-${level}`}>{level}</span>
          </div>
          <div className="course-meta">
            <span className="course-duration">⏱ {duration}</span>
            <span className="course-students">👥 {students} students</span>
          </div>
        </div>

        <div className="course-footer">
          <div>
            {price === 0 ? (
              <span className="course-price course-price-free">FREE</span>
            ) : (
              <>
                <span className="course-price">₹{price.toLocaleString('en-IN')}</span>
                {originalPrice && (
                  <span className="course-price-original">₹{originalPrice.toLocaleString('en-IN')}</span>
                )}
              </>
            )}
          </div>
          <button className="course-enroll-btn" onClick={handleEnroll}>
            {price === 0 ? 'Enrol Free' : 'Enrol Now'}
          </button>
        </div>
      </div>

      {showPreview && (
        <VideoPreviewModal
          title={title}
          videoUrl={videoUrl}
          onClose={() => setShowPreview(false)}
        />
      )}

      <style>{`
        .course-card:hover .play-overlay { opacity: 1 !important; }
      `}</style>
    </>
  );
}
