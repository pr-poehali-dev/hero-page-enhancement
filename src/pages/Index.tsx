import { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { CircularMenu } from '@/components/CircularMenu';
import { AdminPanel } from '@/components/AdminPanel';
import { PostsList } from '@/components/PostsList';
import { MediaSection } from '@/components/MediaSection';
import { AboutSection } from '@/components/AboutSection';
import { saveMediaToDB, getAllMediaFromDB } from '@/lib/db';

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

    // Загрузка медиа из IndexedDB
    getAllMediaFromDB().then((items) => {
      setMediaItems(items);
    }).catch((error) => {
      console.error('Error loading media from DB:', error);
    });

    const savedBg = localStorage.getItem('backgroundImage');
    if (savedBg) {
      setBackgroundImage(savedBg);
    }

    let keySequence: string[] = [];
    const secretCode = ['d', 'e', 'v', '5', '0', '9'];
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'i' || e.key === 'I' || e.key === 'ш' || e.key === 'Ш') {
        setShowUI(prev => !prev);
      }

      keySequence.push(e.key.toLowerCase());
      if (keySequence.length > secretCode.length) {
        keySequence.shift();
      }

      if (keySequence.join('') === secretCode.join('')) {
        if (!isAdmin) {
          setIsAdmin(true);
          localStorage.setItem('isAdmin', 'true');
          console.log('🔓 Access granted');
        }
        keySequence = [];
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

  const updatePost = (updatedPost: any) => {
    const newPosts = posts.map(p => p.id === updatedPost.id ? updatedPost : p);
    setPosts(newPosts);
    localStorage.setItem('posts', JSON.stringify(newPosts));
  };

  const deletePost = (id: number) => {
    const newPosts = posts.filter(p => p.id !== id);
    setPosts(newPosts);
    localStorage.setItem('posts', JSON.stringify(newPosts));
  };

  const updateBackground = (image: string) => {
    setBackgroundImage(image);
    localStorage.setItem('backgroundImage', image);
  };

  const removeBackground = () => {
    setBackgroundImage(null);
    localStorage.removeItem('backgroundImage');
  };

  const addMedia = async (media: any) => {
    try {
      await saveMediaToDB(media);
      const updatedMedia = await getAllMediaFromDB();
      setMediaItems(updatedMedia);
    } catch (error) {
      console.error('Error saving media to DB:', error);
    }
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
          {isAdmin && (
            <AdminPanel 
              onAddPost={addPost} 
              onUpdatePost={updatePost}
              onDeletePost={deletePost}
              onUpdateBackground={updateBackground}
              onRemoveBackground={removeBackground}
              onAddMedia={addMedia}
              posts={posts}
            />
          )}
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