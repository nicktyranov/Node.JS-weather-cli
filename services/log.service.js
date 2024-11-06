import chalk from 'chalk';
import dedent from 'dedent-js';


const printError = (error) => {
	console.log(chalk.bgRed(` error: ${error}`));
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(` message: ${message}`));
};

const printHelp = () => {
	console.log(
		dedent(`${chalk.bgCyan(' Help ')}
		Without params - output weather
		-s [CITY] to set up the city
		-h for help
		-t [API_KEY] to set up the API_KEY
		`)
	);
};

const printWeather = (res, icon) => {
	console.log(
		dedent(`${chalk.bgYellow(' Weather ')} Weather in the city ${res.name}
		${icon} ${res.weather[0].description}
		Temperature: ${res.main.temp}°C (Feel like: ${res.main.feels_like}°C)
		Humidity: ${res.main.humidity}%
		Wind speed: ${res.wind.speed} m/s
		`)
	);
};

export {printError, printSuccess, printHelp, printWeather};