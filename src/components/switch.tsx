import { useState } from 'react';

interface SwitchProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
}

const Switch: React.FC<SwitchProps> = ({ onChange, checked: initialChecked }) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleClick = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <div
      className={`switch ${checked && "active"}`}
      onClick={handleClick}
    >
      <div className="switch-handle" />
    </div>
  );
};

export default Switch;
