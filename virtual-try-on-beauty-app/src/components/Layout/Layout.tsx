import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndex.dropdown};
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  background: ${props => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  text-decoration: none;
  color: ${props => props.$isActive ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitions.fast};
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.backgroundSecondary};
  }

  ${props => props.$isActive && `
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 1rem;
      right: 1rem;
      height: 2px;
      background: ${props.theme.colors.primary};
      border-radius: 1px;
    }
  `}
`;

const Main = styled.main`
  flex: 1;
  padding-top: 80px; /* Account for fixed header */
  min-height: calc(100vh - 80px);
`;

const Footer = styled.footer`
  background: ${props => props.theme.colors.backgroundSecondary};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 2rem;
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <LayoutContainer>
      <Header>
        <Nav>
          <Logo to="/">💄 VirtualGlow</Logo>
          <NavLinks>
            <NavLink to="/" $isActive={isActive('/')}>
              Home
            </NavLink>
            <NavLink to="/try-on" $isActive={isActive('/try-on')}>
              Try On
            </NavLink>
            <NavLink to="/products" $isActive={isActive('/products')}>
              Products
            </NavLink>
            <NavLink to="/gallery" $isActive={isActive('/gallery')}>
              Gallery
            </NavLink>
          </NavLinks>
        </Nav>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>&copy; 2024 VirtualGlow. Experience beauty like never before.</p>
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;