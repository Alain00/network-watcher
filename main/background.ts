import { app, ipcMain, ipcRenderer, Tray } from 'electron';
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

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on('request-config', (event) => {
    mainWindow.webContents.send('load-config', config.config);
  })


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
