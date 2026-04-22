// ============================================================
//  VideoPreviewModal – 3-sec YouTube preview popup
// ============================================================
import React, { useEffect, useRef } from 'react';

/**
 * Extracts YouTube video ID from a youtube.com URL
 */
function getYouTubeId(url = '') {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/);
  return match ? match[1] : null;
}

export default function VideoPreviewModal({ title, videoUrl, onClose }) {
  const overlayRef = useRef(null);
  const videoId = getYouTubeId(videoUrl);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="video-preview-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview: ${title}`}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div style={{
        width: '100%', maxWidth: '760px',
        background: 'var(--bg-card, #1a1a2e)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
        animation: 'slideUp 0.25s ease',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px',
          background: 'var(--bg-surface, #12122a)',
          borderBottom: '1px solid var(--border-subtle, rgba(255,255,255,0.08))',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em',
              padding: '3px 8px', borderRadius: '999px',
              background: 'hsl(0,75%,55%)', color: '#fff',
            }}>▶ PREVIEW</span>
            <span style={{
              fontSize: '0.9rem', fontWeight: 600,
              color: 'var(--text-primary, #fff)',
              maxWidth: '500px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{title}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close preview"
            style={{
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-primary, #fff)', fontSize: '1.1rem',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >✕</button>
        </div>

        {/* Video embed */}
        <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&start=10`}
              title={title}
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                border: 'none',
              }}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary, #aaa)', flexDirection: 'column', gap: 12,
            }}>
              <span style={{ fontSize: '3rem' }}>🎬</span>
              <span>Preview not available</span>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div style={{
          padding: '14px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--bg-surface, #12122a)',
          borderTop: '1px solid var(--border-subtle, rgba(255,255,255,0.08))',
        }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary, #aaa)' }}>
            📺 Click outside or press <kbd style={{
              padding: '1px 5px', borderRadius: 4,
              background: 'rgba(255,255,255,0.1)', fontSize: '0.78rem',
            }}>Esc</kbd> to close
          </span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </div>
  );
}
