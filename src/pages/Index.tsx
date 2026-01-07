import { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { CircularMenu } from '@/components/CircularMenu';
import { AdminPanel } from '@/components/AdminPanel';
import { PostsList } from '@/components/PostsList';
import { MediaSection } from '@/components/MediaSection';
import { AboutSection } from '@/components/AboutSection';

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [mediaItems, setMediaItems] = useState<any[]>([]);

  useEffect(() => {
    const savedAdmin = localStorage.getItem('isAdmin');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }

    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }

    const savedMedia = localStorage.getItem('mediaItems');
    if (savedMedia) {
      setMediaItems(JSON.parse(savedMedia));
    }

    const savedBg = localStorage.getItem('backgroundImage');
    if (savedBg) {
      setBackgroundImage(savedBg);
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'i' || e.key === 'I' || e.key === 'ш' || e.key === 'Ш') {
        setShowUI(prev => !prev);
      }

      if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l' || e.key === 'Д' || e.key === 'д')) {
        const code = prompt('Enter developer code:');
        if (code === '509') {
          setIsAdmin(true);
          localStorage.setItem('isAdmin', 'true');
        } else if (code) {
          alert('Invalid code');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const addPost = (post: any) => {
    const newPosts = [post, ...posts];
    setPosts(newPosts);
    localStorage.setItem('posts', JSON.stringify(newPosts));
  };

  const updateBackground = (image: string) => {
    setBackgroundImage(image);
    localStorage.setItem('backgroundImage', image);
  };

  const addMedia = (media: any) => {
    const newMedia = [...mediaItems, media];
    setMediaItems(newMedia);
    localStorage.setItem('mediaItems', JSON.stringify(newMedia));
  };

  return (
    <div 
      className="min-h-screen relative overflow-x-hidden"
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      } : {}}
    >
      {!backgroundImage && <div className="gradient-bg fixed inset-0 -z-10" />}
      
      <Hero />
      
      {showUI && (
        <>
          <CircularMenu />
          {isAdmin && <AdminPanel onAddPost={addPost} onUpdateBackground={updateBackground} onAddMedia={addMedia} />}
        </>
      )}

      <div id="news" className="relative z-10">
        <PostsList posts={posts} />
      </div>

      <div id="media" className="relative z-10">
        <MediaSection mediaItems={mediaItems} />
      </div>

      <div id="about" className="relative z-10">
        <AboutSection />
      </div>
    </div>
  );
};

export default Index;