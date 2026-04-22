// ============================================================
//  VideoPreviewModal – 3-sec YouTube preview popup
// ============================================================
import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

/**
 * Extracts YouTube video ID from a youtube.com URL
 */
function getYouTubeId(url = '') {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/);
  return match ? match[1] : null;
}

export default function VideoPreviewModal({ title, videoUrl, onClose, courseId, instructor }) {
  const overlayRef = useRef(null);
  const playerRef = useRef(null);
  const { showToast, updateUserProgress, addCertificate } = useApp();
  const videoId = getYouTubeId(videoUrl);

  const [progress, setProgress] = useState(0);
  const [canDownload, setCanDownload] = useState(false);
  const [showNameForm, setShowNameForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Load YouTube API and track progress
  useEffect(() => {
    // 1. Load API Script
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    let interval;

    // 2. Initialize Player
    const initPlayer = () => {
      playerRef.current = new window.YT.Player('yt-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
          start: 10 // Start a bit into the video for better demo
        },
        events: {
          onReady: (event) => {
            // Start polling progress
            interval = setInterval(() => {
              const duration = event.target.getDuration();
              const currentTime = event.target.getCurrentTime();
              if (duration > 0) {
                const p = (currentTime / duration) * 100;
                const roundedP = Math.min(Math.round(p * 100) / 100, 100);
                setProgress(roundedP);
                if (p >= 85) setCanDownload(true);

                // Track progress in DB/State every 5% increment or at major milestones
                if (courseId) {
                  updateUserProgress(courseId, roundedP);
                }
              }
            }, 1000);
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      clearInterval(interval);
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

<<<<<<< HEAD
  // Prevent body scroll
=======
  // Prevent body scroll while open
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
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
<<<<<<< HEAD
        position: 'relative'
=======
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
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
<<<<<<< HEAD
            }}>▶ LIVE PREVIEW</span>
=======
            }}>▶ PREVIEW</span>
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
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
<<<<<<< HEAD
        >✕</button>
      </div>

      {/* Video embed area */}
      <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
        <div id="yt-player" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}></div>
      </div>

      {/* Footer with Progress and Certificate CTA */}
=======
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >✕</button>
        </div >

    {/* Video embed */ }
    < div style = {{ position: 'relative', paddingTop: '56.25%', background: '#000' }
}>
{
  videoId?(
            <iframe
              src = {`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&start=10`}
title = { title }
allow = "autoplay; encrypted-media"
allowFullScreen
style = {{
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
        </div >

  {/* Footer CTA */ }
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
  < div style = {{
  padding: '14px 18px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'var(--bg-surface, #12122a)',
        borderTop: '1px solid var(--border-subtle, rgba(255,255,255,0.08))',
        }}>
<<<<<<< HEAD
          <div style={{ flex: 1, marginRight: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary, #aaa)' }}>
                Progress: {progress}%
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: canDownload ? 'var(--accent-1)' : 'var(--text-muted)' }}>
                {canDownload ? '✅ Eligible for Certificate' : 'Watch 85% to earn certificate'}
              </span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: `${progress}%`, 
                background: progress >= 85 ? 'var(--accent-1)' : 'linear-gradient(90deg, #3b82f6, var(--accent-1))',
                transition: 'width 0.3s ease-out'
              }}></div>
            </div>
          </div>

          <button
            onClick={() => {
              if (canDownload) {
                setShowNameForm(true);
              } else {
                showToast('Please watch at least 85% to download certificate', 'warning');
              }
            }}
            disabled={!canDownload}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              border: 'none',
              background: canDownload ? 'var(--accent-1)' : 'rgba(255,255,255,0.05)',
              color: canDownload ? '#fff' : 'rgba(255,255,255,0.3)',
              fontWeight: 700,
              cursor: canDownload ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: canDownload ? '0 4px 15px var(--accent-glow)' : 'none',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Claim Certificate
          </button>
        </div >

  {/* Name Prompt Modal Overlay */ }
{
  showNameForm && (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px', animation: 'fadeIn 0.3s ease'
    }}>
      {!isGenerating ? (
        <div style={{
          background: 'var(--bg-card)', padding: '32px', borderRadius: '24px',
          width: '100%', maxWidth: '400px', textAlign: 'center',
          border: '1px solid var(--border-subtle)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎓</div>
          <h3 style={{ marginBottom: '8px', color: '#fff' }}>Congratulations!</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Please enter your full name exactly as it should appear on your certificate.
          </p>
          <input
            type="text"
            placeholder="Your Full Name"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            style={{
              width: '100%', padding: '14px 18px', borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)',
              color: '#fff', fontSize: '1rem', marginBottom: '20px', outline: 'none'
            }}
            autoFocus
          />
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setShowNameForm(false)}
              style={{ flex: 1, padding: '12px', borderRadius: '10px', background: 'transparent', border: '1px solid var(--border-subtle)', color: '#fff', cursor: 'pointer' }}
            >Cancel</button>
            <button
              onClick={() => {
                if (userName.trim()) {
                  setIsGenerating(true);
                  setTimeout(() => setIsGenerating('done'), 2000);
                } else {
                  showToast('Please enter your name', 'error');
                }
              }}
              style={{ flex: 2, padding: '12px', borderRadius: '10px', background: 'var(--accent-1)', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
            >Generate Certificate</button>
          </div>
        </div>
      ) : isGenerating === 'done' ? (
        <div style={{
          background: '#fff', padding: '40px', borderRadius: '4px',
          width: '100%', maxWidth: '600px', position: 'relative',
          color: '#1a1a2e', boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
          border: '10px solid #1a1a2e', outline: '1px solid #c5a059', outlineOffset: '-15px'
        }}>
          <div style={{ textAlign: 'center', border: '2px solid #c5a059', padding: '30px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#c5a059', letterSpacing: '4px', marginBottom: '20px' }}>LEARNFLOW ACADEMY</div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '30px' }}>CERTIFICATE OF COMPLETION</div>
            <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}>THIS IS TO CERTIFY THAT</div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, margin: '15px 0', fontFamily: 'serif', color: '#1a1a2e' }}>{userName}</div>
            <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}>HAS SUCCESSFULLY COMPLETED THE COURSE</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '40px' }}>{title}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', padding: '0 40px' }}>
              <div style={{ borderTop: '1px solid #1a1a2e', width: '120px', paddingTop: '8px', fontSize: '0.7rem' }}>INSTRUCTOR SIGNATURE</div>
              <div style={{ fontSize: '2rem' }}>🏆</div>
              <div style={{ borderTop: '1px solid #1a1a2e', width: '120px', paddingTop: '8px', fontSize: '0.7rem' }}>DATE: {new Date().toLocaleDateString()}</div>
            </div>
          </div>
          <button
            onClick={() => {
              showToast('⬇️ Starting your certificate download...', 'success');

              // Save certificate to user profile
              addCertificate({ _id: courseId, title, instructor });

              const canvas = document.createElement('canvas');
              canvas.width = 800; canvas.height = 600;
              const ctx = canvas.getContext('2d');
              ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 800, 600);
              ctx.strokeStyle = '#c5a059'; ctx.lineWidth = 20; ctx.strokeRect(10, 10, 780, 580);
              ctx.fillStyle = '#1a1a2e'; ctx.font = 'bold 40px serif'; ctx.textAlign = 'center';
              ctx.fillText('CERTIFICATE OF COMPLETION', 400, 100);
              ctx.font = '24px sans-serif'; ctx.fillText('This is to certify that', 400, 200);
              ctx.font = 'bold 48px serif'; ctx.fillText(userName, 400, 280);
              ctx.font = '24px sans-serif'; ctx.fillText('has completed', 400, 360);
              ctx.font = 'bold 32px sans-serif'; ctx.fillText(title, 400, 420);
              ctx.font = '18px sans-serif'; ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, 400, 520);

              canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Certificate_${userName.replace(/\s+/g, '_')}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              });

              setTimeout(() => {
                setShowNameForm(false);
                onClose(); // Close the whole modal after download
              }, 1500);
            }}
            style={{
              position: 'absolute', bottom: '-70px', left: '50%', transform: 'translateX(-50%)',
              padding: '12px 30px', borderRadius: '30px', background: 'var(--accent-1)',
              color: '#fff', border: 'none', fontWeight: 800, cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
              whiteSpace: 'nowrap'
            }}
          >DOWNLOAD CERTIFICATE</button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div className="loader" style={{ width: '40px', height: '40px', border: '4px solid #fff', borderTopColor: 'var(--accent-1)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <p>Creating your digital certificate...</p>
        </div>
      )
      }
    </div>
  )
}
=======
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary, #aaa)' }}>
            📺 Click outside or press <kbd style={{
              padding: '1px 5px', borderRadius: 4,
              background: 'rgba(255,255,255,0.1)', fontSize: '0.78rem',
            }}>Esc</kbd> to close
          </span>
        </div>
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
      </div >

  <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
<<<<<<< HEAD
        @keyframes spin    { to { transform: rotate(360deg) } }
=======
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
      `}</style>
    </div >
  );
}
