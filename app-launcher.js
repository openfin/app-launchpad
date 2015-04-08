/**
 * Created by haseebriaz on 02/04/15.
 */

window.addEventListener("DOMContentLoaded", function(){

    fin.desktop.main(function(){

        fin.desktop.System.clearCache({
            cache: true,
            cookies: true,
            localStorage: true,
            appcache: true,
            userData: true
        });

        new Controller(new View());
    });
});

var Controller = (function(){

    var currentWindow = null;
    var currentApp = null;

    function Controller(view){

        this.view = view;
        this.loadConfig();
        window.addEventListener("keydown", this.onKeyup.bind(this));
    };

    Controller.prototype.view = null;
    Controller.prototype.model = null;

    Controller.prototype.onKeyup = function(event){

        if(event.keyCode >= 65 && event.keyCode <= 90) {

            this.view.showSearch(true);
        }
    };

    Controller.prototype._onMinimized = function(){

        currentWindow.hide();
        currentApp.setTrayIcon(this.model.config.trayIcon,this._onTrayIconClicked.bind(this));
    };

    Controller.prototype._onTrayIconClicked = function(){

        currentApp.removeTrayIcon();
        currentWindow.restore();
        currentWindow.show();
    };

    Controller.prototype.loadConfig = function(){

        var xhr = new XMLHttpRequest();
        xhr.onload = this.onConfigLoaded.bind(this);
        xhr.open("get", "appList.json");
        xhr.send();
    };

    Controller.prototype.onConfigLoaded = function(event){

        var config = JSON.parse(event.target.response);
        this.model = new Model(config);
        this.model.onupdate = this.onFilterUpdate.bind(this);
        this.view.initialize(config);

        if(config.trayIcon){

            currentWindow = fin.desktop.Window.getCurrent();
            currentWindow.addEventListener("minimized", this._onMinimized.bind(this));
            currentApp = fin.desktop.Application.getCurrent();
        }
    };

    Controller.prototype.onFilterUpdate = function(){

        this.view.filter(this.model.filter);
    };

    return Controller;
})();

var View = (function(){

    function View(){

        var template = document.querySelector('#app-launcher-template');
        this._node = document.importNode(template.content, true);
    }

    View.prototype._node = null;
    View.prototype._apps = [];

    View.prototype.initialize = function(config){

        var apps = config.applications;
        var length = apps.length;
        var item = null;

        for(var i = 0; i < length; i++){

            item = apps[i];
            this.addAppTile(item, config.iconWidth, config.iconHeight);
        }
    };

    View.prototype.addAppTile = function(config, width, height){

        var node = this._node.querySelector('.app').cloneNode(true);
        var icon = node.querySelector('.icon');
        icon.src = config.icon;
        icon.width = width;
        icon.height = height;

        node.querySelector('.name').innerText = config.name;
        this._apps.push(new App(node, config.name, config.url, config.type === 'systemApp'? config.arguments: config.appOptions, config.type));
        document.body.appendChild(node);
    };

    View.prototype.showSearch = function(value){

        if(value) {

            document.querySelector('.search').style.display = "block";
            document.querySelector('.searchInput').focus();

        } else {

            document.querySelector('.search').style.display = "none";
            document.querySelector('.searchInput').value = "";
        }
    };

    View.prototype.filter = function(filterString){

        this.showSearch(filterString != "");
        var length = this._apps.length;
        var currentApp = null;

        for(var i = 0; i < length; i++){

            currentApp = this._apps[i];
            currentApp.show(filterString == "" || currentApp.name.toLowerCase().indexOf(filterString) > -1);
        }
    };

    return View;
})();

var Model = (function(){

    var searchInput = null;

    function Model(config){

        this.config = config;
        searchInput = document.querySelector('.searchInput');
        searchInput.onkeyup = this.onSearchChange.bind(this);
    }

    Model.prototype.config = null;
    Model.prototype.filter = "";
    Model.prototype.onupdate = null;

    Model.prototype.onSearchChange = function(event){

        if(event.keyCode == 27) searchInput.value = "";
        this.filter  = searchInput.value.toLowerCase();
        this.onupdate();
    };

    return Model;
})();

var App = (function(){

    function App(node, name, url, arguments, type){

        this.url = url;
        this.name = name;
        node.onclick = this.onClick.bind(this);
        this._node = node;
        this.arguments = arguments;
        this.type = type;

        this._onWebAppStarted = this._onWebAppStarted.bind(this)
        this._onWebAppClosed = this._onWebAppClosed.bind(this)
    }

    App.prototype.url = "";
    App.prototype.name = "";
    App.prototype._node = null;
    App.prototype.arguments = null;
    App.prototype.type = "";
    App.prototype._webApp = null;
    App.prototype.isRunning = false;

    App.prototype.onClick = function(){

        if(this.type == "systemApp") {

            fin.desktop.System.launchExternalProcess(this.url, this.arguments);

        } else {

            this.arguments.name = this.name;
            this.arguments.url = this.url;
            this.arguments.autoShow = true;

            if(!this.isRunning) {
                if(this._webApp) {

                    this._webApp.run();
                } else {

                    this._webApp = new fin.desktop.Application(this.arguments, this._onWebAppLaunch.bind(this), this._onWebAppFail.bind(this));
                    this._webApp.addEventListener("started", this._onWebAppStarted);
                    this._webApp.addEventListener("closed", this._onWebAppClosed);
                }
            }
        }
    };

    App.prototype.launchWebApp = function(){

        fin.desktop.System.getAllApplications(this._applicationCallback.bind(this));
    };

    App.prototype._applicationCallback = function(appList){

        for(var i = 0; i < appList.length; i++){

            if(appList[i].uuid === this.arguments.uuid) reutrn;
        }
    };

    App.prototype._onWebAppLaunch = function(){

        this._webApp.run();
    };

    App.prototype._onWebAppStarted = function(){

        this.isRunning = true;
    };

    App.prototype._onWebAppClosed = function(){

        this.isRunning = false;
        this._webApp.removeEventListener("started", this._onWebAppStarted);
        this._webApp.removeEventListener("closed", this._onWebAppClosed );
    };

    App.prototype._onWebAppFail = function(){

        this._webApp.run();
    };

    App.prototype.show = function(value){

        this._node.style.display  = value? "block": "none";
    };

    return App;
})();


