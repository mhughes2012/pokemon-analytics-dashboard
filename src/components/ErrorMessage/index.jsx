import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const shake = keyframes`
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const pulse = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
`;

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    padding: 3rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    margin: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 0.6s ease-out;

    @media (max-width: 768px) {
        padding: 2rem;
        margin: 1rem;
    }
`;

const IconContainer = styled.div`
    font-size: 4rem;
    margin-bottom: 1.5rem;
    animation: ${shake} 0.6s ease-out, ${pulse} 2s ease-in-out infinite;
    color: #e53e3e;
    text-shadow: 0 2px 8px rgba(229, 62, 62, 0.3);

    @media (max-width: 768px) {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
`;

const Title = styled.h2`
    color: #2d3748;
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 700;
    animation: ${fadeIn} 0.8s ease-out 0.2s both;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const Message = styled.p`
    color: #e53e3e;
    margin-bottom: 2rem;
    font-size: 1.1rem;
    font-weight: 500;
    max-width: 500px;
    line-height: 1.6;
    animation: ${fadeIn} 1s ease-out 0.4s both;

    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 1.5rem;
    }
`;

const RetryButton = styled.button`
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    animation: ${fadeIn} 1.2s ease-out 0.6s both;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        background: linear-gradient(135deg, #5a6fd8, #6a4190);
    }

    &:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
    }
`;

const ErrorDetails = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(229, 62, 62, 0.1);
  border: 2px solid rgba(229, 62, 62, 0.2);
  border-radius: 10px;
  max-width: 600px;
  animation: ${fadeIn} 1.4s ease-out 0.8s both;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding: 1rem;
  }
`;

const ErrorTitle = styled.h3`
  color: #c53030;
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ErrorList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const ErrorItem = styled.li`
  color: #4a5568;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: "•";
    color: #e53e3e;
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

// Main Component
const ErrorMessage = ({ error, onRetry, showDetails = true }) => {
    // Different error icons to choose from (UTF-8 characters)
    const errorIcons = {
        warning: "⚠️",      // Warning sign emoji
        exclamation: "❗",   // Heavy exclamation mark
        cross: "❌",        // Cross mark
        stop: "🛑",         // Stop sign
        fallback: "!"       // Simple exclamation for fallback
    };

    // Use warning icon, with fallback to simple exclamation
    const errorIcon = errorIcons.warning || errorIcons.fallback;

    const troubleshootingTips = [
        "Check your internet connection",
        "The PokéAPI might be temporarily unavailable",
        "Try refreshing the page",
        "Clear your browser cache if the problem persists"
    ];

    return (
        <Container>
            <IconContainer>
                {errorIcon}
            </IconContainer>

            <Title>Oops! Something went wrong</Title>

            <Message>{error}</Message>

            <RetryButton onClick={onRetry}>
                🔄 Try Again
            </RetryButton>

            {showDetails && (
                <ErrorDetails>
                    <ErrorTitle>💡 Troubleshooting Tips:</ErrorTitle>
                    <ErrorList>
                        {troubleshootingTips.map((tip, index) => (
                            <ErrorItem key={index}>{tip}</ErrorItem>
                        ))}
                    </ErrorList>
                </ErrorDetails>
            )}
        </Container>
    );
};

export default ErrorMessage;