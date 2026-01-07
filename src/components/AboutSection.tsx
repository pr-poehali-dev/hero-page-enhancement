export const AboutSection = () => {
  return (
    <div className="container mx-auto px-4 py-20 pb-32">
      <h2 className="pixel-font text-3xl md:text-4xl text-white text-center mb-12 text-shadow-glow">
        Об игре
      </h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/80 border border-game-purple rounded-lg p-8">
          <p className="text-white/90 leading-relaxed mb-6">
            <span className="pixel-font text-game-purple">The Last Week</span> — это атмосферная игра о последних днях перед важным событием.
          </p>
          
          <div className="space-y-4 text-white/80">
            <div className="flex items-start gap-3">
              <span className="text-game-purple text-xl">●</span>
              <p>Уникальная атмосфера и глубокий сюжет</p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-game-purple text-xl">●</span>
              <p>Пиксельная графика в стиле ретро</p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-game-purple text-xl">●</span>
              <p>Множество концовок в зависимости от ваших решений</p>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-game-purple text-xl">●</span>
              <p>Запоминающийся саундтрек</p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-game-purple/30">
            <p className="text-white/60 text-sm text-center pixel-font">
              Следите за обновлениями в разделе новостей
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
