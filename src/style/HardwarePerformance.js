import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';

export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RankingItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 400px;
  align-items: center;
  padding: 1rem;
  border: 1px solid #EAEAEA;
  border-radius: 8px;
  background-color: white;
`;

export const Rank = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

export const Name = styled.span`
  padding: 0 1rem;
`;

export const ScoreWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const ScoreItem = styled.span`
  font-weight: bold;
  color: #EA4C89;
  text-align: right;
  white-space: nowrap;
`;

export const Score = styled.span`
  font-weight: bold;
  color: #EA4C89;
  margin-left: 1rem;  // 점수와 가격 사이 간격
`;

export const StyledList = styled(List)`
  overflow-x: hidden !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
  &::-webkit-scrollbar {
    display: none !important;
  }
`;