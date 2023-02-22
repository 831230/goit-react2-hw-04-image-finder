import axios from 'axios';

export async function fetchPictures(query, page) {
  const FETCH_API_URL = 'https://pixabay.com/api/';
  const API_KEY = '26135070-3e729b9e8c0999352fd85e768';
  const IMAGES_PER_PAGE = 12;

  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    lang: 'en',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: IMAGES_PER_PAGE,
  });
  try {
    const response = await axios(FETCH_API_URL + '?' + params);
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
