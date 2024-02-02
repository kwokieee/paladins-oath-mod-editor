import { useState } from 'react';
import { getResourceWithCounts } from '../../utils';
import { GameResources } from '../../data/GameResources';
import { Follower } from '../resources/Follower';
import { Box, Modal, Tabs, Tab, Typography, Button } from '@mui/material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3, backgroundColor: '#B7A99A' }}>{children}</Box>}
    </div>
  );
}

export const FollowerPicker = ({ selected, handleSubmit, isEditing }) => {
  const selectedFollowers = Object.values(getResourceWithCounts(selected));
  const [followers, setFollowers] = useState(
    Object.values(GameResources.Follower).map((followerDetails) => {
      const selectedFollower = selectedFollowers.find(
        (selectedFollower) => selectedFollower.id === followerDetails.id,
      );
      if (selectedFollower) {
        followerDetails.isSelected = true;
        followerDetails.count = selectedFollower.count;
      } else {
        followerDetails.isSelected = false;
      }
      return followerDetails;
    }),
  );
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedFollowerUrl, setSelectedFollowerUrl] = useState('');

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const selectFollower = (id) => {
    return () => {
      setFollowers(
        followers.map((followerDetails) => {
          if (followerDetails.id !== id) {
            return followerDetails;
          }
          return {
            ...followerDetails,
            isSelected: true,
            count: 1,
          };
        }),
      );
    };
  };

  const deselectFollower = (id) => {
    return () => {
      setFollowers(
        followers.map((followerDetails) => {
          if (followerDetails.id !== id) {
            return followerDetails;
          }
          return {
            ...followerDetails,
            isSelected: false,
            count: undefined,
          };
        }),
      );
    };
  };

  const handleMultiplicityChange = (id) => {
    return (newCount) => {
      setFollowers(
        followers.map((followerDetails) => {
          if (followerDetails.id !== id) {
            return followerDetails;
          }
          return {
            ...followerDetails,
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
          followers
            .filter((followerDetails) => followerDetails.isSelected)
            .flatMap((followerDetails) => {
              const follower = {
                id: followerDetails.id,
                name: followerDetails.name,
                image: followerDetails.image,
                properties: followerDetails.properties,
              };
              return Array(followerDetails.count).fill(follower);
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
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              bgcolor: '#504538',
            }}
            variant="fullWidth"
            centered
          >
            <Tab label="Basic" />
            <Tab label="Elite" />
          </Tabs>
          <Box sx={{ transform: 'rotate(0deg)' }}>
            {selectedFollowerUrl && (
              <img
                src={selectedFollowerUrl}
                style={{ position: 'fixed', right: 0, top: 0, zIndex: 10 }}
                referrerPolicy="no-referrer"
              />
            )}
            <CustomTabPanel value={currentTab} index={0}>
              {followers.map(
                (followerDetails) =>
                  !followerDetails.isSelected &&
                  followerDetails.properties.followerType == 'Basic' && (
                    <Follower
                      key={followerDetails.id}
                      {...followerDetails}
                      handleClick={selectFollower(followerDetails.id)}
                      isSelectable
                    />
                  ),
              )}
            </CustomTabPanel>
            <CustomTabPanel value={currentTab} index={1}>
              {followers.map(
                (followerDetails) =>
                  !followerDetails.isSelected &&
                  followerDetails.properties.followerType == 'Elite' && (
                    <Follower
                      key={followerDetails.id}
                      {...followerDetails}
                      handleClick={selectFollower(followerDetails.id)}
                      isSelectable
                    />
                  ),
              )}
            </CustomTabPanel>
          </Box>
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
            {followers.map(
              (followerDetails) =>
                followerDetails.isSelected && (
                  <div
                    key={followerDetails.id}
                    onMouseEnter={() => setSelectedFollowerUrl(followerDetails.image)}
                    onMouseLeave={() => setSelectedFollowerUrl('')}
                  >
                    <hr style={{ marginTop: 0 }} />
                    <Follower
                      key={followerDetails.id}
                      {...followerDetails}
                      handleClick={deselectFollower(followerDetails.id)}
                      handleMultiplicityChange={handleMultiplicityChange(followerDetails.id)}
                      isModifiable
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
                  followers
                    .filter((followerDetails) => followerDetails.isSelected)
                    .flatMap((followerDetails) => {
                      const follower = {
                        id: followerDetails.id,
                        name: followerDetails.name,
                        image: followerDetails.image,
                        properties: followerDetails.properties,
                      };
                      return Array(followerDetails.count).fill(follower);
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
};
