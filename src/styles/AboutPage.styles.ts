import styled from 'styled-components';

export const TeamSection = styled.section`
  padding: 2rem;
`;

export const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const TeamLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const TeamLogo = styled.img`
  width: 50px;
  height: 50px;
`;

export const TeamName = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

export const ContactLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ContactLink = styled.a`
  color: #333;
  transition: color 0.2s;
  
  &:hover {
    color: #007bff;
  }
`; 