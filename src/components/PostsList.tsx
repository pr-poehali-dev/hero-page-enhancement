import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Post {
  id: number;
  title: string;
  content: string;
  media?: string | null;
  mediaType?: 'image' | 'video' | null;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  text: string;
  timestamp: string;
}

export const PostsList = ({ posts }: { posts: Post[] }) => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [postComments, setPostComments] = useState<{ [key: number]: Comment[] }>({});
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const savedLikes = localStorage.getItem('likedPosts');
    if (savedLikes) {
      setLikedPosts(new Set(JSON.parse(savedLikes)));
    }

    const savedComments = localStorage.getItem('postComments');
    if (savedComments) {
      setPostComments(JSON.parse(savedComments));
    }
  }, []);

  const handleLike = (postId: number) => {
    if (likedPosts.has(postId)) return;

    const newLikedPosts = new Set(likedPosts);
    newLikedPosts.add(postId);
    setLikedPosts(newLikedPosts);
    localStorage.setItem('likedPosts', JSON.stringify([...newLikedPosts]));

    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts);
      const updatedPosts = parsedPosts.map((post: Post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      );
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    }
  };

  const handleAddComment = (postId: number) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    const newComment: Comment = {
      id: Date.now(),
      text: commentText,
      timestamp: new Date().toISOString(),
    };

    const updatedComments = {
      ...postComments,
      [postId]: [...(postComments[postId] || []), newComment],
    };

    setPostComments(updatedComments);
    localStorage.setItem('postComments', JSON.stringify(updatedComments));

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const handleKeyPress = (e: React.KeyboardEvent, postId: number) => {
    if (e.key === 'Enter') {
      handleAddComment(postId);
    }
  };

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="pixel-font text-3xl md:text-4xl text-game-toxic text-center mb-12 text-shadow-glow glitch">
        Новости
      </h2>

      <div className="space-y-8 max-w-3xl mx-auto">
        {posts.map((post, index) => (
          <Card
            key={post.id}
            className="bg-game-night/90 border-2 border-game-blood/50 p-6 animate-scale-in shadow-xl shadow-game-blood/20 horror-border"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {post.title && (
              <h3 className="pixel-font text-xl text-game-toxic mb-4">{post.title}</h3>
            )}

            {post.content && (
              <p className="text-game-fog mb-4 leading-relaxed">{post.content}</p>
            )}

            {post.media && (
              <div className="mb-4 rounded overflow-hidden border-2 border-game-forest/50">
                {post.mediaType === 'image' ? (
                  <img src={post.media} alt="" className="w-full object-cover" />
                ) : (
                  <video src={post.media} className="w-full" controls />
                )}
              </div>
            )}

            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => handleLike(post.id)}
                disabled={likedPosts.has(post.id)}
                className="flex items-center gap-2 group"
              >
                <Icon
                  name="Heart"
                  size={20}
                  className={`transition-all ${
                    likedPosts.has(post.id)
                      ? 'text-game-blood fill-game-blood'
                      : 'text-game-fog/60 group-hover:text-game-blood'
                  }`}
                />
                <span className="text-game-fog text-sm">{post.likes}</span>
              </button>
            </div>

            <div className="space-y-3">
              {postComments[post.id]?.map((comment) => (
                <div key={comment.id} className="bg-game-night/50 border border-game-forest/30 rounded p-3 animate-fade-in">
                  <p className="text-game-fog text-sm">{comment.text}</p>
                </div>
              ))}

              <div className="flex gap-2">
                <Input
                  value={commentInputs[post.id] || ''}
                  onChange={(e) =>
                    setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                  }
                  onKeyPress={(e) => handleKeyPress(e, post.id)}
                  placeholder="Добавить комментарий..."
                  className="bg-game-night/50 border-game-forest text-game-fog placeholder:text-game-fog/50 focus:border-game-toxic transition-all"
                />
                <Button
                  onClick={() => handleAddComment(post.id)}
                  size="icon"
                  className="bg-game-blood hover:bg-game-blood/80 text-game-toxic border border-game-blood/50"
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};