import React, { useState } from 'react';
import Header from '../components/Header';
import HardwareFilter, { HardwareType } from '../components/HardwareFilter';
import { Container, RankingList, RankingItem, Rank, Name, Score } from '../style/HardwarePerformance';


const dummyData = {
  cpu: [
    { id: 1, name: 'Intel Core i9-13900K', score: 98 },
    { id: 2, name: 'AMD Ryzen 9 7950X', score: 96 },
    { id: 3, name: 'Intel Core i7-13700K', score: 92 },
  ],
  gpu: [
    { id: 1, name: 'NVIDIA RTX 4090', score: 99 },
    { id: 2, name: 'AMD RX 7900 XTX', score: 95 },
    { id: 3, name: 'NVIDIA RTX 4080', score: 93 },
  ],
  ram: [
    { id: 1, name: 'G.SKILL Trident Z5 RGB DDR5-6400', score: 95 },
    { id: 2, name: 'Corsair Dominator Platinum RGB DDR5-6200', score: 93 },
    { id: 3, name: 'Kingston Fury Beast DDR5-6000', score: 90 },
  ],
};

const HardwarePerformance: React.FC = () => {
  const [selectedType, setSelectedType] = useState<HardwareType>('cpu');

  return (
    <>
      <Header />
    <Container>
      <HardwareFilter
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      <RankingList>
        {dummyData[selectedType].map((item, index) => (
          <RankingItem key={item.id}>
            <Rank>{index + 1}</Rank>
            <Name>{item.name}</Name>
            <Score>{item.score}점</Score>
          </RankingItem>
        ))}
      </RankingList>
      </Container>
    </>
  );
};

export default HardwarePerformance;