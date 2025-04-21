import React, { useState, useEffect, useRef } from 'react';

type ComboBoxProps = {
  options: string[];
};

export const ComboBox: React.FC<ComboBoxProps> = ({ options }) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
    setHighlightedIndex(-1);
  }, [inputValue, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && e.key === 'ArrowDown') setIsOpen(true);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          selectOption(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const selectOption = (option: string) => {
    setInputValue(option);
    setIsOpen(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="combobox-container"
      onBlur={handleBlur}
      ref={containerRef}
    >
      <input
        type="text"
        className="combobox-input"
        role="combobox"
        aria-controls="combobox-list"
        aria-expanded={isOpen}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <ul className="combobox-list" id="combobox-list" role="listbox">
          {filteredOptions.length === 0 ? (
            <li className="combobox-option">No results</li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={option}
                className={`combobox-option ${
                  index === highlightedIndex ? 'highlighted' : ''
                }`}
                role="option"
                aria-selected={highlightedIndex === index}
                onMouseDown={() => selectOption(option)}
              >
                {option}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
