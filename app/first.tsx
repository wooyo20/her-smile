"use client";
import { useCallback, useState } from 'react';
import './styles/first.css'

export default function First() {
    const [showModal, setShowModal] = useState(false);
    const [test, setTest] = useState(0);
    const openModal = useCallback(() => {
        setShowModal(true);
        setTest(prov => prov + 1);
    }, [])


    return (
        <div className="handmadePage">
            <div className="hdmtTitleConatiner">
                <div className="hdmtTitle">重生一世！万万没想到，她要和我拼豆</div>
                <div className='hdmtTitleSec'>系统提示：恭喜宿主成功解锁双人拼豆剧本</div>
            </div>
            <div className="hdmtWelcomeContainer">
                <div className='hdmtWelcomeText'>· 今天也要玩得开心哦 ·</div>
                <div className="hdmtWelcomeTip">不开心你直接揍下面这个人一顿</div>
                <div className="hdmtImg" onClick={openModal} />
                <div className="hdmtWelcomeGuide" >⬆️戳头像看看我心里在想啥⬆️</div>
                <div className="hdmtWelcomeBtn">无数次重生，目标始终是你</div>
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
                    <div style={{
                        background: '#fffef5',
                        padding: '32px 40px',
                        borderRadius: '16px',
                        maxWidth: '85%',
                        fontSize: '1.2rem',
                        color: '#333',
                        boxShadow: '0 6px 22px rgba(0,0,0,0.15)'
                    }} onClick={(e) => e.stopPropagation()}>
                        <p style={{ margin: 0 }}>
                            这里什么也没有，看到你我就大脑一片空白
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
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
                            关闭
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
