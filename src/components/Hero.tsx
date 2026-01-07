export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-game-forest/20 via-transparent to-game-blood/20 pointer-events-none" />
      
      <div className="relative z-10">
        <h1 className="pixel-font text-4xl md:text-6xl lg:text-7xl text-game-toxic text-shadow-glow text-center leading-relaxed glitch animate-float">
          The Last Week
        </h1>
        <p className="pixel-font text-xs md:text-sm text-game-fog/80 text-center mt-6 tracking-wider animate-fade-in">
          Выживание · Хоррор · Пиксельная Фантастика
        </p>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1 animate-float">
        <div className="w-2 h-2 bg-game-blood rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-game-toxic rounded-full animate-pulse delay-75" />
        <div className="w-2 h-2 bg-game-fog rounded-full animate-pulse delay-150" />
      </div>
    </div>
  );
};