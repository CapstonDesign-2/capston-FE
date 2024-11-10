import styled from 'styled-components';

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
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #EAEAEA;
  border-radius: 8px;
  background-color: white;
`;

export const Rank = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  width: 50px;
`;

export const Name = styled.span`
  flex: 1;
`;

export const Score = styled.span`
  font-weight: bold;
  color: #EA4C89;
`;