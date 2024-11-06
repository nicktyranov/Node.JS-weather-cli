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
		-s [CITY] to setup the city
		-h for help
		-t [API_KEY] to setup the API_KEY
		-ntf [NUMBER] to setup the frequency of checking weather in hours
		-lang [LANGUAGE] to set up the language
			🇦🇱 sq Albanian
			🇿🇦 af Afrikaans
			🇦🇪 ar Arabic
			🇦🇿 az Azerbaijani
			🇪🇸 eu Basque
			🇧🇾 be Belarusian
			🇧🇬 bg Bulgarian
			🇪🇸 ca Catalan
			🇨🇳 zh_cn Chinese Simplified
			🇹🇼 zh_tw Chinese Traditional
			🇭🇷 hr Croatian
			🇨🇿 cz Czech
			🇩🇰 da Danish
			🇳🇱 nl Dutch
			🇬🇧 en English
			🇫🇮 fi Finnish
			🇫🇷 fr French
			🇪🇸 gl Galician
			🇩🇪 de German
			🇬🇷 el Greek
			🇮🇱 he Hebrew
			🇮🇳 hi Hindi
			🇭🇺 hu Hungarian
			🇮🇸 is Icelandic
			🇮🇩 id Indonesian
			🇮🇹 it Italian
			🇯🇵 ja Japanese
			🇰🇷 kr Korean
			🇹🇷 ku Kurmanji (Kurdish)
			🇱🇻 la Latvian
			🇱🇹 lt Lithuanian
			🇲🇰 mk Macedonian
			🇳🇴 no Norwegian
			🇮🇷 fa Persian (Farsi)
			🇵🇱 pl Polish
			🇵🇹 pt Portuguese
			🇧🇷 pt_br Português Brasil
			🇷🇴 ro Romanian
			🇷🇺 ru Russian
			🇷🇸 sr Serbian
			🇸🇰 sk Slovak
			🇸🇮 sl Slovenian
			🇪🇸 sp, es Spanish
			🇸🇪 sv, se Swedish
			🇹🇭 th Thai
			🇹🇷 tr Turkish
			🇺🇦 ua, uk Ukrainian
			🇻🇳 vi Vietnamese
			🇿🇦 zu Zulu
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