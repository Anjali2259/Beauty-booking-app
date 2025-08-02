import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div<{ size: string; color: string }>`
  display: inline-block;
  width: ${props => 
    props.size === 'small' ? '20px' :
    props.size === 'medium' ? '40px' : '60px'
  };
  height: ${props => 
    props.size === 'small' ? '20px' :
    props.size === 'medium' ? '40px' : '60px'
  };
  border: ${props => 
    props.size === 'small' ? '2px' :
    props.size === 'medium' ? '3px' : '4px'
  } solid ${props => props.color}33;
  border-top: ${props => 
    props.size === 'small' ? '2px' :
    props.size === 'medium' ? '3px' : '4px'
  } solid ${props => props.color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = '#FF69B4' 
}) => {
  return <SpinnerContainer size={size} color={color} />;
};

export default LoadingSpinner;