import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'node:path'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    frame: false,
    width: 1500,
    height: 900,
    minHeight: 400,
    minWidth: 300,
    icon: join(__dirname, '../public/favicon.ico'),
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#ffffff00',
      symbolColor: '#434343',
      height: 30,
    },
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  })

  ipcMain.handle('darkMode:toggle', (event, dark: boolean) => {
    win.setTitleBarOverlay(
      dark
        ? { color: '#21212100', symbolColor: '#999999' }
        : { color: '#ffffff00', symbolColor: '#434343' }
    )
  })

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // Load your file
    win.loadFile('dist/index.html')
  }
})

app.on('browser-window-created', (e, win) => {
  win.removeMenu()
})
