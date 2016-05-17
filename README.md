# App Launcher Example by OpenFin

## App Launcher Approach
The intention of this repo is to provide developers a general approach to an app launcher for launching apps while utilizing OpenFin. By design, the approach is generic and not intended to solve specific internal app launcher use cases. Our thought here is to provide a framework for those app developers to have as a guide, but provide the flexibility and optionality to solve for their own unique use cases. 

*Note: Please be aware that this is not a product and consider cloning this project to use it.*

## Current Features
* Search/Filtering for designated apps
* Ability to launch Calculator, Explorer, Notepad, Paint
* Watermark image for corporate logos or branding

## Demo Example
* Click this OpenFin [App Launcher Installer](https://dl.openfin.co/services/download?fileName=app-launchpad&config=http://openfin.github.io/app-launchpad/app.json).
* Unzip and run the installer.
* Double click the icon it creates on your desktop.

## Localhost Example
* Make sure you have [node](https://nodejs.org/en/) installed.
* Clone this repository.
* Open a command-line terminal, navigate to the **app-launchpad** directory.
* In the terminal, run `npm install`.
* After all packages have been, installed, run `node server`.
* Download a locally running version with this [Local App Launcher Installer link](https://dl.openfin.co/services/download?fileName=app-launchpad-local&config=http://localhost:5000/app_local.json).
* Unzip and run the installer.
