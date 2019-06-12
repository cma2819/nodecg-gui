'use strict'

// Constants
const constants = require('./constants');

const electron = require('electron');
// アプリ管理用モジュール
const app = electron.app;
// ウィンドウ表示用モジュール
const BrowserWindow = electron.BrowserWindow;
// NodeCG Handler
const nodecg = require('./main/nodecg-handler');

const path = require('path');
const url = require('url');

// モックモード
const isMock = false;
let fileRoot = 'renderer/';
if (isMock) {
  fileRoot += 'mock/';
}

// ガベージコレクションで消去されないようにグローバル変数で定義
let mainWindow;

function createWindow () {
  // ブラウザウィンドウ作成
  mainWindow = new BrowserWindow({
    width: constants.MAIN_WINDOW_WIDTH, height: constants.MAIN_WINDOW_HEIGHT,
    show: false});

  // index.htmlの設定
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, fileRoot + 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })

  // メニューバーを削除
  mainWindow.setMenu(null);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // ウィンドウクローズ時に実行
  mainWindow.on('closed', function () {
    // クローズ時にメモリ解放
    mainWindow = null;
  })
}

function loadDashboard() {
  mainWindow.loadURL(constants.NODECG_URL);
}

// 初期化終了後に実行.
// ready後に実行するAPIはここで
app.on('ready', async () => {
  createWindow();
  await nodecg.start();
  await loadDashboard();
});

// 全てのウィンドウが閉じたときアプリケーションを終了
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})
