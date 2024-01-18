import './Module.css';
import { useModInfo } from '../../hooks/useModInfo';

export default function Module({ name, type }) {
  const { switchSelectedModuleTo } = useModInfo();
  const onClickModule = () => {
    switchSelectedModuleTo(name, type);
  };

  return (
    <div className="file">
      <p style={{ fontSize: 12, textAlign: 'left', marginLeft: 10 }} onClick={onClickModule}>
        {name}
      </p>
    </div>
  );
}
