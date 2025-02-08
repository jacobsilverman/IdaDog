
import { useState } from 'react';
import './Dogs.scss';
import annie from '/annie.png';
import annie2 from '/annie2.png';
import leo from '/leo.png';
import havi from '/havi.png';
import havi2 from '/havi2.png';
import havi3 from '/havi3.png';
import fly from '/fly.png';
import fly2 from '/fly2.png';
import fly3 from '/fly3.png';
import camille from '/camille.png';
import camille2 from '/camille2.png';

function Dogs() {
  const [dogs, setDogs] = useState({
    'annie': {
      'name': 'Annie',
      'images': [annie, annie2],
      'index': 0,
      'description': "Annie is exactly what a man is looking for when trying to acquire a loyal companion. She is quick to adapt and active listener which allows her to be trusted with tons of freedom. She defends our property and is always on active alert for our safety."
    },
    'leo': {
      'name': 'Leo',
      'images': [leo],
      'index': 0,
      'description': "The name Leo brings to mind a confident and loyal companion who carries himself with a quiet dignity but never hesitates to dive into fun and adventure. Leo might be the kind of dog who’s always ready for a game of fetch, a long walk, or a cuddle session at the end of the day. His name suits a dog with a big heart, fierce loyalty, and a personality that shines as brightly as a lion's mane."
    },
    'havi': {
      'name': 'Havi',
      'images': [havi, havi2, havi3],
      'index': 0,
      'description': "Havi likely resembles a tiny cloud of happiness, trotting around with a playful bounce in their step. Havi is the kind of dog who makes every day brighter just by being their adorable, spirited self."
    },
    'fly': {
      'name': 'Fly',
      'images': [fly, fly2, fly3],
      'index': 0,
      'description': "My sister's childhood male Chinese Crested Powder Puff was, in many ways, a whirlwind of chaos that taught some hard but valuable lessons about living with a high-maintenance pet. His lack of poppy training, incessant barking, and refusal to be trained were enough to test the patience of a saint. He was a daily challenge wrapped in fur, reminding everyone around him that not all pets come easy."
    },
    'camille': {
      'name': 'Ms. Camille',
      'images': [camille, camille2],
      'index': 0,
      'description': "My childhood female Chinese Crested was a dog whose beauty was truly in her soul. Her well-behaved nature made her a joy to live with, the kind of companion who enriched every moment with her calm and gentle presence. What she may have lacked in the conventional 'cute' department, she more than made up for with a personality that could melt hearts."
    },
  });

  const handleIndexChange = (dog, action, newIndex = 0) => {
    setDogs((prev) => {
      const currentIndex = prev[dog].index;
      const imagesLength = prev[dog].images.length;
  
      let updatedIndex;
      switch (action) {
        case 'set':
          updatedIndex = newIndex;
          break;
        case 'next':
          updatedIndex = (currentIndex + 1) % imagesLength;
          break;
        case 'prev':
          updatedIndex = (currentIndex - 1 + imagesLength) % imagesLength;
          break;
        default:
          return prev; // No changes if the action is invalid
      }
  
      return {
        ...prev,
        [dog]: {
          ...prev[dog],
          index: updatedIndex,
        },
      };
    });
  };

  const DogElement = (dog) => {
    return (
      <div>
        <div>
          <h2>{dogs[dog]['name']}</h2>
        </div>
        <div className="carousel">
          <button onClick={() => handleIndexChange(dog, 'prev')} className="carousel-button">&#8249;</button>
          <img
            className="dog-image"
            src={dogs[dog]['images'][dogs[dog]['index']]}
            alt={`Dog ${dogs[dog]['name']} ${dogs[dog]['index'] + 1}`}
          />
          <button onClick={() => handleIndexChange(dog, 'next')} className="carousel-button">&#8250;</button>
        </div>
        <div className="carousel-indicators">
          {dogs[dog]['images'].map((_, index) => (
            <button
              key={index}
              className={`indicator-button ${index === dogs[dog]['index'] ? 'active' : ''}`}
              onClick={() => handleIndexChange(dog, 'set', index)}
            />
          ))}
        </div>
        
        <div className='dog-description'>
          {dogs[dog]['description']}
        </div>
      </div>
    );
  }

  return (
    <div className='dog_carousels'>
      {DogElement('annie')}
      {DogElement('havi')}
      {DogElement('camille')}
      {DogElement('fly')}
      {DogElement('leo')}
    </div>
  );
}

export default Dogs;