import { observer } from 'mobx-react-lite';

export const ScenarioExtensionEditor = observer(({ moduleDescriptor }) => {
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
