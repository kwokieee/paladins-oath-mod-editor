import { observer } from 'mobx-react-lite';

export const ScenarioEditor = observer(({ moduleDescriptor }) => {
  return (
    <>
      <div>
        <div>
          <p>GUID</p>
          <p>Name</p>
        </div>
      </div>
    </>
  );
});
