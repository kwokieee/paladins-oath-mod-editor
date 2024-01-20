import { useState } from 'react';
import { getCardsWithCounts } from '../../utils';
import { GameResources } from '../../data/GameResources';
import Card from '../Card';
import { Box, Modal, Pagination, Tabs, Tab, Typography, Button } from '@mui/material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CardPicker({ selected, handleSubmit, isEditing }) {
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
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

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
    <Modal
      open={isEditing}
      onClose={() =>
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
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          bgcolor: 'darkgrey',
          border: '2px solid #fff',
          boxShadow: 24,
          display: 'flex',
        }}
      >
        <Box sx={{ backgroundColor: 'darkgray', width: '85%', height: '100%', overflow: 'auto' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              bgcolor: 'grey',
            }}
          >
            <Tab label="Actions" />
            <Tab label="Spells" />
            <Tab label="Relics" />
          </Tabs>
          <Box>
            <CustomTabPanel value={currentTab} index={0}>
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
            </CustomTabPanel>
            <CustomTabPanel value={currentTab} index={1}>
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
            </CustomTabPanel>
            <CustomTabPanel value={currentTab} index={2}>
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
            </CustomTabPanel>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: 'slategray', width: '15%', height: '100%', overflow: 'auto' }}>
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              bgcolor: 'darkgray',
              height: '5%',
            }}
          >
            <Typography textAlign={'center'}>Selected</Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            {cards.map(
              (cardDetails) =>
                cardDetails.isSelected && (
                  <>
                    <Card
                      key={cardDetails.id}
                      {...cardDetails}
                      handleClick={deselectCard(cardDetails.id)}
                      modifiable
                      handleMultiplicityChange={handleMultiplicityChange(cardDetails.id)}
                      isCollapsed
                    />
                    <hr />
                  </>
                ),
            )}
          </Box>
          <Box
            sx={{
              position: 'sticky',
              bottom: 0,
              zIndex: 1,
              bgcolor: 'darkgray',
              height: '5%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
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
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
