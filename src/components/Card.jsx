import './Card.css';
import { useState } from 'react';

export default function Card({
  id,
  name,
  image,
  count,
  modifiable = false,
  handleClick,
  handleMultiplicityChange,
}) {
  useState(count);
  // Increases the count of the corresponding card in the parent state by 1
  const handleDecreaseCount = () => {
    if (count === 1) return;
    handleMultiplicityChange(count - 1);
  };
  const handleIncreaseCount = () => {
    handleMultiplicityChange(count + 1);
  };

  return (
    <div
      key={id}
      style={{
        display: 'inline-block',
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 15,
        overflow: 'auto',
        width: 200,
        aspectRatio: '0.485',
      }}
    >
      <img
        className="cardImage"
        onClick={handleClick}
        src={image}
        alt={name}
        referrerPolicy="no-referrer"
      />
      {count ? (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          {modifiable && <button onClick={handleDecreaseCount}>{'<'}</button>}
          <p style={{ overflow: 'auto' }}>x{count}</p>
          {modifiable && <button onClick={handleIncreaseCount}>{'>'}</button>}
        </div>
      ) : null}
      <h5 style={{ overflow: 'auto' }}>{name}</h5>
    </div>
  );
}
