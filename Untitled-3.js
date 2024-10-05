// Sample movie data
const movies = [
    { title: 'Inception', id: 101 },
    { title: 'The Matrix', id: 102 },
    { title: 'Interstellar', id: 103 },
    { title: 'The Dark Knight', id: 104 },
];

// Sample similarity scores (these should come from your cosine similarity calculation)
const similarityScores = [
    [1, 0.8, 0.5, 0.4], // Inception
    [0.8, 1, 0.3, 0.2], // The Matrix
    [0.5, 0.3, 1, 0.9], // Interstellar
    [0.4, 0.2, 0.9, 1], // The Dark Knight
];

// Function to get recommendations based on user input
function getRecommendations(favouriteMovie) {
    const closeMatch = movies.find(movie => movie.title.toLowerCase() === favouriteMovie.toLowerCase());
    
    if (closeMatch) {
        const index = movies.indexOf(closeMatch);
        const scores = similarityScores[index];
        
        const recommendations = movies.map((movie, i) => ({
            title: movie.title,
            score: scores[i]
        })).sort((a, b) => b.score - a.score).slice(0, 3); // Top 3 recommendations
        
        return recommendations;
    } else {
        return [];
    }
}

// Event listener for the button
document.getElementById('recommendButton').addEventListener('click', () => {
    const favouriteMovie = document.getElementById('favouriteMovie').value;
    const recommendations = getRecommendations(favouriteMovie);
    
    const recommendationsList = document.getElementById('recommendations');
    recommendationsList.innerHTML = '';

    if (recommendations.length > 0) {
        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = `${rec.title} (Score: ${rec.score})`;
            recommendationsList.appendChild(li);
        });
    } else {
        recommendationsList.innerHTML = '<li>No recommendations found.</li>';
    }
});
