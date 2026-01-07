import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface AdminPanelProps {
  onAddPost: (post: any) => void;
  onUpdateBackground: (image: string) => void;
  onAddMedia: (media: any) => void;
}

export const AdminPanel = ({ onAddPost, onUpdateBackground, onAddMedia }: AdminPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'media'>('posts');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaFile, setMediaFile] = useState<string | null>(null);
  const [mediaFileType, setMediaFileType] = useState<'image' | 'video' | null>(null);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setMedia(result);
        setMediaType(file.type.startsWith('video') ? 'video' : 'image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateBackground(reader.result as string);
        toast.success('Фон обновлен!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    if (!content && !media) {
      setShowTypewriter(true);
      setTimeout(() => setShowTypewriter(false), 2000);
      return;
    }

    const post = {
      id: Date.now(),
      title,
      content,
      media,
      mediaType,
      likes: 0,
      comments: [],
      timestamp: new Date().toISOString(),
    };

    onAddPost(post);
    setTitle('');
    setContent('');
    setMedia(null);
    setMediaType(null);
    toast.success('Публикация добавлена!');
  };

  const removeMedia = () => {
    setMedia(null);
    setMediaType(null);
  };

  const handleMediaFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setMediaFile(result);
        setMediaFileType(file.type.startsWith('video') ? 'video' : 'image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMedia = () => {
    if (!mediaFile) {
      setShowTypewriter(true);
      setTimeout(() => setShowTypewriter(false), 2000);
      return;
    }

    const mediaItem = {
      id: Date.now(),
      title: mediaTitle || 'Без названия',
      file: mediaFile,
      type: mediaFileType,
      timestamp: new Date().toISOString(),
    };

    onAddMedia(mediaItem);
    setMediaTitle('');
    setMediaFile(null);
    setMediaFileType(null);
    toast.success('Медиа добавлено!');
  };

  const removeMediaFile = () => {
    setMediaFile(null);
    setMediaFileType(null);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-8 top-8 w-12 h-12 rounded-full bg-game-purple hover:bg-game-purple/80 flex items-center justify-center text-white shadow-lg animate-float z-50"
      >
        <Icon name="Lock" size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-black/90 border-game-purple p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="pixel-font text-xl text-white">Admin Panel</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-game-purple/20"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="flex gap-2 mb-6">
              <Button
                onClick={() => setActiveTab('posts')}
                className={`flex-1 ${activeTab === 'posts' ? 'bg-game-purple' : 'bg-white/10'} hover:bg-game-purple/80 text-white pixel-font text-xs`}
              >
                Публикации
              </Button>
              <Button
                onClick={() => setActiveTab('media')}
                className={`flex-1 ${activeTab === 'media' ? 'bg-game-purple' : 'bg-white/10'} hover:bg-game-purple/80 text-white pixel-font text-xs`}
              >
                Медиа
              </Button>
            </div>

            {activeTab === 'posts' && (
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm mb-2 block">Заголовок</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Введите заголовок..."
                  className="bg-white/10 border-game-purple text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Текст</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Введите текст публикации..."
                  className="bg-white/10 border-game-purple text-white placeholder:text-gray-400 min-h-32"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Фото или видео</label>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="bg-white/10 border-game-purple text-white"
                />
                {media && (
                  <div className="mt-2 relative">
                    {mediaType === 'image' ? (
                      <img src={media} alt="Preview" className="w-full h-48 object-cover rounded" />
                    ) : (
                      <video src={media} className="w-full h-48 object-cover rounded" controls />
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={removeMedia}
                      className="absolute top-2 right-2"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Фон сайта</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundUpload}
                  className="bg-white/10 border-game-purple text-white"
                />
              </div>

              {showTypewriter && (
                <div className="text-game-red pixel-font text-sm overflow-hidden whitespace-nowrap animate-typewriter">
                  File not selected
                </div>
              )}

              <Button
                onClick={handlePublish}
                className="w-full bg-game-purple hover:bg-game-purple/80 text-white pixel-font text-xs"
              >
                Опубликовать
              </Button>
            </div>
            )}

            {activeTab === 'media' && (
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm mb-2 block">Название</label>
                <Input
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  placeholder="Название медиа (необязательно)..."
                  className="bg-white/10 border-game-purple text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Видео или изображение</label>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaFileUpload}
                  className="bg-white/10 border-game-purple text-white"
                />
                {mediaFile && (
                  <div className="mt-2 relative">
                    {mediaFileType === 'image' ? (
                      <img src={mediaFile} alt="Preview" className="w-full h-48 object-cover rounded" />
                    ) : (
                      <video src={mediaFile} className="w-full h-48 object-cover rounded" controls />
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={removeMediaFile}
                      className="absolute top-2 right-2"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                )}
              </div>

              {showTypewriter && (
                <div className="text-game-red pixel-font text-sm overflow-hidden whitespace-nowrap animate-typewriter">
                  File not selected
                </div>
              )}

              <Button
                onClick={handleAddMedia}
                className="w-full bg-game-purple hover:bg-game-purple/80 text-white pixel-font text-xs"
              >
                Добавить в медиа
              </Button>
            </div>
            )}
          </Card>
        </div>
      )}
    </>
  );
};