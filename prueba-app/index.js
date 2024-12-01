const { app, BrowserWindow, globalShortcut, Tray, Menu } = require('electron');

let mainWindow;
let tray = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile('index.html');

    // Minimizar a la bandeja en lugar de cerrar
    mainWindow.on('close', (event) => {
        event.preventDefault();
        mainWindow.hide();
    });

    // Crear el icono de bandeja
    // tray = new Tray('icon.png'); // Cambia 'icon.png' por tu icono
    tray = new Tray(path.join(__dirname, 'assets', 'icon.png'));

    const trayMenu = Menu.buildFromTemplate([
        { label: 'Abrir', click: () => mainWindow.show() },
        { label: 'Salir', click: () => {
            globalShortcut.unregisterAll();
            app.quit();
        } },
    ]);
    tray.setContextMenu(trayMenu);

    // Registrar el atajo de teclado
    globalShortcut.register('Alt+S+P', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
        }
    });
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});
