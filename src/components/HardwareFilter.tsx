import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1.5rem;
  border: 1px solid #EAEAEA;
  border-radius: 6px;
  background-color: ${({ active }) => active ? '#F082AC' : 'white'};
  color: ${({ active }) => active ? 'white' : '#666666'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ active }) => active ? '#F082AC' : '#f5f5f5'};
  }
`;

export type HardwareType = 'cpu' | 'gpu' | 'ram';

interface HardwareFilterProps {
  selectedType: HardwareType;
  onTypeChange: (type: HardwareType) => void;
}

const HardwareFilter: React.FC<HardwareFilterProps> = ({ selectedType, onTypeChange }) => {
  return (
    <FilterContainer>
      <FilterButton 
        active={selectedType === 'cpu'} 
        onClick={() => onTypeChange('cpu')}
      >
        CPU
      </FilterButton>
      <FilterButton 
        active={selectedType === 'gpu'} 
        onClick={() => onTypeChange('gpu')}
      >
        GPU
      </FilterButton>
      <FilterButton 
        active={selectedType === 'ram'} 
        onClick={() => onTypeChange('ram')}
      >
        RAM
      </FilterButton>
    </FilterContainer>
  );
};

export default HardwareFilter;