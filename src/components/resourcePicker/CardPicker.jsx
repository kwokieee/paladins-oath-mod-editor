import { useState } from 'react';
import { getCardsWithCounts } from '../../utils';
import { GameResources } from '../../data/GameResources';
import Card from '../Card';

export default function CardPicker({ selected, handleSubmit }) {
  const selectedCards = Object.values(getCardsWithCounts(selected));
  const [cards, setCards] = useState(
    Object.values(GameResources.Card).map((cardDetails) => {
      const selectedCard = selectedCards.find((selectedCard) => selectedCard.id === cardDetails.id);
      if (selectedCard) {
        cardDetails.isSelected = true;
        cardDetails.count = selectedCard.count;
      } else {
        cardDetails.isSelected = false;
      }
      return cardDetails;
    }),
  );

  const selectCard = (id) => {
    return () => {
      setCards(
        cards.map((cardDetails) => {
          if (cardDetails.id !== id) {
            return cardDetails;
          }
          return {
            ...cardDetails,
            isSelected: true,
            count: 1,
          };
        }),
      );
    };
  };

  const deselectCard = (id) => {
    return () => {
      setCards(
        cards.map((cardDetails) => {
          if (cardDetails.id !== id) {
            return cardDetails;
          }
          return {
            ...cardDetails,
            isSelected: false,
            count: undefined,
          };
        }),
      );
    };
  };

  const handleMultiplicityChange = (id) => {
    return (newCount) => {
      setCards(
        cards.map((cardDetails) => {
          if (cardDetails.id !== id) {
            return cardDetails;
          }
          return {
            ...cardDetails,
            count: newCount,
          };
        }),
      );
    };
  };

  return (
    <div>
      <div>
        {/* TODO: Show the selected cards first, then mod specific cards, then vanilla game cards */}
        <hr />
        <h3>Selected</h3>
        <hr />
        {cards.map(
          (cardDetails) =>
            cardDetails.isSelected && (
              <Card
                key={cardDetails.id}
                {...cardDetails}
                handleClick={deselectCard(cardDetails.id)}
                modifiable
                handleMultiplicityChange={handleMultiplicityChange(cardDetails.id)}
              />
            ),
        )}
        <hr />
        <h3>Available</h3>
        <hr />
        <h4>Actions</h4>
        {cards.map(
          (cardDetails) =>
            !cardDetails.isSelected &&
            cardDetails.properties.cardType == 'Action' && (
              <Card
                key={cardDetails.id}
                {...cardDetails}
                handleClick={selectCard(cardDetails.id)}
              />
            ),
        )}
        <hr />
        <h4>Spells</h4>
        {cards.map(
          (cardDetails) =>
            !cardDetails.isSelected &&
            cardDetails.properties.cardType == 'Spell' && (
              <Card
                key={cardDetails.id}
                {...cardDetails}
                handleClick={selectCard(cardDetails.id)}
              />
            ),
        )}
        <hr />
        <h4>Relics</h4>
        {cards.map(
          (cardDetails) =>
            !cardDetails.isSelected &&
            cardDetails.properties.cardType == 'Relic' && (
              <Card
                key={cardDetails.id}
                {...cardDetails}
                handleClick={selectCard(cardDetails.id)}
              />
            ),
        )}
      </div>
      <button
        onClick={() =>
          handleSubmit(
            cards
              .filter((cardDetails) => cardDetails.isSelected)
              .flatMap((cardDetails) => {
                const card = {
                  id: cardDetails.id,
                  name: cardDetails.name,
                  image: cardDetails.image,
                  properties: cardDetails.properties,
                };
                return Array(cardDetails.count).fill(card);
              }),
          )
        }
      >
        Done
      </button>
    </div>
  );
}
