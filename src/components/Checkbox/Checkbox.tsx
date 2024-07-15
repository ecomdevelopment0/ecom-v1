import { useState } from 'react';
import style from './checkbox.module.scss';

export const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <label className={`${style.checkboxContainer} ${checked ? style.checked : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className={style.checkmark}></span>
    </label>
  );
};

