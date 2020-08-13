#完成版

from selenium import webdriver
import time
import datetime
import pandas as pd
from selenium.webdriver.support.ui import Select

user = "usagi_inaba"
pswd = "artificialINTELLIGENCE"

#ここは別個で取得するのかな？
with open("Book2.csv") as f:
    words = []
    for s_line in f:
        words.append(s_line)


browser = webdriver.Chrome(executable_path="C:/Users/ShizukiKubota/Desktop/MyPandas/chromedriver.exe")
browser.implicitly_wait(3)


def open_to_login(user, pswd):
    USER = user
    PASS = pswd

    #サイトにアクセス
    url_login = "https://quizlet.com/ja"
    browser.get(url_login)
    time.sleep(3)

    #ログイン
    browser_from = browser.find_element_by_class_name("SiteHeader-signInBtn")
    time.sleep(3)
    browser_from.click()

    #ユーザー名パスワード入力
    element = browser.find_element_by_id("username")
    element.clear()
    element.send_keys(USER)
    element = browser.find_element_by_id("password")
    element.clear()
    element.send_keys(PASS)

    #ログインボタンクリック
    browser_from = browser.find_element_by_class_name("UILoadingButton")
    time.sleep(3)
    browser_from.click()
    time.sleep(3)

    return "login completed"




def create_new(words):
    WORDS = words

    #作成ページへ遷移
    url_create = "https://quizlet.com/create-set"
    browser.get(url_create)
    time.sleep(3)

    #インポート画面出す
    try:
        browser_from = browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[3]/div/button")
        time.sleep(3)
        browser_from.click()
    except:
        #print(browser.current_url)
        browser_from = browser.find_element_by_css_selector("body > div.UIModal.UIModal-container.is-gray.is-open.OCRUpsellModal > div > div.UIModal-closeButtonWrapper > div > button > svg")
        time.sleep(2)
        browser_from.click()

        browser_from = browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[3]/div/button")
        time.sleep(3)
        browser_from.click()


    #カンマを選択
    browser_from = browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[3]/div[1]/div/form/div[2]/div[1]/div/label[2]/input")
    time.sleep(3)
    browser_from.click()

    #単語入力
    element = browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[3]/div[1]/div/form/textarea")
    element.clear()
    element.send_keys(WORDS)


    #インポート入力
    browser_from = browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[3]/div[1]/div/form/div[1]/button")
    time.sleep(3)
    browser_from.click()

    #タイトル入力
    dt_now = datetime.datetime.now()
    title = "Word_list_" + str(dt_now.date())
    element = browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[2]/div/div[1]/div/label/div/div/div[2]/textarea")
    element.clear()
    element.send_keys(title)

    #画面を小さく
    browser.set_window_size(100,200)

    #仮の作成完了
    browser_from = browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[1]/div/div/div/div[3]/button")
    browser_from.click()

    return "new words set"


def set_language():

    # 英語に設定
    try:
        element = browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[2]/div/div/div[2]/div/div[1]/div[1]/div/div[3]/div[1]/div[2]/div[1]/div/div[1]/div/div/span[2]/div[2]/div/div/select")
        time.sleep(3)
        element.click()

        lang_select_element = Select(element)
        lang_select_element.select_by_value('en')

    except:

        browser_from = browser.find_element_by_css_selector("#SetPageTarget > div > div.CreateSetPage-container > div.UIContainer > div > div.StudiableItems > div > div:nth-child(1) > div:nth-child(1) > div > div.TermContent.has-richTextToolbar.rt-clean-design > div.TermContent-inner > div.TermContent-inner-padding > div > div > div.TermContent-side.TermContent-side--word > div > div > span.RichTextEditor-label > div.LanguageBarSide.has-error > button")
        time.sleep(3)
        browser_from.click()

        Bf_trans = "英語"
        element = browser.find_element_by_xpath("/html/body/div[6]/div/div/div/div/div/div/div/div[1]/span[1]/div[2]/label/div/input")
        element.clear()
        element.send_keys(Keys.F12)
        element.send_keys(Bf_trans)
        element.send_keys(Keys.ENTER)



    #日本語に設定
    try:
        element = browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[2]/div/div/div[2]/div/div[1]/div[1]/div/div[3]/div[1]/div[2]/div[1]/div/div[2]/div/div/div[2]/span[2]/div[2]/div/div/select")
        time.sleep(3)
        element.click()

        lang_select_element = Select(element)
        lang_select_element.select_by_value('ja')

    except:
        element = browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[2]/div[2]/div/div[1]/div/div[1]/div[1]/div/div[3]/div[1]/div[2]/div/div/div[2]/div/div/div[2]/span[2]/div[2]/button")
        time.sleep(3)
        element.click()

        Af_trans = "日本語"
        element.clear()
        element.send_keys(Af_trans)
        element.send_keys(Keys.ENTER)

    return "language set"



def complete_creation():
    browser.set_window_size(1000,750)
    browser_from = browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[1]/div/div/div/div[3]/button")
    browser_from.click()
    time.sleep(3)

    return "new word list created"


def get_url():
    time.sleep(2)
    cur_url = browser.current_url
    cur_url = cur_url[0:-4]
    print(cur_url)

    return cur_url

open_to_login(user, pswd)
create_new(words)
set_language()
complete_creation()
get_url()
