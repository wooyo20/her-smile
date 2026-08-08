'use client';
import { useState } from 'react';

export default function TyphoonPunch() {
  // 状态定义
  const [hp, setHp] = useState(100);
  const [hitCount, setHitCount] = useState(0);
  const [isShake, setIsShake] = useState(false);
  const [isFly, setIsFly] = useState(false);
  const [showEaster, setShowEaster] = useState(false);

  // 达成彩蛋阈值
  const EASTER_TRIGGER = 15;

  const handlePunch = () => {
    if (hp <= 0) return;

    setIsShake(true);
    setHitCount(prev => {
      const newCount = prev + 1;
      if (newCount >= EASTER_TRIGGER) setShowEaster(true);
      console.log(newCount)
      return newCount;
    });
    setHp(prev => Math.max(0, prev - 7));

    // 抖动动画时序
    setTimeout(() => setIsShake(false), 300);
    setTimeout(() => setIsFly(true), 150);
    setTimeout(() => setIsFly(false), 450);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col items-center justify-center p-4 text-white select-none">
      <h1 className="text-[clamp(1.8rem,6vw,2.8rem)] font-bold mb-6 tracking-wider">
        肘击台风！⚡
      </h1>

      {/* 血条 */}
      <div className="w-full max-w-xs h-5 bg-gray-700 rounded-full overflow-hidden mb-8 border border-gray-500">
        <div
          className="h-full bg-gradient-to-r bg-red-500 transition-all duration-200"
          style={{ width: `${hp}%` }}
        />
      </div>
      <p className="mb-4 text-gray-300">剩余血量：{hp}</p>

      {/* 台风主体，点击区域 */}
      <button
        onClick={handlePunch}
        disabled={hp <= 0}
        className={`text-[clamp(6rem,22vw,10rem)] transition-all cursor-pointer active:scale-95
          ${isShake ? 'animate-shake' : ''}
          ${isFly ? 'translate-x-16 -translate-y-10 opacity-60' : ''}
          ${hp <= 0 ? 'opacity-30 scale-75' : 'hover:scale-105'}
        `}
      >
        🌀
      </button>

      <p className="mt-6 text-lg text-slate-300">点击台风狠狠肘击！</p>
      <p className="mt-2 text-slate-400">肘击次数：{hitCount}</p>

      {/* 彩蛋文案 */}
      {showEaster && (
        <div className="mt-6 p-4 bg-amber-600/20 border border-amber-400 rounded-xl animate-pulse">
          <p className="text-xl font-semibold text-amber-300">
            ✨加班取消！台风退散！可以回家睡觉啦！✨
          </p>
        </div>
      )}

      {/* 自定义动画样式 */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-12px) rotate(-6deg); }
          40% { transform: translateX(12px) rotate(6deg); }
          60% { transform: translateX(-8px) rotate(-3deg); }
          80% { transform: translateX(8px) rotate(3deg); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </main>
  );
}