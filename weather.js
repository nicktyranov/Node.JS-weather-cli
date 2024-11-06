#!/usr/bin/env node
import {getArgs} from './helpers/args.js';
import { getIcon, getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

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
		// const weather = await getWeather(process.env.CITY);
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
	
	console.log(process.env);

	if (args.h) {
		return printHelp();
	}
	if (args.s) {
		return saveCity(args.s);
	}
	if (args.t) {
		return saveToken(args.t);
	}
	return getForecast();
	
	
};

initCLI();