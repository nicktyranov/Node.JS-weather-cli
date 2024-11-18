#!/usr/bin/env node
import {getArgs} from './helpers/args.js';
import { getIcon, getWeather } from './services/api.service.js';
import { printHelp, printInfo, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import notifier from 'node-notifier';

const supportedLanguages = [
	'sq', 'af', 'ar', 'az', 'eu', 'be', 'bg', 'ca', 'zh_cn', 'zh_tw', 'hr', 'cz', 'da', 
	'nl', 'en', 'fi', 'fr', 'gl', 'de', 'el', 'he', 'hi', 'hu', 'is', 'id', 'it', 'ja', 
	'kr', 'ku', 'la', 'lt', 'mk', 'no', 'fa', 'pl', 'pt', 'pt_br', 'ro', 'ru', 'sr', 
	'sk', 'sl', 'sp', 'es', 'sv', 'th', 'tr', 'ua', 'uk', 'vi', 'zu'
];


const setupTimer = async (hours = 1) => {
	const time = hours * 60 * 60 * 1000;
	console.log(`interval was setup on ${hours} ${hours == 1? 'hour' : 'hours'}`);

	setInterval(async () => { 
		try {
			const res = await getWeather(TOKEN_DICTIONARY.city);
			if (!res){
				return; 
			}
			let data = `📍 Weather in ${res.name} • ${getIcon(res.weather[0].icon)}${res.weather[0].description}${getIcon(res.weather[0].icon)} • 🌡️ Temp: ${res.main.temp}°C (Feels like: ${res.main.feels_like}°C) • 💧 Humidity: ${res.main.humidity}% • 🌬️ Wind speed: ${res.wind.speed} m/s`;

			notifier.notify({
				title: `Current weather ${getIcon(res.weather[0].icon)}`,
				message: data
			});
		
		} catch (error) {
			console.error('Failed to fetch weather data:', error.message);
		}
	}, time);
};

const setupLang = async (lang) => {
	if (!lang.length) {
		await saveKeyValue(TOKEN_DICTIONARY.language, 'en');
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.language, lang);
		printSuccess('language was saved');
	} catch (e) {
		printError(e.message);
	}
};


const saveToken = async (token) => {
	if (!token.length) {
		printError('token was not send');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('token saved');
	} catch (e) {
		printError(e.message);
	}
};

const saveCity = async (city) => {
	if (!city.length) {
		printError('city was not send');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('city saved');
	} catch (e) {
		printError(e.message);
	}
};

const getForecast = async () => {
	try {
		const weather = await getWeather(TOKEN_DICTIONARY.city);
		printWeather(weather, getIcon(weather.weather[0].icon));
	} catch (e) {
		if (e?.response?.status === 404) {
			printError('There is a mistake in the name of city');
		} else if (e?.response?.status === 401) {
			printError('There is a mistake in token');
		} else {
			printError(e.message);
		}
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		return printHelp();
	}
	if (args.s) {
		return saveCity(args.s);
	}
	if (args.t) {
		return saveToken(args.t);
	}
	if (args.lang) {
		if (!supportedLanguages.includes(args.lang)) {
			printError(`Invalid language code. Supported language codes are: ${supportedLanguages.join(', ')}. Use command "weather -h for more information`);
			return printInfo('Use command "weather -h" for more information');
		} else {
			return setupLang(args.lang);
		}
	}

	if (args.ntf) {
		if (args.ntf <= 0) {
			return printError('Please provide a valid number of hours greater than 0.');
		} else {
			return setupTimer(args.ntf);
		}
		
	}
	return getForecast();
};

initCLI();