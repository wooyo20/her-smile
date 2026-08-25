'use client';
import { useEffect, useRef } from 'react';
import cowiImg from '../../../public/cow.png'
import Image from 'next/image';

const thoughts = [
  "等周末，等周末",
  "我见众生皆草木，唯有见你是青山",
  "什么时候才能中1000万",
  "急急急",
  "金风玉露一相逢，便胜却人间无数",
  "嘿嘿嘿",
  "台风别来，退退退",
  "幸的识卿桃花面",
];

// 时序参数
const RISE_DURATION = 1000;
const FADE_DURATION = 1000;
const SHOW_TIME = 2600;

export default function Page() {
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const areaDom = areaRef.current;
    if (!areaDom) return;

    let index = 0;
    let prevWord: HTMLDivElement | null = null;
    let timer: ReturnType<typeof setInterval>;

    function spawnWord() {
      const text = thoughts[index % thoughts.length];
      index++;

      const el = document.createElement('div');
      el.className = 'float-word';
      el.innerText = text;

      const offsetX = (Math.random() - 0.5) * 120;
      const scale = 0.85 + Math.random() * 0.35;
      const rotate = (Math.random() - 0.5) * 8;

      el.style.transform = `translateX(-50%) translateX(${offsetX}px) scale(${scale}) rotate(${rotate}deg)`;
      el.style.opacity = '0';
      areaDom?.appendChild(el);

      // 向上飘动画
      el.animate([
        { opacity: 0, transform: `translateX(-50%) translateX(${offsetX}px) scale(${scale}) rotate(${rotate}deg) translateY(0px)` },
        { opacity: 0.9, transform: `translateX(-50%) translateX(${offsetX}px) scale(${scale}) rotate(${rotate}deg) translateY(-110px)` }
      ], {
        duration: RISE_DURATION,
        easing: 'ease-out',
        fill: 'forwards'
      });

      // 旧文字同步淡出
      if (prevWord) {
        const old = prevWord;
        old.animate([{ opacity: 0.9 }, { opacity: 0 }], {
          duration: FADE_DURATION,
          easing: 'ease-in',
          fill: 'forwards'
        });
        setTimeout(() => old.remove(), FADE_DURATION);
      }

      prevWord = el;
    }

    spawnWord();
    timer = setInterval(spawnWord, SHOW_TIME);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <main className="page">
      <div className="container">
        <div className="float-text-area" ref={areaRef} />
        {/* 小牛图片位置，后续替换 */}
        <div className="cowWrap">
          <Image src={cowiImg} alt="自闭小牛" className="cowImg"></Image>
        </div>
        <div className="footerText">
          至少要见面上万次
        </div>
      </div>

      <style jsx global>{`
        html {
          font-size: 16px;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          background-color: #1c1c2c;
          color: #e2e2e8;
          font-family: system-ui, -apple-system, sans-serif;
          overflow: hidden;
        }
        .page {
          min-height: 100vh;
          padding: 1.5rem;
          display: flex;
          justify-content: center;
          /* 整体向上偏移，原来垂直居中，现在往上挪 */
          align-items: flex-start;
          padding-top: 8rem;
        }
        .container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .float-text-area {
          position: relative;
          width: 20rem;
          height: 16.25rem;
          margin-bottom: 0.625rem;
        }
        .float-word {
          position: absolute;
          bottom: 0;
          left: 50%;
          white-space: nowrap;
          pointer-events: none;
          font-size: 1.375rem;
          color: #eeeeee;
        }
        .cowWrap {
          width: 11.25rem;
          height: 11.25rem;
        }
        .cowImg {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .footerText {
          margin-top: 2.25rem;
          font-size: 0.875rem;
          color: #8f8f9a;
          text-align: center;
          line-height: 1.6;
        }
        @media (max-width: 480px) {
          .page {
            padding-top: 5rem;
          }
          .float-text-area {
            width: 17.5rem;
            height: 13.75rem;
          }
          .cowWrap {
            width: 9.375rem;
            height: 9.375rem;
          }
          .float-word {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </main>
  );
}
