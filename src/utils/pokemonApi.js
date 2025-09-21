import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 second timeout
});

/**
 * Fetch a list of Pokemon with pagination
 * @param {number} limit - Number of Pokemon to fetch (default: 151)
 * @param {number} offset - Starting position (default: 0)
 * @returns {Promise} Promise resolving to Pokemon list
 */
export const fetchPokemonList = async (limit = 151, offset = 0) => {
    try {
        const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokemon list:', error);
        throw new Error('Failed to fetch Pokemon list');
    }
};

/**
 * Fetch detailed information for a specific Pokemon
 * @param {string|number} pokemonId - Pokemon ID or name
 * @returns {Promise} Promise resolving to Pokemon details
 */
export const fetchPokemonDetails = async (pokemonId) => {
    try {
        const response = await api.get(`/pokemon/${pokemonId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching Pokemon details for ${pokemonId}:`, error);
        throw new Error(`Failed to fetch details for Pokemon: ${pokemonId}`);
    }
};

/**
 * Fetch species information for a Pokemon (includes generation, legendary status, etc.)
 * @param {string|number} pokemonId - Pokemon ID or name
 * @returns {Promise} Promise resolving to species information
 */
export const fetchPokemonSpecies = async (pokemonId) => {
    try {
        const response = await api.get(`/pokemon-species/${pokemonId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching species info for ${pokemonId}:`, error);
        throw new Error(`Failed to fetch species info for Pokémon: ${pokemonId}`);
    }
};

/**
 * Fetch all Pokemon types
 * @returns {Promise} Promise resolving to types list
 */
export const fetchPokemonTypes = async () => {
    try {
        const response = await api.get('/type');
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokemon types:', error);
        throw new Error('Failed to fetch Pokemon types');
    }
};

/**
 * Fetch detailed Pokemon data for analytics (combines basic + species data)
 * @param {number} limit - Number of Pokemon to fetch
 * @returns {Promise} Promise resolving to enriched Pokemon data
 */
export const fetchPokemonAnalyticsData = async (limit = 151) => {
    try {
        // First, get the list of Pokemon
        const pokemonList = await fetchPokemonList(limit);

        // Then fetch detailed data for each Pokemon (with concurrency limit to avoid rate limiting)
        const batchSize = 10; // Process in batches to avoid overwhelming the API
        const results = [];

        for (let i = 0; i < pokemonList.results.length; i += batchSize) {
            const batch = pokemonList.results.slice(i, i + batchSize);

            const batchPromises = batch.map(async (pokemon) => {
                try {
                    // Fetch both basic details and species info
                    const [details, species] = await Promise.all([
                        fetchPokemonDetails(pokemon.name),
                        fetchPokemonSpecies(pokemon.name)
                    ]);

                    // Combine and structure the data for analytics
                    return {
                        id: details.id,
                        name: details.name,
                        types: details.types.map(type => type.type.name),
                        stats: {
                            hp: details.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
                            attack: details.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
                            defense: details.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
                            specialAttack: details.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat || 0,
                            specialDefense: details.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat || 0,
                            speed: details.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0,
                        },
                        height: details.height,
                        weight: details.weight,
                        generation: species.generation?.name || 'unknown',
                        isLegendary: species.is_legendary,
                        isMythical: species.is_mythical,
                        sprite: details.sprites?.front_default,
                        color: species.color?.name || 'unknown'
                    };
                } catch (error) {
                    console.warn(`Failed to fetch data for ${pokemon.name}:`, error);
                    return null; // Return null for failed requests
                }
            });

            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults.filter(result => result !== null));

            // Small delay between batches to be respectful to the API
            if (i + batchSize < pokemonList.results.length) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        return results;
    } catch (error) {
        console.error('Error fetching Pokémon analytics data:', error);
        throw new Error('Failed to fetch Pokémon analytics data');
    }
};

/**
 * Calculate total stats for a Pokemon
 * @param {Object} pokemon - Pokemon object with stats
 * @returns {number} Total base stats
 */
export const calculateTotalStats = (pokemon) => {
    if (!pokemon.stats) return 0;
    return Object.values(pokemon.stats).reduce((total, stat) => total + stat, 0);
};