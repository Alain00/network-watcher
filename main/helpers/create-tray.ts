import { App, BrowserWindow, Menu, Tray } from 'electron';
import path from 'path';

export function createTray(mainWindow: BrowserWindow, app: App) {
  let appIcon = new Tray(path.join(__dirname, '../resources/icon.ico'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click: function () {
        mainWindow.show();
      },
    },
    {
      label: 'Exit',
      click: function () {
        app.quit();
      },
    },
  ]);

  appIcon.on('double-click', function (event) {
    mainWindow.show();
  });
  appIcon.setToolTip(app.name);
  appIcon.setContextMenu(contextMenu);
  return appIcon;
}
