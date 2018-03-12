# App Launchpad Example

## Overview
The intention of this repo is to provide developers a general approach to an app launchpad for launching apps while utilizing OpenFin. By design, the approach is generic and not intended to solve specific internal app launcher use cases. Our thought here is to provide a framework for those app developers to have as a guide, but provide the flexibility and optionality to solve for their own unique use cases. 

*Note: Please be aware that this is not a product and consider cloning this project to use it.*

### Features
* Search/Filtering for designated apps
* Ability to launch Calculator, Explorer, Notepad, Paint, other existing apps
* Watermark image for corporate logos or branding

## Launch
### OpenFin Installer
* Click this OpenFin [App Launcher Installer](https://install.openfin.co/download?fileName=app-launchpad&config=http://openfin.github.io/app-launchpad/app.json).
* Unzip and run the installer.
* Double click the icon it creates on your desktop.

### Run Locally
* Make sure you have [node](https://nodejs.org/en/) installed.
* Clone this repository.
* Open a command-line terminal, navigate to the **app-launchpad** directory.
* In the terminal, run `npm install`.
* After all packages have been, installed, run `node server`.

## Disclaimers
* This is a starter example and intended to demonstrate to app providers a sample of how to approach an implementation. There are potentially other ways to approach it and alternatives could be considered. 
* This is an open source project and all are encouraged to contribute.
* Its possible that the repo is not actively maintained.

## Support
Please enter an issue in the repo for any questions or problems. 
<br> Alternatively, please contact us at support@openfin.co
