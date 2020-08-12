# Word List Generator

## ディレクトリ構成（仮）

        .- config              //設定ファイルディレクトリ
        |- mods                // モジュールディレクトリ
        |- static
        |    |- css             // cssディレクトリ
        |    |- js              // JavaScriptディレクトリ
        |- templates            // htmlディレクトリ
        |- views                // APIディレクトリ
        |- application.py       // アプリ設定ファイル
        |- run.py               // 起動ファイル

- viewsディレクトリ内に、処理別にファイルを作り、application.pyで結合する
- modsディレクトリには、共通モジュール等を配置する
- その他、変更点や案があれば、なんでもお願いいたします🙇‍♂️

---
## git利用方法

### 準備編
1. このリポジトリをクローンする
```
git clone https://github.com/RusCucumber/word_list_generator.git
```

### 開発編
1. masterブランチへ入る
```
git checkout master
```

2. pullし、ローカルを最新にする
```
git pull
// 若しくは、
git pull origin master
```

3. ブランチを切る
```
git checkout -b feature/適当なブランチ名
git branch      // ブランチに入ったか確認
```

4. 開発をする

### プッシュ編
1. コミットの準備をする
```
git add .
```

2. コミットする
```
git commit -m "メッセージ"
```

※コミットメッセージは、以下のようにルール付ける

- 追加
    - [add] 追加内容（新規フォルダ、ファイル作成時）
- 修正
    - [fix] 修正内容
- 削除
    - [del] 削除内容
- 更新
    - [upd] 更新内容（すでにあるファイルや処理に内容を付け足した場合等）

その他、メッセージがある場合は、適宜、ルールを更新する

3. プッシュする
```
git push origin feature/適当なブランチ名
```

### プルリク編
1. GitHubでプルリク依頼を出す

2. GitHubでレビュアーがレビューし、mergeする

#### 小技
- .gitignoreファイル
    - .gitignoreファイルを作り、適当な内容を書き込むことで、``git add .``の対象外にすることができる。
    - 以下のサイト等を参考にすると良い
        - [.gitignore の書き方。ファイル/ディレクトリの除外と反映方法](https://www-creators.com/archives/1662#gitignore-3)
        
- git add コマンドで、コミットするファイルの指定
    - 例えば、test.txtというファイルのみコミットしたい場合は、``git add test.txt``とコマンドを打ち、コミットすれば良い。

#### 参考サイト
[Githubでチーム開発するためのマニュアル](https://qiita.com/siida36/items/880d92559af9bd245c34)
