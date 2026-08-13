import React from 'react';

interface HeroTextProps {
  name: string;
  age?: string;
}

const HeroText: React.FC<HeroTextProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Happy Birthday {name}!</h1>
      {age && <p>Turning {age} years old</p>}
    </div>
  );
};

export default HeroText;