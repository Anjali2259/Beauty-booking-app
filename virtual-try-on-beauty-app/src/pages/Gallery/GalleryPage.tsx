import React from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  padding: 2rem;
  text-align: center;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.2rem;
  max-width: 600px;
  line-height: 1.6;
`;

const EmptyGallery = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  padding: 3rem;
  border-radius: ${props => props.theme.borderRadius.xl};
  margin: 2rem 0;
  border: 2px dashed ${props => props.theme.colors.border};
`;

const GalleryIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const GalleryPage: React.FC = () => {
  return (
    <GalleryContainer>
      <Title>My Gallery</Title>
      <EmptyGallery>
        <GalleryIcon>📸</GalleryIcon>
        <Description>
          Your virtual try-on photos will appear here! Start trying on makeup
          and save your favorite looks to build your personal beauty gallery.
        </Description>
      </EmptyGallery>
    </GalleryContainer>
  );
};

export default GalleryPage;