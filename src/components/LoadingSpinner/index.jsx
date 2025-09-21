
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const bounce = keyframes`
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
`;

const pulse = keyframes`
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.05);
        opacity: 0.7;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
`;

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

const SpinnerContainer = styled.div`
    position: relative;
    margin-bottom: 2rem;
`;

const Spinner = styled.div`
    width: 80px;
    height: 80px;
    border: 6px solid rgba(102, 126, 234, 0.2);
    border-top: 6px solid #667eea;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        animation: ${pulse} 2s ease-in-out infinite;
    }

    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
        border-width: 4px;

        &::before {
            width: 16px;
            height: 16px;
        }
    }
`;

const PokeBall = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    background: linear-gradient(180deg, #ff6b6b 0%, #ff6b6b 50%, white 50%, white 100%);
    border-radius: 50%;
    border: 3px solid #333;
    animation: ${bounce} 2s infinite;
    z-index: 1;

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 12px;
        background: white;
        border: 2px solid #333;
        border-radius: 50%;
    }

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 3px;
        background: #333;
    }

    @media (max-width: 768px) {
        width: 30px;
        height: 30px;

        &::before {
            width: 8px;
            height: 8px;
        }

        &::after {
            height: 2px;
        }
    }
`;

const Title = styled.h2`
    color: #2d3748;
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: 700;
    animation: ${fadeIn} 0.8s ease-out 0.2s both;

    @media (max-width: 768px) {
        font-size: 1.6rem;
    }
`;

const Description = styled.p`
    color: #718096;
    font-size: 1.2rem;
    margin-bottom: 2rem;
    animation: ${fadeIn} 1s ease-out 0.4s both;
    max-width: 500px;

    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 1.5rem;
    }
`;

const ProgressInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    animation: ${fadeIn} 1.2s ease-out 0.6s both;

    @media (max-width: 768px) {
        gap: 0.8rem;
    }
`;

const ProgressText = styled.p`
    color: #4a5568;
    font-size: 1rem;
    font-weight: 500;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const TipsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    max-width: 400px;
`;

const TipItem = styled.li`
  color: #667eea;
  font-size: 0.95rem;
  padding: 0.8rem 1.2rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 10px;
  border-left: 4px solid #667eea;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.6rem 1rem;
  }
`;

const EmojiIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 0.8rem;
`;

// Main Component
const LoadingSpinner = ({
                            message = "Loading Pokémon Data...",
                            showTips = true,
                            showPokeBall = true
                        }) => {
    const tips = [
        "🔍 Use filters to find specific Pokémon types",
        "📊 Charts update automatically as you filter",
        "⭐ Look for legendary Pokémon with special badges",
        "📱 Dashboard is fully responsive on mobile"
    ];

    return (
        <Container>
            <SpinnerContainer>
                <Spinner />
                {showPokeBall && <PokeBall />}
            </SpinnerContainer>

            <Title>
                <EmojiIcon>⚡</EmojiIcon>
                {message}
            </Title>

            <Description>
                Fetching data from PokéAPI and analyzing Pokémon stats...
                This may take a moment as we gather comprehensive data!
            </Description>

            <ProgressInfo>
                <ProgressText>
                    <EmojiIcon>🌟</EmojiIcon>
                    Loading generations, types, and battle statistics
                </ProgressText>

                {showTips && (
                    <div>
                        <ProgressText style={{ marginBottom: '1rem', fontWeight: '600' }}>
                            💡 Pro Tips while you wait:
                        </ProgressText>
                        <TipsList>
                            {tips.map((tip, index) => (
                                <TipItem key={index}>
                                    {tip}
                                </TipItem>
                            ))}
                        </TipsList>
                    </div>
                )}
            </ProgressInfo>
        </Container>
    );
};

export default LoadingSpinner;