import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: ${props => props.theme.colors.gradient};
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin-bottom: 3rem;
  max-width: 600px;
  opacity: 0.9;
  line-height: 1.6;
`;

const CTAButton = styled(motion(Link))`
  background: white;
  color: ${props => props.theme.colors.primary};
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  display: inline-block;
  box-shadow: ${props => props.theme.shadows.lg};
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.colors.background};
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.text};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius.xl};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.md};
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const DemoSection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.colors.backgroundSecondary};
`;

const DemoContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const DemoImage = styled.div`
  background: ${props => props.theme.colors.gradient};
  height: 400px;
  border-radius: ${props => props.theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
  margin: 2rem 0;
  box-shadow: ${props => props.theme.shadows.xl};
`;

const features = [
  {
    icon: '📱',
    title: 'Real-Time Try-On',
    description: 'Experience makeup products in real-time using advanced face detection technology.'
  },
  {
    icon: '🎨',
    title: 'Endless Colors',
    description: 'Try thousands of makeup products from top brands with unlimited color variations.'
  },
  {
    icon: '📸',
    title: 'Save & Share',
    description: 'Capture your looks and share them with friends or save for later reference.'
  },
  {
    icon: '🛍️',
    title: 'Shop Seamlessly',
    description: 'Purchase your favorite products directly after trying them virtually.'
  }
];

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Virtual Beauty,
          <br />
          Real Confidence
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Try on makeup virtually with AI-powered face detection. 
          Discover your perfect look before you buy.
        </HeroSubtitle>
        <CTAButton
          to="/try-on"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Virtual Try-On
        </CTAButton>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>Why Choose VirtualGlow?</SectionTitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <DemoSection>
        <DemoContainer>
          <SectionTitle>See It In Action</SectionTitle>
          <DemoImage>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.div>
            <span style={{ margin: '0 2rem' }}>Virtual Try-On Demo</span>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              💄
            </motion.div>
          </DemoImage>
          <CTAButton
            to="/try-on"
            as={motion(Link)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try It Now
          </CTAButton>
        </DemoContainer>
      </DemoSection>
    </HomeContainer>
  );
};

export default HomePage;