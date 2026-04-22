import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import CourseCard from '../components/CourseCard.jsx';
<<<<<<< HEAD
import VideoPreviewModal from '../components/VideoPreviewModal.jsx';
=======
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
import { useApp } from '../context/AppContext.jsx';

const SAMPLE_VIDEOS = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
];

export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { showToast, user, addToRecentlyViewed } = useApp();
  const [showVideo, setShowVideo] = React.useState(false);
=======
  const { showToast } = useApp();
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d

  const { data: courseData, loading: courseLoading } = useFetch(`/api/courses/${id}`);
  const course = courseData?.data;

  // We fetch related domain courses
  const { data: relatedData, loading: relatedLoading } = useFetch(
    course ? `/api/courses?domain=${course.domain}&sort=popular` : null
  );

  const relatedCourses = (relatedData?.data || []).filter(c => c._id !== id).slice(0, 4);

  if (courseLoading) return <div style={{ padding: '100px', textAlign: 'center' }}><h2>Loading...</h2></div>;
  if (!course) return <div style={{ padding: '100px', textAlign: 'center' }}><h2>Course not found</h2></div>;

<<<<<<< HEAD
  // Track as recently viewed
  React.useEffect(() => {
    if (course) addToRecentlyViewed(course);
  }, [course, addToRecentlyViewed]);

  const videoId = SAMPLE_VIDEOS[course.title.length % SAMPLE_VIDEOS.length];

  const handleEnroll = () => {
    addToRecentlyViewed(course);
    if (!user) {
      showToast('Please sign in to enroll', 'error');
      navigate('/login');
      return;
    }
    showToast(`🎉 Enrolled in "${course.title.slice(0, 40)}…"`, 'success');
    if (course.price === 0) setShowVideo(true);
=======
  const videoId = SAMPLE_VIDEOS[course.title.length % SAMPLE_VIDEOS.length];

  const handleEnroll = () => {
    showToast(`🎉 Enrolled in "${course.title.slice(0, 40)}…"`, 'success');
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
  };

  return (
    <section className="page active" style={{ padding: 'var(--space-8)' }}>
      <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: 'var(--space-4)' }}>
        ← Back
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
        {/* Left side: Demo Video */}
        <div style={{ flex: '1 1 600px', backgroundColor: 'var(--bg-surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}>
<<<<<<< HEAD
  <div
    onClick={() => {
      if (!user) {
        showToast('Please sign in to watch', 'error');
        navigate('/login');
        return;
      }
      setShowVideo(true);
    }}
    style={{
      position: 'relative', width: '100%', paddingTop: '56.25%',
      backgroundColor: '#000', borderRadius: 'var(--radius-lg)',
      overflow: 'hidden', marginBottom: 'var(--space-4)',
      cursor: 'pointer',
      backgroundImage: `url(/images/domains/${course.domain}.png)`,
      backgroundSize: 'cover', backgroundPosition: 'center'
    }}
  >
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.4)'
    }}>
      <div style={{
        width: 70, height: 70, borderRadius: '50%',
        background: 'rgba(255,255,255,0.9)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.8rem', color: '#000', paddingLeft: '5px'
      }}>▶</div>
    </div>
=======
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', backgroundColor: '#000', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
      {/* The user can insert their actual dynamic video URL below */}
      <video
        src={videoId}
        controls
        autoPlay
        muted
        playsInline
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
    </div>
    <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 'var(--space-2)' }}>{course.title}</h1>
    <p style={{ color: 'var(--text-secondary)' }}>by {course.instructor} • {course.domainLabel}</p>
    <div style={{ marginTop: 'var(--space-4)' }}>
      <span style={{ marginRight: '16px' }}>⭐ {course.rating} ({course.reviews} reviews)</span>
      <span style={{ marginRight: '16px' }}>👥 {course.students} students</span>
    </div>
  </div>

  {/* Right side: AI Summary */ }
  <div style={{
    flex: '1 1 300px',
    backgroundColor: 'var(--bg-surface-2)',
    padding: 'var(--space-6)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)',
    display: 'flex', flexDirection: 'column'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
      <span style={{ fontSize: '1.5rem' }}>✨</span>
      <h3 style={{ margin: 0, background: 'linear-gradient(90deg, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        AI Summary
      </h3>
    </div>
    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>
      This intensive course is tailored to help you master <strong>{course.title.split(':')[0]}</strong> quickly and effectively. Based on past learners' insights, the curriculum heavily emphasizes practical implementation. Our AI mentor will guide you through {course.level} concepts, ensuring you can apply the skills directly in real-world scenarios.
    </p>

    <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
        <span>Difficulty:</span> <strong style={{ textTransform: 'capitalize' }}>{course.level}</strong>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
        <span>Duration:</span> <strong>{course.duration}</strong>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', fontSize: '1.2rem' }}>
        <span>Price:</span> <strong>{course.price === 0 ? 'FREE' : `₹${course.price.toLocaleString('en-IN')}`}</strong>
      </div>
    </div>

    <button
      onClick={handleEnroll}
      className="btn btn-primary"
      style={{ width: '100%', marginTop: 'var(--space-6)', padding: 'var(--space-3)', fontSize: '1.1rem' }}
    >
      {course.price === 0 ? 'Enrol Free Now' : 'Enrol Now'}
    </button>
  </div>
      </div >

    {/* Recommended Courses down below */ }
    < h2 className = "section-title" > Related Courses in { course.domainLabel }</h2 >
    {
      relatedLoading?(
        <p> Loading recommendations...</p >
      ) : relatedCourses.length === 0 ? (
    <p style={{ color: 'var(--text-muted)' }}>No other related courses found.</p>
  ) : (
    <div className="courses-grid" role="list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
      {relatedCourses.map(c => <CourseCard key={c._id} course={c} />)}
    </div>
  )
}
<<<<<<< HEAD
{
  showVideo && (
    <VideoPreviewModal
      title={course.title}
      videoUrl={course.videoUrl}
      courseId={course._id}
      instructor={course.instructor}
      onClose={() => setShowVideo(false)}
    />
  )
}
=======
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
    </section >
  );
}
