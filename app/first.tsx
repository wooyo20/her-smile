"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './styles/first.css'

export default function First() {
    const [showModal, setShowModal] = useState(false);
    const openModal = useCallback(() => {
        setShowModal(true);
    }, [])

    const closeModal = useCallback(() => {
        setShowModal(false);
    }, [])

    const [modalStep, setModalStep] = useState(0);

    const modalContent = useMemo(() => {
        if (modalStep === 0) {
            return {
                content: (
                    <p style={{ margin: 0 }}>
                        这里什么也没有，看到你就大脑一片空白
                    </p>
                ),
                btnText: '再看看',
                btnClick: () => {
                    setModalStep(1);
                },
            };
        } else if (modalStep === 1) {
            return {
                content: (
                    <div className='hdmtPoetry'>
                        <div className="verse">你的裙子怎么穿的？</div>
                        <div className="verse">你的眉毛怎么弯的？</div>
                        <div className="verse">你的头发怎么盘的？</div>
                        <div className="verse">记不清你，</div>
                        <div className="verse">所以要见你，</div>
                        <div className="verse">要再见你。</div>
                        <div className="author">——冯唐《再见》</div>
                    </div>
                ),
                btnText: '关闭',
                btnClick: () => {
                    setModalStep(0);
                    closeModal();
                },
            };
        }
    }, [closeModal, modalStep]);

    const bgClassList = [
        "bg0",
        "bg1",
        "bg2"
    ];

    const [colorIndex, setColorIndex] = useState(0);
    const timer = useRef<NodeJS.Timeout>(null);

    // // 开启定时器，每10秒切换下标
    // useEffect(() => {
    //     timer.current = setInterval(() => {
    //         setColorIndex(prev => (prev + 1) % bgClassList.length);
    //     }, 10000);

    //     // 组件销毁清除定时器，防止内存泄漏
    //     return () => {
    //         if (timer.current) {
    //             clearInterval(timer.current)
    //         };
    //     };
    // }, [bgClassList.length]);

    // const nextBg = useCallback(() => {
    //     setColorIndex(prev => (prev + 1) % bgClassList.length);
    // }, [bgClassList.length])

    return (
        <div className={`handmadePage ${bgClassList[colorIndex]}`}>
            <div className="hdmtTitleConatiner">
                <div className="hdmtTitle">一觉醒来，全球人类羽毛球水平下降1000倍?</div>
                <div className='hdmtTitleSec'>系统提示：恭喜宿主解锁羽毛球陪打主线任务</div>
                <div className='hdmtTitleSec'>任务目标：精准喂球、遗憾落败</div>
            </div>
            <div className="hdmtWelcomeContainer">
                <div className='hdmtWelcomeText'>· 今天也要玩得开心哦 ·</div>
                <div className="hdmtWelcomeTip">不开心你直接揍下面这个人一顿</div>
                <div className="hdmtImg" onClick={openModal} />
                <div className="hdmtWelcomeGuide" >⬆️可以戳⬆️</div>
                <div className="hdmtWelcomeBtn">一局终了，还有无数回合可期</div>
            </div>
            {/* 弹窗遮罩层 */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 999
                }} >
                    {/* 弹窗盒子 */}
                    <div
                        className='hdmtWelWhy'
                        onClick={(e) => e.stopPropagation()}
                    >
                        {modalContent?.content}
                        <button
                            onClick={() => modalContent?.btnClick?.()}
                            style={{
                                marginTop: '20px',
                                padding: '8px 22px',
                                border: 'none',
                                borderRadius: '8px',
                                backgroundColor: '#e05b8c',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}
                        >
                            {modalContent?.btnText}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
