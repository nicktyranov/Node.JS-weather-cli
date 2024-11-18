
# Weather CLI

Weather CLI is a command-line application for retrieving weather information using the OpenWeatherMap API.

## Features

- **Fetch weather details for specific locations**: This CLI uses the OpenWeatherMap API to provide weather updates.
- **Multilingual support**: The CLI supports multiple languages. Configure the desired language using the `-lang` flag (e.g., `-lang en` for English or `-lang ru` for Russian).
- **Flexible updates**: Get weather updates either as a one-time output or at regular intervals using the `-ntf` flag.
- **Console output or notifications**: View weather updates directly in the console or as system notifications (e.g., macOS notifications).

## Installation

### From npm
To install and use the Weather CLI globally:

```bash
npm install -g weather-cli-with-notifications
```

After installation, you can run the CLI with the following commands:
```bash
weather-cli --help
```

### From Source
If you prefer to work with the source code:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weather-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the CLI:
   ```bash
   node index.js
   ```

## Usage

Run the application with the following commands:

### Without Parameters
Displays the weather for the default city.

### Commands
- `-s [CITY]`: Set up the default city.
- `-h`: Display help information.
- `-t [API_KEY]`: Set up the API key for the weather service.
- `-ntf [NUMBER]`: Set up the frequency for checking the weather in hours.
- `-lang [LANGUAGE]`: Set up the language. Supported options include:

  - 🇬🇧 `en`: English  
  - 🇷🇺 `ru`: Russian  
  - 🇪🇸 `es`: Spanish  
  - 🇩🇪 `de`: German  
  - 🇫🇷 `fr`: French  
  - 🇯🇵 `ja`: Japanese  
  - (and many others – see full list in the CLI help).

## File Structure

- **helpers/args.js**: Handles argument parsing from the command line.
- **services/log.service.js**: Handles logging for the application.
- **services/storage.service.js**: Provides storage functionality for user settings and keys.
- **services/api.service.js**: Fetches data from weather APIs.

## Contributing

Feel free to fork this repository, make changes, and submit pull requests.

## License

This project is licensed under the MIT License.
