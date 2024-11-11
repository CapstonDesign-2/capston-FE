import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  background: white;
  border-bottom: 1px solid #EAEAEA;
  box-sizing: border-box;
  max-width: 100vw;
  position: relative;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
  text-decoration: none;
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: absolute;
    flex-direction: column;
    align-items: flex-start;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem 2rem;
    gap: 1rem;
    border-bottom: 1px solid #EAEAEA;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    z-index: 1000;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  color: #666666;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
  white-space: nowrap;
  padding: 0.5rem 0.5rem;

  &:hover {
    color: black;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.5rem 0;
  }
`;

const SpecButton = styled.button`
  background-color: #EA4C89;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #F082AC;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #666666;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = () => {
    navigate('/mySpec');
  };

  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem'}}>
      <Logo to="/">MySpec</Logo>
      
      <MenuButton onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </MenuButton>

      <Nav isOpen={isOpen}>
        <NavLinks>
          <NavLink to="/hardware-price">가성비 하드웨어</NavLink>
          <NavLink to="/hardware-performance">성능별 하드웨어</NavLink>
          <NavLink to="/hardware-ranking">하드웨어 랭킹</NavLink>
          <NavLink to="/about">About</NavLink>
        </NavLinks>
      </Nav>
      </div>
      <SpecButton onClick={handleButtonClick}>스펙 확인하기</SpecButton>
    </HeaderContainer>
  );
};

export default Header;