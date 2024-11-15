import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GameCard from '../components/GameCard';
import Header from '../components/Header';
import TeamLogo from '../image/Team_Logo.png';
import axiosInstance from '../utils/axiosConfig';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const GamesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 100%;
`;

// 더미 데이터
const dummyGames = [
  {
    gameId: 1,
    gameName: "발로란트",
    gameThumbnail: TeamLogo,
    minimumTotalScore: 4166.51,
    recommendedTotalScore: 4659.44,
    maximumTotalScore: 8950.64,
    matchedHardware: {
      minimum: {
        cpus: ["AMD Athlon 200GE"],
        gpus: ["Intel HD 4000"],
        ram: "4GB"
      },
      recommended: {
        cpus: ["Intel Core i3-4150 @ 3.50GHz"],
        gpus: ["GeForce GT 730"],
        ram: "4GB"
      },
      maximum: {
        cpus: ["Intel Core i5-9400F @ 2.90GHz"],
        gpus: ["GeForce GTX 1050 Ti"],
        ram: "8GB"
      }
    }
  },
  {
    gameId: 2,
    gameName: "리그 오브 레전드",
    gameThumbnail: TeamLogo,
    minimumTotalScore: 3500.00,
    recommendedTotalScore: 4200.00,
    maximumTotalScore: 7800.00,
    matchedHardware: {
      minimum: {
        cpus: ["Intel Core i3-3240"],
        gpus: ["Intel HD Graphics 4600"],
        ram: "4GB"
      },
      recommended: {
        cpus: ["Intel Core i5-4460"],
        gpus: ["GeForce GTX 660"],
        ram: "8GB"
      },
      maximum: {
        cpus: ["Intel Core i7-8700K"],
        gpus: ["GeForce GTX 1660"],
        ram: "16GB"
      }
    }
  },
  {
    gameId: 3,
    gameName: "오버워치 2",
    gameThumbnail: "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt0c8f84fc946f8f4c/62f27348d626b0396d4ebf17/ow2-beta_battle-for-olympus_002.jpg",
    minimumTotalScore: 4800.00,
    recommendedTotalScore: 5500.00,
    maximumTotalScore: 9200.00,
    matchedHardware: {
      minimum: {
        cpus: ["Intel Core i3-6100"],
        gpus: ["NVIDIA GeForce GTX 600 series"],
        ram: "6GB"
      },
      recommended: {
        cpus: ["Intel Core i7-4700K"],
        gpus: ["NVIDIA GeForce GTX 1060"],
        ram: "8GB"
      },
      maximum: {
        cpus: ["Intel Core i9-9900K"],
        gpus: ["NVIDIA GeForce RTX 2080"],
        ram: "16GB"
      }
    }
  }
];

const GamesPage: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosInstance.get('/api/game');
        const data = response.data;
        if (data.success) {
          setGames(Array.isArray(data.games) ? data.games : [data.game]);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        
      }
    };

    fetchGames();
    setGames(dummyGames);
  }, []);

  return (
    <PageContainer>
      <Header />
      <Container>
        <Title>게임 사양 정보</Title>
        <GamesContainer>
          {games.map((game) => (
            <GameCard 
              key={game.gameId} 
              game={game} 
              matchedHardware={game.matchedHardware} 
            />
          ))}
        </GamesContainer>
      </Container>
    </PageContainer>
  );
};

export default GamesPage; 