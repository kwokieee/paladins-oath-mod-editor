import { GameResources } from '../../data/GameResources';
import { CardPicker } from './CardPicker';
import { BlessingPicker } from './BlessingPicker';
import { FollowerPicker } from './FollowerPicker';

/**
 * handleSubmit should be a function that takes in the selected resources
 */
export const ResourcePicker = ({ resourceType, selected, handleSubmit, isEditing }) => {
  if (resourceType === 'Card') {
    return <CardPicker selected={selected} handleSubmit={handleSubmit} isEditing={isEditing} />;
  } else if (resourceType === 'MapSection') {
    return (
      <div>
        {Object.entries(GameResources.MapSection).map(([mapSection, mapSectionDetails], index) => (
          <div key={index} style={{ display: 'inline-block' }}>
            <p>{mapSectionDetails.name}</p>
            <img
              src={mapSectionDetails.image}
              alt={mapSectionDetails.name}
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    );
  } else if (resourceType === 'Terrain') {
    return (
      <div>
        {Object.entries(GameResources.Terrain).map(([terrain, terrainDetails], index) => (
          <div key={index} style={{ display: 'inline-block' }}>
            <p>{terrainDetails.name}</p>
            <img
              src={terrainDetails.image}
              alt={terrainDetails.name}
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    );
  } else if (resourceType === 'Location') {
    return (
      <div>
        {Object.entries(GameResources.Location).map(([location, locationDetails], index) => (
          <div key={index} style={{ display: 'inline-block' }}>
            <p>{locationDetails.name}</p>
            <img
              src={locationDetails.image}
              alt={locationDetails.name}
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    );
  } else if (resourceType === 'Enemy') {
    return (
      <div>
        {Object.entries(GameResources.Enemy).map(([enemy, enemyDetails], index) => (
          <div key={index} style={{ display: 'inline-block' }}>
            <p>{enemyDetails.name}</p>
            <img src={enemyDetails.image} alt={enemyDetails.name} referrerPolicy="no-referrer" />
          </div>
        ))}
      </div>
    );
  } else if (resourceType === 'Follower') {
    return <FollowerPicker selected={selected} handleSubmit={handleSubmit} isEditing={isEditing} />;
  } else if (resourceType === 'Scoring') {
    return (
      <div>
        {Object.entries(GameResources.Scoring).map(([scoring, scoringDetails], index) => (
          <div key={index} style={{ display: 'inline-block' }}>
            <p>{scoringDetails.name}</p>
            <img
              src={scoringDetails.image}
              alt={scoringDetails.name}
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    );
  } else if (resourceType === 'Blessing') {
    return <BlessingPicker selected={selected} handleSubmit={handleSubmit} isEditing={isEditing} />;
  } else {
    return (
      <div>
        <p>Resource picker</p>
      </div>
    );
  }
};
