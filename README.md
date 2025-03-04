# URL Redirector Chrome Extension

## Description
The URL Redirector Chrome Extension allows users to customize redirection links and manage a home page URL. Users can set up to four custom redirection links and specify a default home page URL. This extension is designed to provide quick access to frequently visited pages or websites directly from the Chrome browser toolbar.

## Features
- **Custom Redirect Links:** Set up to four custom redirection links with labels and URLs.
- **Home Page URL:** Define a default home page URL that can be accessed quickly.
- **Theme Customization:** Choose from predefined color themes for the extension interface.
- **Reset Settings:** Reset all settings to default if needed.

## Installation
To install the extension locally in Chrome:
1. Download or clone the repository.
2. Navigate to `chrome://extensions/` in your Chrome browser.
3. Enable Developer mode (toggle switch in the top right corner).
4. Click on "Load unpacked" and select the directory where the extension files are located.

## Usage
1. After installation, click on the extension icon in the Chrome toolbar.
2. Set or modify the redirection links and home page URL using the provided input fields.
3. Customize the theme color of the extension interface by selecting from available color options.
4. Click on the reset button to revert all settings to default values.

## Development
This extension is developed using HTML, CSS, and JavaScript. It utilizes Chrome's storage API (`localStorage`) to store and retrieve user-defined settings such as redirection links, home page URL, and theme color. The `popup.js` file manages event handling, DOM manipulation, and storage operations.

## Contributing
Contributions are welcome! If you find any bugs, have feature requests, or want to contribute to the project, please feel free to open an issue or submit a pull request on GitHub.

## License
This project is licensed under the [MIT License](link-to-license-file).
