const favoriteKey = 'favorites';

export function addFavorite(imdbId) {
    const favorites = getFavorites();
    const isFavorite = favorites.indexOf(imdbId) != -1;
    if (!isFavorite) {
        favorites.push(imdbId);
        setFavorites(favorites);
    }
}

export function removeFavorite(imdbId) {
    const favorites = getFavorites();
    const indexOfFavorite = favorites.indexOf(imdbId);
    const isFavorite = indexOfFavorite != -1;
    if (isFavorite) {
        favorites.splice(indexOfFavorite, 1);
        setFavorites(favorites);
    }
}

export function toggleFavorite(imdbId) {
    const favorites = getFavorites();
    const indexOfFavorite = favorites.indexOf(imdbId);
    const isFavorite = indexOfFavorite != -1;
    if (isFavorite) {
        favorites.splice(indexOfFavorite, 1);
    } else {
        favorites.push(imdbId);
    }
    setFavorites(favorites);
}

export function getFavorites() {
    const keyExists = localStorage.getItem(favoriteKey) !== null;
    const favorites = (keyExists)
        ? JSON.parse(localStorage.getItem(favoriteKey))
        : [];
    return favorites;
}

export function setFavorites(favorites) {
    localStorage.setItem(favoriteKey, JSON.stringify(favorites));
}

export function isFavorite(imdbId) {
    const favorites = getFavorites();
    return favorites.indexOf(imdbId) != -1;
}