import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import axiosInstance from '../utils/axiosConfig';
import LoadingOverlay from '../components/LoadingOverlay';

interface RankingItem {
  serialNum: string;
  myCPU: string | null;
  myGPU: string | null;
  myRAM: string | null;
  cpuScore: number;
  gpuScore: number;
  ramScore: number;
  totalScore: number | null;
}

const Container = styled.div`
  padding: 2rem;
  max-width: 1500px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const RankingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background: #F082AC;
  color: white;
  padding: 1rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  color: #666;
`;

const Tr = styled.tr`
  &:hover {
    background: #f9f9f9;
  }
`;

const Score = styled.span`
  font-weight: bold;
  color: #EA4C89;
`;

const MyRankingRow = styled(Tr)`
  background-color: #FFF0F5;
  border-left: 4px solid #F082AC;
  
  &:hover {
    background-color: #FFE4E1;
  }
`;

const MyRankingContainer = styled.div`
  margin-bottom: 2rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MyRankingTitle = styled.h2`
  font-size: 1.2rem;
  color: #EA4C89;
  margin: 0;
  padding: 1rem;
  background: #FFF0F5;
  border-bottom: 1px solid #FFE4E1;
`;

// 더미 데이터
const dummyRankings: RankingItem[] = [
  {
    serialNum: "1234",
    myCPU: "Intel Core i9-13900K",
    myGPU: "NVIDIA GeForce RTX 4090",
    myRAM: "DDR5-6000 64GB",
    cpuScore: 99375,
    gpuScore: 18567,
    ramScore: 35788,
    totalScore: 153730
  },
  {
    serialNum: "5678",
    myCPU: "AMD Ryzen 9 7950X",
    myGPU: "NVIDIA GeForce RTX 4080",
    myRAM: "DDR5-5600 32GB",
    cpuScore: 95000,
    gpuScore: 17500,
    ramScore: 32000,
    totalScore: 144500
  },
  {
    serialNum: "b4:2e:99:9d:cd:2e",
    myCPU: "Intel Core i7-13700K",
    myGPU: "NVIDIA GeForce RTX 4070",
    myRAM: "DDR5-5200 32GB",
    cpuScore: 85000,
    gpuScore: 15000,
    ramScore: 30000,
    totalScore: 130000
  }
];

const RankingPage: React.FC = () => {
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [myRanking, setMyRanking] = useState<{item: RankingItem, rank: number} | null>(null);
  
  useEffect(() => {
    const fetchRankings = async () => {
      setIsLoading(true);
      try {
        // const response = await axiosInstance.get('/api/hardware/ranking');
        // setRankings(response.data);
        setRankings(dummyRankings);
        
        // localStorage에서 macAddress 가져오기
        const myMacAddress = localStorage.getItem('macAddress');
        
        // 내 랭킹 찾기
        if (myMacAddress) {
          const myRankingIndex = dummyRankings.findIndex(
            item => item.serialNum === myMacAddress
          );
          
          if (myRankingIndex !== -1) {
            setMyRanking({
              item: dummyRankings[myRankingIndex],
              rank: myRankingIndex + 1
            });
          }
        }
      } catch (error) {
        console.error('Error fetching rankings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const renderRankingRow = (item: RankingItem, index: number, isMyRanking: boolean = false) => {
    const RowComponent = isMyRanking ? MyRankingRow : Tr;
    
    return (
      <RowComponent key={item.serialNum}>
        <Td>{index + 1}</Td>
        <Td>{item.serialNum}</Td>
        <Td>{item.myCPU || 'N/A'}</Td>
        <Td>{item.myGPU || 'N/A'}</Td>
        <Td>{item.myRAM || 'N/A'}</Td>
        <Td><Score>{item.cpuScore?.toLocaleString()}</Score></Td>
        <Td><Score>{item.gpuScore?.toLocaleString()}</Score></Td>
        <Td><Score>{item.ramScore?.toLocaleString()}</Score></Td>
        <Td><Score>{item.totalScore?.toLocaleString() || 'N/A'}</Score></Td>
      </RowComponent>
    );
  };

  if (isLoading) return <LoadingOverlay />;

  return (
    <>
      <Header />
      <Container>
        <Title>하드웨어 성능 랭킹</Title>
        
        {myRanking && (
          <MyRankingContainer>
            <MyRankingTitle>내 랭킹</MyRankingTitle>
            <RankingTable>
              <thead>
                <tr>
                  <Th>순위</Th>
                  <Th>시리얼 번호</Th>
                  <Th>CPU</Th>
                  <Th>GPU</Th>
                  <Th>RAM</Th>
                  <Th>CPU 점수</Th>
                  <Th>GPU 점수</Th>
                  <Th>RAM 점수</Th>
                  <Th>총점</Th>
                </tr>
              </thead>
              <tbody>
                {renderRankingRow(myRanking.item, myRanking.rank - 1, true)}
              </tbody>
            </RankingTable>
          </MyRankingContainer>
        )}

        <RankingTable>
          <thead>
            <tr>
              <Th>순위</Th>
              <Th>시리얼 번호</Th>
              <Th>CPU</Th>
              <Th>GPU</Th>
              <Th>RAM</Th>
              <Th>CPU 점수</Th>
              <Th>GPU 점수</Th>
              <Th>RAM 점수</Th>
              <Th>총점</Th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((item, index) => 
              renderRankingRow(item, index)
            )}
          </tbody>
        </RankingTable>
      </Container>
    </>
  );
};

export default RankingPage;