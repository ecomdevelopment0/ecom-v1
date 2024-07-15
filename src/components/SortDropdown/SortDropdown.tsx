import * as React from 'react';
import styles from './sort-dropdown.module.scss';

interface SortDropdownProps {
  onChange: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onChange }) => {
  const [selectedValue, setSelectedValue] = React.useState('recommended');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className={styles.sortDropdown}>
      <select value={selectedValue} onChange={handleSelect}>
        <option value="recommended">Sort by - Recommended</option>
        <option value="popularity">Sort by - Popularity</option>
        <option value="low-to-high">Sort by - Low to High</option>
        <option value="high-to-low">Sort by - High to Low</option>
        <option value="newest-first">Sort by - Newest First</option>
      </select>
    </div>
  );
};

export default SortDropdown;