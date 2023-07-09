import axios from 'axios';

export const getRandomImage = async () => {
  try {
    const response = await axios.get('https://source.unsplash.com/random/800x600');
    return response.request.responseURL;
  } catch (error) {
    console.error('Error fetching random image:', error);
    return null;
  }
};
