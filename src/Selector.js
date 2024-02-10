import React, { useState } from 'react';

const Selector = ({ position, setPosition, color }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingLittle, setIsDraggingLittle] = useState(false);
  const [initialPosition, setInitialPosition] = useState(position);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setInitialPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
      height: position.height,
      width: position.width,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      setPosition({
        x: event.clientX - initialPosition.x,
        y: event.clientY - initialPosition.y,
        height: initialPosition.height,
        width: initialPosition.width,
      });
    }
  };

  const handleMouseDownLittle = (event) => {
    setIsDraggingLittle(true);
    setInitialPosition({
      x: position.x,
      y: position.y,
      height: event.clientY - position.height,
      width: event.clientX - position.width,
    });
  };

  const handleMouseUpLittle = () => {
    setIsDraggingLittle(false);
  };

  const handleMouseMoveLittle = (event) => {
    if (isDraggingLittle) {
      setPosition({
        x: initialPosition.x,
        y: initialPosition.y,
        height: event.clientY - initialPosition.height,
        width: event.clientX - initialPosition.width,
      });
    }
  };

  const onMouseLeave = (event) => {
    setIsDraggingLittle(false);
  };

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <div
        style={{
          backgroundColor: color,
          opacity: 0.5,
          zIndex: 2,
          width: position.width,
          height: position.height,
          position: 'absolute',
          top: position.y,
          left: position.x,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></div>
      <div
        style={{
          backgroundColor: color,
          opacity: 1,
          width: '75px',
          height: '75px',
          zIndex: 3,
          position: 'absolute',
          bottom: -position.height - position.y,
          right: -position.width - position.x,
        }}
        onMouseDown={handleMouseDownLittle}
        onMouseUp={handleMouseUpLittle}
        onMouseMove={handleMouseMoveLittle}
        onMouseLeave={(e) => onMouseLeave(e)}
      ></div>
    </div>
  );
};

export default Selector;
