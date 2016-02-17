# App Launcher Example by OpenFin

## App Launcher Approach
The intention of this repo is to provide developers a general approach to an app launcher for launching apps while utilizing OpenFin. By design, the approach is generic and not intended to solve specific internal app launcher use cases. Our thought here is to provide a framework for those app developers to have as a guide, but provide the flexibility and optionality to solve for their own unique use cases. PLEASE BE AWARE THAT THIS IS NOT A PRODUCT AND CONSIDER CLONING THIS PROJECT TO USE IT. 

## Current Features
* Search / Filtering for designated apps
* Ability to launch Calculator, Explorer, Notepad, Paint
* Watermark image for corporate logos or branding

## Demo Example
* Click this OpenFin [App Launcher Installer](https://dl.openfin.co/services/download?fileName=app-launchpad&config=http://openfin.github.io/app-launchpad/app.json)
* Unzip and run the installer
* Double click the icon it creates on your desktop

# Localhost Example
* Make sure you have node installed [https://nodejs.org/en/](https://nodejs.org/en/)
* Clone this repository
* Open a command-line terminal, navigate to the 'app-launchpad' directory
* in the terminal run 'npm install'
* after all packages have installed run 'node server'
* Download a locally running version with this link [Local App Launcher Installer](https://dl.openfin.co/services/download?fileName=app-launchpad-local&config=http://localhost:5000/app.json)
* Unzip and run the installer
