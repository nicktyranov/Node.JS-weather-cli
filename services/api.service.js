import {getKeyValue, TOKEN_DICTIONARY} from './storage.service.js';
import axios from 'axios';

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
	case '01':
		return '☀️';
	case '02':
		return '🌤';
	case '03':
		return '☁️';
	case '04':
		return '☁️';
	case '09':
		return '🌧';
	case '10':
		return '🌧';
	case '11':
		return '⛈';
	case '13':
		return '❄️';
	case '50':
		return '🌫';
	default:
		return '🤷';

	}
};

const getWeather = async () => {
	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('API key was not set up, use command -t [API_KEY]');
	}
	const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
	if (!city) {
		throw new Error('city was not set up, use command -s [city_name]');
	}
	const language = await getKeyValue(TOKEN_DICTIONARY.language) || 'en';
	
	try {
		const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
			params: {
				q: city,
				appid: token,
				lang: language,
				units: 'metric'
			},
			timeout: 5000
		});
		return data;
	} catch (error) {
		console.error('Failed to fetch weather data:', error.message);
		throw error;
	}
};

export {getWeather, getIcon};