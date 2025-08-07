export const fetchGif = async (query: string) => {
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
  const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=15`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
