/**
 * Transform Pokemon data for type distribution chart
 * @param {Array} pokemonData - Array of Pokemon objects
 * @returns {Object} Chart.js compatible data structure
 */
export const transformTypeDistribution = (pokemonData) => {
    const typeCount = {};

    pokemonData.forEach(pokemon => {
        pokemon.types.forEach(type => {
            typeCount[type] = (typeCount[type] || 0) + 1;
        });
    });

    const sortedTypes = Object.entries(typeCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10); // Top 10 types

    return {
        labels: sortedTypes.map(([type]) => type.charAt(0).toUpperCase() + type.slice(1)),
        datasets: [{
            label: 'Number of Pokemon',
            data: sortedTypes.map(([, count]) => count),
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF',
                '#4BC0C0', '#FF6384'
            ]
        }]
    };
};

/**
 * Transform Pokemon data for stats comparison
 * @param {Array} pokemonData - Array of Pokemon objects
 * @returns {Object} Chart.js compatible data structure for scatter plot
 */
export const transformStatsComparison = (pokemonData) => {
    const data = pokemonData.map(pokemon => ({
        x: pokemon.stats.attack,
        y: pokemon.stats.defense,
        name: pokemon.name,
        isLegendary: pokemon.isLegendary
    }));

    const legendary = data.filter(p => p.isLegendary);
    const regular = data.filter(p => !p.isLegendary);

    return {
        datasets: [
            {
                label: 'Regular Pokemon',
                data: regular,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
            },
            {
                label: 'Legendary Pokemon',
                data: legendary,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
            }
        ]
    };
};

/**
 * Transform data for generation trends
 * @param {Array} pokemonData - Array of Pokemon objects
 * @returns {Object} Chart.js compatible data structure
 */
export const transformGenerationTrends = (pokemonData) => {
    const generationStats = {};

    pokemonData.forEach(pokemon => {
        if (!generationStats[pokemon.generation]) {
            generationStats[pokemon.generation] = {
                totalStats: 0,
                count: 0,
                pokemon: []
            };
        }

        const totalStat = Object.values(pokemon.stats).reduce((sum, stat) => sum + stat, 0);
        generationStats[pokemon.generation].totalStats += totalStat;
        generationStats[pokemon.generation].count += 1;
        generationStats[pokemon.generation].pokemon.push(pokemon);
    });

    const generations = Object.keys(generationStats).sort();
    const averageStats = generations.map(gen =>
        generationStats[gen].totalStats / generationStats[gen].count
    );

    return {
        labels: generations.map(gen => gen.replace('generation-', 'Gen ')),
        datasets: [{
            label: 'Average Total Stats',
            data: averageStats,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
        }]
    };
};

/**
 * Filter Pokemon data based on criteria
 * @param {Array} pokemonData - Array of Pokemon objects
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered Pokemon data
 */
export const filterPokemonData = (pokemonData, filters = {}) => {
    return pokemonData.filter(pokemon => {
        // Filter by type
        if (filters.type && !pokemon.types.includes(filters.type)) {
            return false;
        }

        // Filter by generation
        if (filters.generation && pokemon.generation !== filters.generation) {
            return false;
        }

        // Filter by legendary status
        if (filters.legendary !== undefined && pokemon.isLegendary !== filters.legendary) {
            return false;
        }

        // Filter by name search
        if (filters.search && !pokemon.name.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }

        return true;
    });
};