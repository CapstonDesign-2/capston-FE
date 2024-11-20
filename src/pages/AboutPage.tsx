import React from 'react';
import styled from 'styled-components';
import MemberCard from '../components/MemberCard';
import AboutImage from '../image/About_image.png';
import TeamLogoImage from '../image/Team_Logo.png';
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TeamSection, ContactLink } from '../styles/AboutPage.styles';
import Header from '../components/Header';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;
  transform: translateZ(0);
  backface-visibility: hidden;
`;

const TeamTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  margin: 4rem auto;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
  height: 90px;
  justify-content: space-between;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 40px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  height: 90px;
  justify-content: space-between;
`;

const TeamLogo = styled.img`
  width: 110px;
  height: 110px;
`;

const TopText = styled.span`
  color: #2196F3;
  font-size: 2rem;
  font-weight: bold;
`;

const TeamName = styled.h1`
  margin: 0;
  font-size: 42px;
  line-height: 1;
`;

const ContactLinks = styled.div`
  display: flex;
  gap: 15px;
  
  svg {
    font-size: 32px;
  }
`;

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const AboutPage: React.FC = () => {
  const members = [
    {
      name: "박승균",
      role: "Lead, F-E",
      photo: TeamLogoImage,
      githubUrl: "https://github.com/seungyun-Park",
      email: ""
    },
    {
      name: "김재환",
      role: "B-E",
      photo: TeamLogoImage,
      githubUrl: "https://github.com/Jaeboong",
      email: ""
    },
    {
      name: "한시현",
      role: "DevOps",
      photo: TeamLogoImage,
      githubUrl: "https://github.com/devowl99",
      email: ""
    },
    {
      name: "박규원",
      role: "B-E",
      photo: TeamLogoImage,
      githubUrl: "https://github.com/High-Quality-Coffee",
      email: ""
    }
  ];

  return (
    <>
    <Header />
    <Container>
      <BannerImage src={AboutImage} alt="About Banner" />
      
      <TeamSection>
        <TeamTitle>
          <LeftSection>
            <TopText>Team</TopText>
            <TeamName>MySpec</TeamName>
          </LeftSection>
          <CenterSection>
            <TeamLogo src={TeamLogoImage} alt="Team Logo" />
          </CenterSection>
          <RightSection>
            <TopText>Contact</TopText>
            <ContactLinks>
              <ContactLink href="https://github.com/CapstonDesign-2" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </ContactLink>
              <ContactLink href="">
                <MdEmail />
              </ContactLink>
            </ContactLinks>
          </RightSection>
        </TeamTitle>

        <MembersGrid>
          {members.map((member) => (
            <MemberCard
              key={member.name}
              {...member}
            />
          ))}
        </MembersGrid>
      </TeamSection>
    </Container>
    </>
  );
};

export default AboutPage;