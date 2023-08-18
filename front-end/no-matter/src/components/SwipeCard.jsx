import React, { useState, useRef } from 'react';

function SwipeCard({ children }) {
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const containerRef = useRef(null);
  const cardRef = useRef(null);

  const cardWidth = cardRef.current?.clientWidth || 0;

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (isSwiping) {
      const containerWidth = containerRef.current?.clientWidth || 0;

      // 카드가 움직일 수 있는 최소 위치
      const minPosition = -100;
      // 카드가 움직일 수 있는 최대 위치
      const maxPosition = 100;

      // 이동 거리 계산
      const moveDistance = e.touches[0].clientX - startX;
      // 새로운 위치 계산
      let newPosition = endX + moveDistance;

      // 최소 위치와 최대 위치 사이에 위치하도록 제한
      newPosition = Math.max(minPosition, Math.min(maxPosition, newPosition));

      setEndX(newPosition);
    }
  };

  const handleTouchEnd = () => {
    if (isSwiping) {
      setIsSwiping(false);

      // 스와이프 된 거리가 50px 이하면 초기 위치로 돌아가도록 설정
      const threshold = 100;
      if (Math.abs(endX) < threshold) {
        setEndX(0);
      }
    }
  };

  return (
      <div
        ref={containerRef}
        className="card"
        style={{
          height: '80px',
          transition: 'transform 0.3s ease',
          transform: `translateX(${endX}px)`, position:'relative', padding:'0', width:"100%", zIndex:"1"
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        
      >
        <div className="card-body d-flex">{children}</div>
      </div>
  );
}

export default SwipeCard
