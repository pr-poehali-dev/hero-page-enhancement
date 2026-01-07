interface MediaItem {
  id: number;
  title: string;
  file: string;
  type: 'image' | 'video' | null;
  timestamp: string;
}

interface MediaSectionProps {
  mediaItems: MediaItem[];
}

export const MediaSection = ({ mediaItems }: MediaSectionProps) => {
  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="pixel-font text-3xl md:text-4xl text-white text-center mb-12 text-shadow-glow">
        Медиа
      </h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/80 border border-game-purple rounded-lg p-8">
          {mediaItems.length === 0 ? (
            <>
              <p className="text-white/90 text-center leading-relaxed mb-6">
                Здесь будут размещены скриншоты, трейлеры и другие медиа-материалы игры The Last Week.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-video bg-gradient-to-br from-game-purple/20 to-game-purple/5 rounded flex items-center justify-center">
                  <span className="pixel-font text-white/50 text-xs">Скоро</span>
                </div>
                <div className="aspect-video bg-gradient-to-br from-game-purple/20 to-game-purple/5 rounded flex items-center justify-center">
                  <span className="pixel-font text-white/50 text-xs">Скоро</span>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mediaItems.map((item) => (
                <div key={item.id} className="space-y-2 animate-scale-in">
                  {item.type === 'video' ? (
                    <video 
                      src={item.file} 
                      className="w-full aspect-video object-cover rounded border border-game-purple/30" 
                      controls
                    />
                  ) : (
                    <img 
                      src={item.file} 
                      alt={item.title} 
                      className="w-full aspect-video object-cover rounded border border-game-purple/30" 
                    />
                  )}
                  {item.title && (
                    <p className="text-white/80 text-sm text-center">{item.title}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};