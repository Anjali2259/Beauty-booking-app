import React from 'react';
import styled from 'styled-components';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  color: ${props => props.theme.colors.error};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 400px;
`;

const RetryButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <ErrorContainer>
      <ErrorTitle>Oops! Something went wrong</ErrorTitle>
      <ErrorMessage>
        We're sorry, but something unexpected happened. Please try refreshing the page.
      </ErrorMessage>
      <RetryButton onClick={resetErrorBoundary}>
        Try Again
      </RetryButton>
      {process.env.NODE_ENV === 'development' && (
        <details style={{ marginTop: '2rem' }}>
          <summary>Error Details</summary>
          <pre style={{ textAlign: 'left', marginTop: '1rem' }}>
            {error.message}
          </pre>
        </details>
      )}
    </ErrorContainer>
  );
};

export default ErrorFallback;