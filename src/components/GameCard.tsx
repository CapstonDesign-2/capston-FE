import styled from 'styled-components';

interface GameCardProps {
  game: {
    gameId: number;
    gameName: string;
    gameThumbnail: string;
    minimumTotalScore: number;
    recommendedTotalScore: number;
    maximumTotalScore: number;
  };
  matchedHardware: {
    minimum: HardwareSpec;
    recommended: HardwareSpec;
    maximum: HardwareSpec;
  };
}

interface HardwareSpec {
  cpus: string[];
  gpus: string[];
  ram: string;
}

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  margin: 1rem 0;
`;

const GameHeader = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Thumbnail = styled.img`
  width: 200px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const GameTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #333;
`;

const SpecsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const SpecColumn = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
`;

const SpecTitle = styled.h3`
  font-size: 1rem;
  color: #666;
  margin: 0 0 1rem 0;
  text-align: center;
`;

const SpecItem = styled.div`
  margin-bottom: 0.8rem;
`;

const SpecLabel = styled.div`
  font-size: 0.875rem;
  color: #888;
  margin-bottom: 0.2rem;
`;

const SpecValue = styled.div`
  font-size: 0.9rem;
  color: #333;
`;

const TotalScore = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c5282;
  text-align: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const GameCard: React.FC<GameCardProps> = ({ game, matchedHardware }) => {
  return (
    <Card>
      <GameHeader>
        <Thumbnail src={game.gameThumbnail} alt={game.gameName} />
        <GameTitle>{game.gameName}</GameTitle>
      </GameHeader>

      <SpecsContainer>
        <SpecColumn>
          <SpecTitle>최소 사양</SpecTitle>
          <SpecItem>
            <SpecLabel>CPU</SpecLabel>
            <SpecValue>{matchedHardware.minimum.cpus[0]}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>GPU</SpecLabel>
            <SpecValue>{matchedHardware.minimum.gpus[0]}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>RAM</SpecLabel>
            <SpecValue>{matchedHardware.minimum.ram}</SpecValue>
          </SpecItem>
          <TotalScore>Score: {game.minimumTotalScore.toFixed(2)}</TotalScore>
        </SpecColumn>

        <SpecColumn>
          <SpecTitle>권장 사양</SpecTitle>
          <SpecItem>
            <SpecLabel>CPU</SpecLabel>
            <SpecValue>{matchedHardware.recommended.cpus[0]}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>GPU</SpecLabel>
            <SpecValue>{matchedHardware.recommended.gpus[0]}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>RAM</SpecLabel>
            <SpecValue>{matchedHardware.recommended.ram}</SpecValue>
          </SpecItem>
          <TotalScore>Score: {game.recommendedTotalScore.toFixed(2)}</TotalScore>
        </SpecColumn>

        <SpecColumn>
          <SpecTitle>최고 사양</SpecTitle>
          <SpecItem>
            <SpecLabel>CPU</SpecLabel>
            <SpecValue>{matchedHardware.maximum.cpus[0]}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>GPU</SpecLabel>
            <SpecValue>{matchedHardware.maximum.gpus[0]}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>RAM</SpecLabel>
            <SpecValue>{matchedHardware.maximum.ram}</SpecValue>
          </SpecItem>
          <TotalScore>Score: {game.maximumTotalScore.toFixed(2)}</TotalScore>
        </SpecColumn>
      </SpecsContainer>
    </Card>
  );
};

export default GameCard; 