import React from 'react';
import styled from 'styled-components';
import { calculateTotalStats } from '../../utils/pokemonApi';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin-bottom: 2rem;
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
`;

const EmptyState = styled.p`
  text-align: center;
  color: #718096;
  font-size: 1.1rem;
  margin: 2rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PokemonCard = styled.div`
  background: ${props => props.theme.background};
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.6s ease-out;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const PokemonHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const PokemonSprite = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  background: ${props => props.theme.filterBackground};
  border-radius: 12px;
  padding: 8px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const PokemonBasicInfo = styled.div`
  flex: 1;
`;

const PokemonName = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: ${props => props.theme.textPrimary};
  font-weight: 700;
`;

const TypesContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const TypeBadge = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  /* Type-specific colors */
  ${({ type }) => {
    const typeColors = {
      normal: 'linear-gradient(135deg, #a8a878, #9e9e67)',
      fire: 'linear-gradient(135deg, #f08030, #e6722b)',
      water: 'linear-gradient(135deg, #6890f0, #5d82e6)',
      electric: 'linear-gradient(135deg, #f8d030, #efc52b)',
      grass: 'linear-gradient(135deg, #78c850, #6bb147)',
      ice: 'linear-gradient(135deg, #98d8d8, #8bc5c5)',
      fighting: 'linear-gradient(135deg, #c03028, #ad2b23)',
      poison: 'linear-gradient(135deg, #a040a0, #8f3a8f)',
      ground: 'linear-gradient(135deg, #e0c068, #d6b55e)',
      flying: 'linear-gradient(135deg, #a890f0, #9a7fe6)',
      psychic: 'linear-gradient(135deg, #f85888, #f1477a)',
      bug: 'linear-gradient(135deg, #a8b820, #97a51c)',
      rock: 'linear-gradient(135deg, #b8a038, #a59133)',
      ghost: 'linear-gradient(135deg, #705898, #644f8a)',
      dragon: 'linear-gradient(135deg, #7038f8, #6332e6)',
      dark: 'linear-gradient(135deg, #705848, #634f41)',
      steel: 'linear-gradient(135deg, #b8b8d0, #a6a6c2)',
      fairy: 'linear-gradient(135deg, #ee99ac, #e8849c)'
    };
    
    return `background: ${typeColors[type] || 'linear-gradient(135deg, #a8a878, #9e9e67)'};`;
  }}
`;

const LegendaryBadge = styled.span`
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #744210;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
  letter-spacing: 0.5px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: #f7fafc;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: #edf2f7;
  }

  ${({ isTotal }) => isTotal && `
    grid-column: span 2;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    margin-top: 0.5rem;
    font-weight: 700;

    &:hover {
      background: linear-gradient(135deg, #5a6fd8, #6a4190);
    }

    @media (max-width: 480px) {
      grid-column: span 1;
    }
  `}
`;

const StatLabel = styled.span`
  color: ${({ isTotal }) => isTotal ? 'white' : '#718096'};
  font-weight: 500;
  font-size: ${({ isTotal }) => isTotal ? '1.1rem' : '1rem'};
`;

const StatValue = styled.span`
  font-weight: 700;
  color: ${({ isTotal }) => isTotal ? 'white' : '#2d3748'};
  font-size: ${({ isTotal }) => isTotal ? '1.1rem' : '1rem'};
`;

// Main Component
const PokemonStatsGrid = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Container>
        <Title>Top Pokémon Stats</Title>
        <EmptyState>No Pokémon match your current filters.</EmptyState>
      </Container>
    );
  }

  const sortedData = [...data]
    .sort((a, b) => calculateTotalStats(b) - calculateTotalStats(a))
    .slice(0, 20);

  return (
    <Container>
      <Title>Top Pokémon by Total Stats</Title>
      <Grid>
        {sortedData.map((pokemon) => (
          <PokemonCard key={pokemon.id}>
            <PokemonHeader>
              {pokemon.sprite && (
                <PokemonSprite 
                  src={pokemon.sprite} 
                  alt={pokemon.name}
                />
              )}
              <PokemonBasicInfo>
                <PokemonName>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </PokemonName>
                <TypesContainer>
                  {pokemon.types.map(type => (
                    <TypeBadge key={type} type={type}>
                      {type}
                    </TypeBadge>
                  ))}
                </TypesContainer>
                {pokemon.isLegendary && (
                  <LegendaryBadge>⭐ Legendary</LegendaryBadge>
                )}
              </PokemonBasicInfo>
            </PokemonHeader>

            <StatsContainer>
              <StatItem>
                <StatLabel>HP:</StatLabel>
                <StatValue>{pokemon.stats.hp}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Attack:</StatLabel>
                <StatValue>{pokemon.stats.attack}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Defense:</StatLabel>
                <StatValue>{pokemon.stats.defense}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Speed:</StatLabel>
                <StatValue>{pokemon.stats.speed}</StatValue>
              </StatItem>
              <StatItem isTotal>
                <StatLabel isTotal>Total:</StatLabel>
                <StatValue isTotal>{calculateTotalStats(pokemon)}</StatValue>
              </StatItem>
            </StatsContainer>
          </PokemonCard>
        ))}
      </Grid>
    </Container>
  );
};

export default PokemonStatsGrid;