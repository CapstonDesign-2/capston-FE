import React from 'react';
import styled from 'styled-components';
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
`;

const MemberPhoto = styled.img`
  background-color: #f1f1f1;
  width: 120px;
  height: 120px;
  border-radius: 30px;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const MemberName = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const MemberRole = styled.p`
  color: #0094FF;
`;

const MemberLinks = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 5px;

  a {
    color: #000;
    font-size: 20px;
    transition: color 0.2s;
    &:hover {
      color: #F082AC;
    }
  }
`;

interface MemberCardProps {
  photo: string;
  name: string;
  role: string;
  githubUrl: string;
  email: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ photo, name, role, githubUrl, email }) => {
  return (
    <Card>
      <MemberPhoto src={photo} alt={name} />
      <MemberInfo>
        <MemberName>{name}</MemberName>
        <MemberRole>{role}</MemberRole>
        <MemberLinks>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href={`mailto:${email}`}>
            <MdEmail />
          </a>
        </MemberLinks>
      </MemberInfo>
    </Card>
  );
};

export default MemberCard; 