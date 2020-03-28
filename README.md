# 都道府県別の総人口推移グラフを表示するSPA

> Netlifyで公開しています
> https://population-app.netlify.com

## 環境

- node v12.16.1
- create-react-app v3.4.1
- react v16.13.1
- typescript v3.7.2

## 要件
- [RESAS(地域経済分析システム)](https://opendata.resas-portal.go.jp) APIの「都道府県一覧」からAPIを取得する
- APIレスポンスから都道府県一覧のチェックボックスを動的に生成する
- 都道府県にチェックを入れると、RESAS APIから選択された都道府県の「人口構成」を取得する
- 人口構成APIレスポンスから、X軸:年、Y軸:人口数の折れ線グラフを動的に生成して表示する
- 都道府県一覧および総人口情報はRESAS APIのデータを用いる
- グラフは[Highcharts](https://www.highcharts.com)~~や[Rechart.js](http://recharts.org/en-US)などのサードパーティ製のグラフライブラリ~~を用いて描画する
- グラフライブラリは任意のものを用いる
- Google Chrome最新版で正しく動く

![スクリーンショット](https://i.gyazo.com/5ae70aa20527fbdcfba478f41907b712.png "スクリーンショット")

- 「全て選択」、「クリア」ボタンも実装してみたが、「全て選択」ボタンは押すたびに全都道府県の全人口数を取得するので時間がかかる。改善の余地あり。

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
