#!/usr/bin/env node
import {getArgs} from './helpers/args.js';
import { getIcon, getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import notifier from 'node-notifier';

const setupTimer = async (hours) => {
	// const time = hours * 60 * 60 * 1000;
	const time = 7 * 1000;
	console.log('timer started');

	setInterval(async () => { 
		const res = await getWeather(TOKEN_DICTIONARY.city);
		if (!res){
			return; 
		}
		let data = `📍 Weather in ${res.name} • ${getIcon(res.weather[0].icon)}${res.weather[0].description}${getIcon(res.weather[0].icon)} • 🌡️ Temp: ${res.main.temp}°C (Feels like: ${res.main.feels_like}°C) • 💧 Humidity: ${res.main.humidity}% • 🌬️ Wind speed: ${res.wind.speed} m/s`;

		notifier.notify({
			title: `Current weather ${getIcon(res.weather[0].icon)}`,
			message: data
		});
		
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
		return setupLang(args.lang);
	}

	if (args.ntf) {
		return setupTimer();
	}
	return getForecast();
};

initCLI();