import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchPokemonAnalyticsData } from '../../utils/pokemonApi';
import { filterPokemonData } from '../../utils/dataTransformers';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import FilterPanel from '../FilterPanel';
import TypeDistributionChart from '../TypeDistributionChart';
import StatsComparisonChart from '../StatsComparisonChart';
import GenerationTrendsChart from '../GenerationTrendsChart';
import PokemonStatsGrid from '../PokemonStatsGrid';

// Generation options
const GENERATION_OPTIONS = [
    { label: 'Gen 1 Only', value: 151, gens: 'Gen I (Kanto)' },
    { label: 'Gen 1-2', value: 251, gens: 'Gen I-II (Kanto + Johto)' },
    { label: 'Gen 1-3', value: 386, gens: 'Gen I-III (Kanto + Johto + Hoenn)' },
    { label: 'Gen 1-4', value: 493, gens: 'Gen I-IV (Classic + Sinnoh)' },
    { label: 'Gen 1-5', value: 649, gens: 'Gen I-V (Classic + Unova)' }
];

const DashboardContainer = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 2rem;
    background: ${props => props.theme.cardBackground};
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: ${props => props.theme.shadow};
    border: 2px solid ${props => props.theme.border};
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const StatItem = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.textSecondary};
  font-weight: 500;

  strong {
    color: ${props => props.theme.textPrimary};
  }
`;

const GenerationSelector = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const GenerationButton = styled.button`
  background: ${props => props.active
    ? 'linear-gradient(135deg, #667eea, #764ba2)'
    : props.theme.cardBackground};
  color: ${props => props.active ? 'white' : props.theme.textPrimary};
  border: 2px solid ${props => props.active ? 'transparent' : props.theme.border};
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    background: ${props => props.active
    ? 'linear-gradient(135deg, #5a6fd8, #6a4190)'
    : props.theme.surface};
    border-color: ${props => props.theme.borderHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const GenerationInfo = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartSection = styled.div`
  background: ${props => props.theme.cardBackground};
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadow};
  transition: transform 0.3s ease;
  border: 2px solid ${props => props.theme.border};

  &:hover {
    transform: translateY(-5px);
  }

  &.chart-section-wide {
    grid-column: span 2;
    
    @media (max-width: 1024px) {
      grid-column: span 1;
    }
  }
`;

const Dashboard = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});
    const [availableTypes, setAvailableTypes] = useState([]);
    const [availableGenerations, setAvailableGenerations] = useState([]);
    const [selectedGenLimit, setSelectedGenLimit] = useState(386);

    useEffect(() => {
        loadPokemonData();
    }, [selectedGenLimit]);

    useEffect(() => {
        const filtered = filterPokemonData(pokemonData, filters);
        setFilteredData(filtered);
    }, [pokemonData, filters]);

    const loadPokemonData = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchPokemonAnalyticsData(selectedGenLimit);
            setPokemonData(data);
            setFilteredData(data);

            const types = [...new Set(data.flatMap(pokemon => pokemon.types))].sort();
            const generations = [...new Set(data.map(pokemon => pokemon.generation))].sort();

            setAvailableTypes(types);
            setAvailableGenerations(generations);
        } catch (err) {
            setError('Failed to load Pokémon data. Please try again.');
            console.error('Error loading Pokémon data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const clearFilters = () => {
        setFilters({});
    };

    const handleGenerationChange = (limit) => {
        if (limit !== selectedGenLimit && !loading) {
            setSelectedGenLimit(limit);
            setFilters({});
        }
    };

    const selectedOption = GENERATION_OPTIONS.find(opt => opt.value === selectedGenLimit);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage error={error} onRetry={loadPokemonData} />;

    return (
        <DashboardContainer>
            <Header>
                <Title>🚀 Pokémon Analytics Dashboard</Title>
                <Subtitle>Interactive data visualization and analysis platform</Subtitle>
                <Stats>
                    <StatItem>
                        <strong>{filteredData.length}</strong> Pokémon analyzed
                    </StatItem>
                    <StatItem>
                        <strong>{availableTypes.length}</strong> Types
                    </StatItem>
                    <StatItem>
                        <strong>{availableGenerations.length}</strong> Generations
                    </StatItem>
                </Stats>

                <GenerationSelector>
                    {GENERATION_OPTIONS.map(option => (
                        <GenerationButton
                            key={option.value}
                            active={selectedGenLimit === option.value}
                            onClick={() => handleGenerationChange(option.value)}
                            disabled={loading}
                        >
                            {option.label}
                        </GenerationButton>
                    ))}
                </GenerationSelector>

                {selectedOption && (
                    <GenerationInfo>
                        Currently showing: {selectedOption.gens}
                    </GenerationInfo>
                )}
            </Header>

            <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                availableTypes={availableTypes}
                availableGenerations={availableGenerations}
                totalCount={pokemonData.length}
                filteredCount={filteredData.length}
            />

            <ChartsGrid>
                <ChartSection>
                    <TypeDistributionChart data={filteredData} />
                </ChartSection>

                <ChartSection>
                    <StatsComparisonChart data={filteredData} />
                </ChartSection>

                <ChartSection className="chart-section-wide">
                    <GenerationTrendsChart data={filteredData} />
                </ChartSection>
            </ChartsGrid>

            <PokemonStatsGrid data={filteredData.slice(0, 20)} />
        </DashboardContainer>
    );
};

export default Dashboard;