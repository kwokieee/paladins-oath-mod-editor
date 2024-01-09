import { useModInfo } from '../../hooks/useModInfo';

export default function Module({ name, type }) {
  const { setSelectedModule, setSelectedModuleType } = useModInfo();
  const onClickModule = () => {
    setSelectedModule(name);
    setSelectedModuleType(type);
  };

  return (
    <p style={{ fontSize: 12, textAlign: 'left', margin: '2 auto' }} onClick={onClickModule}>
      {name}
    </p>
  );
}
