import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background: ${props => props.theme.cardBackground};
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: ${props => props.theme.shadow};
    border: 2px solid ${props => props.theme.border};

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Title = styled.h3`
    color: ${props => props.theme.textPrimary};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
`;

const ResultsInfo = styled.div`
    font-size: 1rem;
    color: ${props => props.theme.textSecondary};
    display: flex;
    align-items: center;
    gap: 1rem;

    strong {
        color: ${props => props.theme.textPrimary};
        font-weight: 600;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
    }
`;

const ClearButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(238, 90, 82, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(238, 90, 82, 0.4);
  }

  &:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
  }
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #4a5568;
  font-size: 1rem;
  margin-bottom: 0.2rem;
`;

const Input = styled.input`
    padding: 1rem;
    border: 2px solid ${props => props.theme.border};
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: ${props => props.theme.surface};
    color: ${props => props.theme.textPrimary};
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: ${props => props.theme.borderHover};
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        transform: translateY(-1px);
    }

    &::placeholder {
        color: ${props => props.theme.textMuted};
    }

    @media (max-width: 768px) {
        padding: 0.8rem;
    }
`;


const Select = styled.select`
    padding: 1rem;
    border: 2px solid ${props => props.theme.border};
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: ${props => props.theme.surface};
    color: ${props => props.theme.textPrimary};
    font-family: inherit;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: ${props => props.theme.borderHover};
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        transform: translateY(-1px);
    }

    option {
        padding: 0.5rem;
        font-size: 1rem;
        background: ${props => props.theme.surface};
        color: ${props => props.theme.textPrimary};
    }

    @media (max-width: 768px) {
        padding: 0.8rem;
    }
`;

const StatItem = styled.span`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;

    strong {
        color: #667eea;
        font-size: 1.1rem;
    }

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const FilterStats = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
    padding: 1rem;
    background: ${props => props.theme.filterBackground};
    border-radius: 10px;
    font-size: 0.9rem;
    color: ${props => props.theme.textSecondary};

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
    }
`;

// Main Component
const FilterPanel = ({
  filters,
  onFilterChange,
  onClearFilters,
  availableTypes,
  availableGenerations,
  totalCount,
  filteredCount
}) => {
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters };
    if (value === '' || value === 'all') {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    onFilterChange(newFilters);
  };

  const hasActiveFilters = Object.keys(filters).length > 0;
  const legendaryCount = availableTypes.length > 0 ? Math.floor(totalCount * 0.08) : 0; // Rough estimate
  const activeFiltersCount = Object.keys(filters).length;

  return (
    <Container>
      <Header>
        <Title>🔍 Filter Pokémon</Title>
        <ResultsInfo>
          Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> Pokémon
          {hasActiveFilters && (
            <ClearButton onClick={onClearFilters}>
              Clear All Filters
            </ClearButton>
          )}
        </ResultsInfo>
      </Header>

      <ControlsGrid>
        <FilterGroup>
          <Label htmlFor="search">🔎 Search by Name:</Label>
          <Input
            id="search"
            type="text"
            placeholder="Enter Pokémon name..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <Label htmlFor="type">⚡ Type:</Label>
          <Select
            id="type"
            value={filters.type || 'all'}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="all">All Types</option>
            {availableTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label htmlFor="generation">🌟 Generation:</Label>
          <Select
            id="generation"
            value={filters.generation || 'all'}
            onChange={(e) => handleFilterChange('generation', e.target.value)}
          >
            <option value="all">All Generations</option>
            {availableGenerations.map(gen => (
              <option key={gen} value={gen}>
                {gen.replace('generation-', 'Gen ')}
              </option>
            ))}
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label htmlFor="legendary">👑 Legendary Status:</Label>
          <Select
            id="legendary"
            value={filters.legendary !== undefined ? filters.legendary.toString() : 'all'}
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'all') {
                handleFilterChange('legendary', '');
              } else {
                handleFilterChange('legendary', value === 'true');
              }
            }}
          >
            <option value="all">All Pokémon</option>
            <option value="true">Legendary Only</option>
            <option value="false">Regular Only</option>
          </Select>
        </FilterGroup>
      </ControlsGrid>

      <FilterStats>
        <StatItem>
          📊 <strong>{availableTypes.length}</strong> Types Available
        </StatItem>
        <StatItem>
          🎯 <strong>{activeFiltersCount}</strong> Active Filter{activeFiltersCount !== 1 ? 's' : ''}
        </StatItem>
        <StatItem>
          📈 <strong>{((filteredCount / totalCount) * 100).toFixed(1)}%</strong> Showing
        </StatItem>
      </FilterStats>
    </Container>
  );
};

export default FilterPanel;