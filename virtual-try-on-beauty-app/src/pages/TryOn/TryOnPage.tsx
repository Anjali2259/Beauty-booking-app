import React from 'react';
import styled from 'styled-components';

const TryOnContainer = styled.div`
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

const ComingSoonBadge = styled.div`
  background: ${props => props.theme.colors.gradient};
  color: white;
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  margin: 2rem 0;
  font-weight: 600;
`;

const TryOnPage: React.FC = () => {
  return (
    <TryOnContainer>
      <Title>Virtual Try-On Studio</Title>
      <ComingSoonBadge>🚀 Coming Soon</ComingSoonBadge>
      <Description>
        Get ready for an immersive virtual try-on experience! Our AI-powered face detection
        technology will let you try on makeup products in real-time. This feature will include
        camera access, face landmark detection, and realistic makeup application.
      </Description>
    </TryOnContainer>
  );
};

export default TryOnPage;