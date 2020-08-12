## App.js
ここでrouteを定義
### `localhost/#/xxx`

## TextField.js
ランディングページ
[TODO]: アプリ名、文章を考える
テキストボックスにコピペをするとMarkerfield.jsコンポーネントにpushする

## Markerfield.js
マウスクリックで単語を選択できる
最終的に
###`api/lemmatisation`
にポストをする。
ポストするjsonは
###`{
	sentence: "...",
	"index": [...],
}`

## Results.js
バックエンドからlemma化されて翻訳された単語と元の単語を取得する
### `{
	data:[
	["original", "translated", index],
	...
	]
}`
形式のデータを扱い、削除、変更できる。


## FinalOptions.js
Results.jsのデータからcsvファイルを作成し、ダウンドロード可能にする
また、[TODO]: quizletのカードを自動的に作成する機能も選択肢とする。
[TODO]: デザインが未完

