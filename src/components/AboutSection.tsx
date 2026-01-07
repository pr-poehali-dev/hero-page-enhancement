export const AboutSection = () => {
  return (
    <div className="container mx-auto px-4 py-20 pb-32">
      <h2 className="pixel-font text-3xl md:text-4xl text-game-toxic text-center mb-12 text-shadow-glow glitch">
        Об игре
      </h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-game-night/90 border-2 border-game-blood/50 rounded-lg p-8 shadow-xl shadow-game-blood/20 horror-border">
          <p className="text-game-fog leading-relaxed mb-6">
            <span className="pixel-font text-game-blood">The Last Week</span> — пиксельный хоррор-выживание в заброшенном лесу. Семь дней до спасения. Или семь дней до конца?
          </p>
          
          <div className="space-y-4 text-game-fog">
            <div className="flex items-start gap-3 group hover:translate-x-2 transition-transform">
              <span className="text-game-blood text-xl animate-pulse">☠</span>
              <p>Выживание в жестоком мире, где каждая ночь — испытание</p>
            </div>
            
            <div className="flex items-start gap-3 group hover:translate-x-2 transition-transform">
              <span className="text-game-toxic text-xl animate-pulse">⚡</span>
              <p>Пиксельная графика с атмосферой мрачного леса и аномалий</p>
            </div>
            
            <div className="flex items-start gap-3 group hover:translate-x-2 transition-transform">
              <span className="text-game-forest text-xl animate-pulse">🌲</span>
              <p>Исследуйте лес, ищите ресурсы, прячьтесь от существ</p>
            </div>
            
            <div className="flex items-start gap-3 group hover:translate-x-2 transition-transform">
              <span className="text-game-blood text-xl animate-pulse">👁</span>
              <p>Множество концовок — выживете ли вы до последней недели?</p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-game-forest/30">
            <p className="text-game-fog/80 text-sm text-center pixel-font animate-pulse">
              Следите за обновлениями в разделе новостей
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};