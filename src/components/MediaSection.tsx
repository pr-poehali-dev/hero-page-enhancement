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
      <h2 className="pixel-font text-3xl md:text-4xl text-game-toxic text-center mb-12 text-shadow-glow glitch">
        Медиа
      </h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-game-night/90 border-2 border-game-blood/50 rounded-lg p-8 shadow-xl shadow-game-blood/20 horror-border">
          {mediaItems.length === 0 ? (
            <>
              <p className="text-game-fog text-center leading-relaxed mb-6">
                Здесь будут размещены скриншоты, трейлеры и другие медиа-материалы игры The Last Week.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-video bg-gradient-to-br from-game-forest/30 to-game-night rounded border-2 border-game-forest/50 flex items-center justify-center">
                  <span className="pixel-font text-game-toxic/50 text-xs animate-pulse">Скоро</span>
                </div>
                <div className="aspect-video bg-gradient-to-br from-game-blood/20 to-game-night rounded border-2 border-game-blood/50 flex items-center justify-center">
                  <span className="pixel-font text-game-blood/50 text-xs animate-pulse">Скоро</span>
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
                      className="w-full aspect-video object-cover rounded border-2 border-game-blood/50 shadow-lg shadow-game-blood/20" 
                      controls
                    />
                  ) : (
                    <img 
                      src={item.file} 
                      alt={item.title} 
                      className="w-full aspect-video object-cover rounded border-2 border-game-forest/50 shadow-lg shadow-game-forest/20" 
                    />
                  )}
                  {item.title && (
                    <p className="text-game-fog text-sm text-center pixel-font">{item.title}</p>
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