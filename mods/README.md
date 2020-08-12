## Module List
---

1. **check_parameter.py**
    - 引数
        1. request.get_json()
            - 詳細
                - requestは、flaskのオブジェクト
                - get_json()メソッドで、jsonを取得
        2. json_keys
            - 型: リスト/タプル
            - 詳細: jsonのキー
    - 戻り値
        1. response
            - 型: リスト
            - 詳細
                1. json_keysのサイズに + 1 したサイズのリスト
                2. 最初のインデックスには、処理結果が格納
                    - "OK": 成功
                    - "Json key error": 存在しないキーでリクエストした
                    - "Request error": Jsonの取得やリクエストに失敗した
                3. それ以降のインデックスには、jsonのkeyに対応した値
    - 使用例
    ``` python
    # {"userid": "test@example.com", "pswd": "passwoed"} がPOSTされるとする
    from flask import request
    from mods.check_parameter import check_parameter

    json_keys = ["userid", "pswd"]
    staus, userid, pswd = check_parameter(request.get_json(), json_keys)
    
    if staus == "OK": # jsonの値取得成功
        print(userid, pswd)
    else: # jsonの値取得失敗
        raise Exception(status)
    ```
---

2. **read_config.py**
    - 引数
        1. config_file
            - 型: string
            - 詳細
                - configファイル名
                - 後で修正する予定大
    - 返り値
        1. ini
            - 型: configparser class
            - 詳細:
                - 現状、config.iniのファイルを読み込んだ変数が返される
    - 使用例
    ``` python
    from mods.read_config import read_config

    ini = read_config("config")
    read_hoge = ini["HOGE"] # iniファイルのセクション名
    print(read_hoge.get("piyo")) # iniファイルのセクション下のキー
    ```

---

3. **NltkLemmatizer.py**
    - コンストラクタ
        - 引数
            1. sentence
                - 型: string
                - 詳細: レンマ化する文章
    - メソッド
        1. set_index
            - 引数
                1. index
                    - 型: リスト
                    - 詳細: sentenceのマークした単語のインデックス
        2. Lemmatize
            - 引数
                1. marked_word = True / False
                    - 型: bool
                    - デフォルト: False
                2. caribrate = True / False
                    - 型: bool
                    - デフォルト: False
            - 返り値
                1. marked_word = False, caribrate = False
                    - lemmatized_list
                        - 詳細: 文章中の単語全てをレンマ化したリスト
                2. marked_word = True, caribrate = False
                    - lemmatize_list
                        - 詳細: マークされた単語のみをレンマ化したリスト
                3. marked_word = False, caribrate = True
                    - lemmatized_list
                        - 詳細: 文章中の単語全てをレンマ化し、較正したリスト
                4. marked_word = True, caribrate = True
                    - lemmatize_list
                        - 詳細: マークされた単語のみをレンマ化し、較正したリスト
        3. get_marked_words
            - 返り値
                - marked_words_list
                    - 詳細: マークされた単語のリスト
    - 使用例
    ``` python
    from mods.NltkLemmatizer import NltkLemmatizer

    sentence = "You're students. She ran around school."
    index = [1, 3] # studentsとran
    lem = NltkLemmatizer(sentence)
    lem.set_index(index)
    print(lem.get_marked_words) # [students, ran]
    print(lem.Lemmatize(marked_word = True)) #[student, run]
    ```

---

4. **nltk_download.py**
    - NLTKに必要なファイルをダウンロードする。
    - 詳細は省略する。