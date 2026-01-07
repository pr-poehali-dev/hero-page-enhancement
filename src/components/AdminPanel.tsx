import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface AdminPanelProps {
  onAddPost: (post: any) => void;
  onUpdatePost: (post: any) => void;
  onDeletePost: (id: number) => void;
  onUpdateBackground: (image: string) => void;
  onRemoveBackground: () => void;
  onAddMedia: (media: any) => void;
  posts: any[];
}

export const AdminPanel = ({ 
  onAddPost, 
  onUpdatePost,
  onDeletePost,
  onUpdateBackground, 
  onRemoveBackground,
  onAddMedia,
  posts 
}: AdminPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'edit'>('posts');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaFile, setMediaFile] = useState<string | null>(null);
  const [mediaFileType, setMediaFileType] = useState<'image' | 'video' | null>(null);
  const [editingPost, setEditingPost] = useState<any>(null);

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
      toast.error('Выберите файл для загрузки');
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

  const startEditPost = (post: any) => {
    setEditingPost(post);
    setActiveTab('edit');
  };

  const handleUpdatePost = () => {
    if (editingPost) {
      onUpdatePost(editingPost);
      setEditingPost(null);
      setActiveTab('posts');
      toast.success('Публикация обновлена!');
    }
  };

  const handleDeletePost = (id: number) => {
    if (confirm('Удалить публикацию?')) {
      onDeletePost(id);
      toast.success('Публикация удалена!');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-8 top-8 w-12 h-12 rounded-sm bg-game-blood hover:bg-game-blood/80 flex items-center justify-center text-game-toxic shadow-lg shadow-game-blood/50 animate-float z-50 horror-border transition-all"
      >
        <Icon name="Lock" size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 animate-fade-in backdrop-blur-sm">
          <Card className="w-full max-w-2xl bg-game-night/95 border-2 border-game-blood p-6 max-h-[90vh] overflow-y-auto shadow-2xl shadow-game-blood/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="pixel-font text-xl text-game-toxic glitch">Admin Panel</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-game-blood hover:bg-game-blood/20 hover:text-game-toxic transition-all"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="flex gap-2 mb-6">
              <Button
                onClick={() => setActiveTab('posts')}
                className={`flex-1 ${activeTab === 'posts' ? 'bg-game-blood text-game-toxic' : 'bg-game-night/50 text-game-fog'} hover:bg-game-blood/80 hover:text-game-toxic pixel-font text-xs border border-game-blood/50 transition-all`}
              >
                Публикации
              </Button>
              <Button
                onClick={() => setActiveTab('media')}
                className={`flex-1 ${activeTab === 'media' ? 'bg-game-blood text-game-toxic' : 'bg-game-night/50 text-game-fog'} hover:bg-game-blood/80 hover:text-game-toxic pixel-font text-xs border border-game-blood/50 transition-all`}
              >
                Медиа
              </Button>
              {editingPost && (
                <Button
                  onClick={() => setActiveTab('edit')}
                  className={`flex-1 ${activeTab === 'edit' ? 'bg-game-blood text-game-toxic' : 'bg-game-night/50 text-game-fog'} hover:bg-game-blood/80 hover:text-game-toxic pixel-font text-xs border border-game-blood/50 transition-all`}
                >
                  Редактор
                </Button>
              )}
            </div>

            {activeTab === 'posts' && (
            <div className="space-y-4">
              <div>
                <label className="text-game-fog text-sm mb-2 block pixel-font">Заголовок</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Введите заголовок..."
                  className="bg-game-night/50 border-game-forest text-game-fog placeholder:text-game-fog/50 focus:border-game-toxic transition-all"
                />
              </div>

              <div>
                <label className="text-game-fog text-sm mb-2 block pixel-font">Текст</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Введите текст публикации..."
                  className="bg-game-night/50 border-game-forest text-game-fog placeholder:text-game-fog/50 min-h-32 focus:border-game-toxic transition-all"
                />
              </div>

              <div>
                <label className="text-game-fog text-sm mb-2 block pixel-font">Фото или видео</label>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="bg-game-night/50 border-game-forest text-game-fog file:text-game-fog cursor-pointer"
                />
                {media && (
                  <div className="mt-2 relative animate-scale-in">
                    {mediaType === 'image' ? (
                      <img src={media} alt="Preview" className="w-full h-48 object-cover rounded border-2 border-game-blood/50" />
                    ) : (
                      <video src={media} className="w-full h-48 object-cover rounded border-2 border-game-blood/50" controls />
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={removeMedia}
                      className="absolute top-2 right-2 bg-game-blood hover:bg-game-blood/80"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <label className="text-game-fog text-sm mb-2 block pixel-font">Фон сайта</label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundUpload}
                    className="bg-game-night/50 border-game-forest text-game-fog file:text-game-fog cursor-pointer flex-1"
                  />
                  <Button
                    onClick={onRemoveBackground}
                    variant="outline"
                    className="border-game-blood text-game-blood hover:bg-game-blood hover:text-game-toxic"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handlePublish}
                className="w-full bg-game-blood hover:bg-game-blood/80 text-game-toxic pixel-font text-xs shadow-lg shadow-game-blood/30 transition-all"
              >
                Опубликовать
              </Button>

              <div className="mt-6 space-y-2">
                <label className="text-game-fog text-sm pixel-font block">Список публикаций</label>
                {posts.map((post) => (
                  <div key={post.id} className="bg-game-night/50 border border-game-forest p-3 rounded flex justify-between items-center animate-fade-in">
                    <div className="flex-1">
                      <p className="text-game-fog text-sm">{post.title || 'Без названия'}</p>
                      <p className="text-game-fog/60 text-xs">{new Date(post.timestamp).toLocaleString('ru-RU')}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => startEditPost(post)}
                        className="text-game-toxic hover:bg-game-forest/30"
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeletePost(post.id)}
                        className="text-game-blood hover:bg-game-blood/20"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            )}

            {activeTab === 'media' && (
            <div className="space-y-4">
              <div>
                <label className="text-game-fog text-sm mb-2 block pixel-font">Название</label>
                <Input
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  placeholder="Название медиа (необязательно)..."
                  className="bg-game-night/50 border-game-forest text-game-fog placeholder:text-game-fog/50 focus:border-game-toxic transition-all"
                />
              </div>

              <div>
                <label className="text-game-fog text-sm mb-2 block pixel-font">Видео или изображение</label>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaFileUpload}
                  className="bg-game-night/50 border-game-forest text-game-fog file:text-game-fog cursor-pointer"
                />
                {mediaFile && (
                  <div className="mt-2 relative animate-scale-in">
                    {mediaFileType === 'image' ? (
                      <img src={mediaFile} alt="Preview" className="w-full h-48 object-cover rounded border-2 border-game-blood/50" />
                    ) : (
                      <video src={mediaFile} className="w-full h-48 object-cover rounded border-2 border-game-blood/50" controls />
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={removeMediaFile}
                      className="absolute top-2 right-2 bg-game-blood hover:bg-game-blood/80"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                )}
              </div>

              <Button
                onClick={handleAddMedia}
                className="w-full bg-game-blood hover:bg-game-blood/80 text-game-toxic pixel-font text-xs shadow-lg shadow-game-blood/30 transition-all"
              >
                Добавить в медиа
              </Button>
            </div>
            )}

            {activeTab === 'edit' && editingPost && (
            <div className="space-y-4">
              <div>
                <label className="text-game-fog text-sm mb-2 block pixel-font">Заголовок</label>
                <Input
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                  className="bg-game-night/50 border-game-forest text-game-fog focus:border-game-toxic transition-all"
                />
              </div>

              <div>
                <label className="text-game-fog text-sm mb-2 block pixel-font">Текст</label>
                <Textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                  className="bg-game-night/50 border-game-forest text-game-fog min-h-32 focus:border-game-toxic transition-all"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleUpdatePost}
                  className="flex-1 bg-game-blood hover:bg-game-blood/80 text-game-toxic pixel-font text-xs"
                >
                  Сохранить
                </Button>
                <Button
                  onClick={() => {
                    setEditingPost(null);
                    setActiveTab('posts');
                  }}
                  variant="outline"
                  className="flex-1 border-game-forest text-game-fog hover:bg-game-forest/20"
                >
                  Отмена
                </Button>
              </div>
            </div>
            )}
          </Card>
        </div>
      )}
    </>
  );
};
