import { app, BrowserWindow, ipcMain, ipcRenderer, Tray } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import { Config } from './helpers/config';
import { createTray } from './helpers/create-tray';

const isProd: boolean = process.env.NODE_ENV === 'production';
const config = new Config();
let tray : Tray = null;

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = await createWindow('main', {
    width: 1000,
    height: 600,
  }, '/home');

  ipcMain.on('request-config', (event) => {
    event.sender.send('load-config', config.config);
  })

  ipcMain.on('update-config', (event, newConfig) => {
    config.updateConfig(newConfig)
    const windows = BrowserWindow.getAllWindows()
    for (const w of windows) w.webContents.send('load-config', config.config);
  })

  createWindow('add-host', {
    parent: mainWindow,
    modal: true,
    frame: false,
    show: false,
    resizable: false,
    movable: false,
    center: true,
    useContentSize: true,
  }, '/add-host');


  mainWindow.on('minimize', (e) => {
    e.preventDefault();
    mainWindow.hide();
    tray = createTray(mainWindow, app);
  })

  mainWindow.on('restore', (e) => {
    mainWindow.show()
    tray.destroy();
  })

})();

app.on('window-all-closed', () => {
  app.quit();
});
