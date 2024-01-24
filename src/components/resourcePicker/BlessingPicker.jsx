import { useState } from 'react';
import { GameResources } from '../../data/GameResources';
import { Box, Modal, Typography, Button } from '@mui/material';
import Blessing from '../Blessing';

export default function BlessingPicker({ selected, handleSubmit, isEditing }) {
  const [blessings, setBlessings] = useState(
    Object.values(GameResources.Blessing).map((blessingDetails) => {
      const selectedBlessing = selected.find(
        (selectedBlessing) => selectedBlessing.id === blessingDetails.id,
      );
      if (selectedBlessing) {
        blessingDetails.isSelected = true;
      } else {
        blessingDetails.isSelected = false;
      }
      return blessingDetails;
    }),
  );

  const selectBlessing = (id) => {
    return () => {
      setBlessings(
        blessings.map((blessingDetails) => {
          if (blessingDetails.id !== id) {
            return blessingDetails;
          }
          return {
            ...blessingDetails,
            isSelected: true,
          };
        }),
      );
    };
  };

  const deselectBlessing = (id) => {
    return () => {
      setBlessings(
        blessings.map((blessingDetails) => {
          if (blessingDetails.id !== id) {
            return blessingDetails;
          }
          return {
            ...blessingDetails,
            isSelected: false,
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
          blessings
            .filter((blessingDetails) => blessingDetails.isSelected)
            .map((blessingDetails) => {
              return {
                id: blessingDetails.id,
                name: blessingDetails.name,
                image: blessingDetails.image,
                properties: blessingDetails.properties,
              };
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
          borderRadius: '10px',
          border: '3px solid #37281d',
          boxShadow: 24,
          display: 'flex',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'primary',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
            width: '85%',
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Box sx={{ py: 2 }}>
            <Typography textAlign="center">Blessings</Typography>
          </Box>
          {blessings.map(
            (blessingDetails) =>
              !blessingDetails.isSelected && (
                <Blessing
                  key={blessingDetails.id}
                  {...blessingDetails}
                  handleClick={selectBlessing(blessingDetails.id)}
                  isSelectable
                />
              ),
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: 'slategray',
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
            width: '15%',
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              bgcolor: 'darkgray',
              boxShadow: 5,
              height: '8%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography textAlign={'center'}>Selected</Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            {blessings.map(
              (blessingDetails) =>
                blessingDetails.isSelected && (
                  <div key={blessingDetails.id}>
                    <hr style={{ marginTop: 0 }} />
                    <Blessing
                      key={blessingDetails.id}
                      {...blessingDetails}
                      handleClick={deselectBlessing(blessingDetails.id)}
                      isCollapsed
                      isSelectable
                    />
                  </div>
                ),
            )}
          </Box>
          <Box
            sx={{
              position: 'sticky',
              bottom: 0,
              zIndex: 1,
              bgcolor: 'darkgray',
              boxShadow: 5,
              height: '8%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={() =>
                handleSubmit(
                  blessings
                    .filter((blessingDetails) => blessingDetails.isSelected)
                    .map((blessingDetails) => {
                      return {
                        id: blessingDetails.id,
                        name: blessingDetails.name,
                        image: blessingDetails.image,
                        properties: blessingDetails.properties,
                      };
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
