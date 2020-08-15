from selenium import webdriver
import time
import datetime
import chromedriver_binary
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options



"""
# ここから
USER = "usagi_inaba"
PSWD = "artificialINTELLIGENCE"
words_given = [['China', '中国'], ['imposes', '課す'], ['sanctions', '制裁'], ['HongKong', '香港'], ['morning', '朝'], ['hello', 'こんにちは']]
#　ここまでは仮です
"""

class Quizlet:

    def __init__(self, words_given):
        self.words_given = words_given
        self.words = []
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument('--window-size=1024, 2048')
        chrome_options.add_argument('--headless')
        self.__browser = webdriver.Chrome(chrome_options=chrome_options)#, executable_path="C:/Users/ShizukiKubota/Desktop/MyPandas/chromedriver.exe")

    def degree_downer(self):
        for i in range(len(self.words_given)):
            self.words.append(self.words_given[i][0] + "," + self.words_given[i][1] + "\n")


    def open_to_login(self, USER, PSWD):

        #サイトにアクセス
        self.__browser.implicitly_wait(3)
        url_login = "https://quizlet.com/ja"
        self.__browser.get(url_login)
        time.sleep(3)

        #ログイン
        browser_from = self.__browser.find_element_by_class_name("SiteHeader-signInBtn")
        time.sleep(3)
        browser_from.click()

        #ユーザー名パスワード入力
        element = self.__browser.find_element_by_id("username")
        element.clear()
        element.send_keys(USER)
        element = self.__browser.find_element_by_id("password")
        element.clear()
        element.send_keys(PSWD)

        #ログインボタンクリック
        browser_from = self.__browser.find_element_by_class_name("UILoadingButton")
        time.sleep(3)
        browser_from.click()
        time.sleep(3)
        print("login!!!")

        #return "login completed"

        #wait=WebDriverWait(self.__browser,20)
        self.__browser.implicitly_wait(3)
        browser_from = self.__browser.find_element_by_css_selector("#SiteHeaderReactTarget > header > div > div > div.SiteHeader-transitionGroupWrapper > span.SiteHeader-headerItemsTransitionGroup > div > div.SiteHeader-create.SiteHeader-section > a")
        #self.__browser.execute_script("arguments[0].scrollIntoView(true);", browser_from)
        #wait.until(expected_conditions.element_to_be_clickable((By.XPATH,webElement)))
        #browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/div[2]/header/div/div/div[2]/span[2]/div/div[2]/a")
        time.sleep(2)
        browser_from.click()
        print("passed!")

        #インポート画面出す
        try:
            browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[3]/div/button")
            time.sleep(3)
            browser_from.click()
        except:
            #ポップアップ消す
            browser_from = self.__browser.find_element_by_css_selector("body > div.UIModal.UIModal-container.is-gray.is-open.OCRUpsellModal > div > div.UIModal-closeButtonWrapper > div > button > svg")
            time.sleep(2)
            browser_from.click()

            #インポート開く
            browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[3]/div/button")
            time.sleep(3)
            browser_from.click()


        #カンマを選択
        browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[3]/div[1]/div/form/div[2]/div[1]/div/label[2]/input")
        time.sleep(3)
        browser_from.click()

        #単語入力
        element = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[3]/div[1]/div/form/textarea")
        element.clear()
        element.send_keys(self.words)


        #インポート入力
        browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[3]/div[1]/div/form/div[1]/button")
        time.sleep(3)
        browser_from.click()

        #タイトル入力
        dt_now = datetime.datetime.now()
        title = "Word_list_" + str(dt_now.date())
        element = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[2]/div/div[1]/div/label/div/div/div[2]/textarea")
        element.clear()
        element.send_keys(title)


        #仮の作成完了
        time.sleep(2)
        browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[1]/div/div/div/div[3]/button")
        browser_from.click()

        return "new words set"


    def set_language(self):

        #画面を小さく
        self.__browser.set_window_size(100,200)
        time.sleep(2)

        # 英語に設定
        element = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[2]/div/div/div[2]/div/div[1]/div[1]/div/div[3]/div[1]/div[2]/div[1]/div/div[1]/div/div/span[2]/div[2]/div/div/select")
        time.sleep(3)
        element.click()
        lang_select_element = Select(element)
        lang_select_element.select_by_value('en')


        #日本語に設定
        element = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[2]/div/div/div[2]/div/div[1]/div[1]/div/div[3]/div[1]/div[2]/div[1]/div/div[2]/div/div/div[2]/span[2]/div[2]/div/div/select")
        time.sleep(3)
        element.click()
        lang_select_element = Select(element)
        lang_select_element.select_by_value('ja')
        return "language set"



    def complete_creation(self):
        self.__browser.set_window_size(1000,750)
        browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[1]/div/div/div/div[3]/button")
        browser_from.click()
        time.sleep(3)
        return "new word list created"


    def get_url(self):
        time.sleep(1)
        cur_url = self.__browser.current_url
        cur_url = cur_url[0:-4]
        return cur_url

    def entire_action(self):
        #self.degree_downer()
        #self.create_new()
        self.set_language()
        self.complete_creation()
        return self.get_url()

"""
###　main  ###
q = Quizlet(words_given)
try:
    q.degree_downer()
    q.open_to_login(USER, PSWD)
    q.entire_action()

    q.finish()
except:
    q.finish()
"""



# class Quizlet:
#
#     def __init__(self, words_given):
#         self.words_given = words_given
#         self.words = []
#         self.__browser = webdriver.Chrome(executable_path="C:/Users/ShizukiKubota/Desktop/MyPandas/chromedriver.exe")
#         # pathも変える必要あり
#
#     def degree_downer(self):
#         for i in range(len(self.words_given)):
#             self.words.append(self.words_given[i][0] + "," + self.words_given[i][1] + "\n")

#     def open_to_login(self, USER, PSWD):
#
#         self.__browser.set_window_size(1000,750)
#         #サイトにアクセス
#         self.__browser.implicitly_wait(3)
#         url_login = "https://quizlet.com/ja"
#         self.__browser.get(url_login)
#         time.sleep(3)
#
#
#         #ログイン
#         browser_from = self.__browser.find_element_by_class_name("SiteHeader-signInBtn")
#         time.sleep(3)
#         browser_from.click()
#
#         #ユーザー名パスワード入力
#         element = self.__browser.find_element_by_id("username")
#         element.clear()
#         element.send_keys(USER)
#         element = self.__browser.find_element_by_id("password")
#         element.clear()
#         element.send_keys(PSWD)
#
#         #ログインボタンクリック
#         browser_from = self.__browser.find_element_by_class_name("UILoadingButton")
#         time.sleep(3)
#         browser_from.click()
#         time.sleep(3)
#
#         #return "login completed"
#
#
#
#     #def create_new(self):
#
#         #作成ページへ遷移
#         #url_create = "https://quizlet.com/create-set"
#         #elf.__browser.get(url_create)
#         time.sleep(3)
#         browser_from = self.__browser.find_element_by_css_selector("#SiteHeaderReactTarget > header > div > div > div.SiteHeader-transitionGroupWrapper > span.SiteHeader-headerItemsTransitionGroup > div > div.SiteHeader-create.SiteHeader-section > a")
#         time.sleep(2)
#         browser_from.click()
#         #インポート画面出す
#         try:
#             browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[3]/div/button")
#             time.sleep(3)
#             browser_from.click()
#         except:
#             browser_from = self.__browser.find_element_by_css_selector("body > div.UIModal.UIModal-container.is-gray.is-open.OCRUpsellModal > div > div.UIModal-closeButtonWrapper > div > button > svg")
#             time.sleep(2)
#             browser_from.click()
#
#             browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[3]/div/button")
#             time.sleep(3)
#             browser_from.click()
#
#
#         #カンマを選択
#         browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[3]/div[1]/div/form/div[2]/div[1]/div/label[2]/input")
#         time.sleep(3)
#         browser_from.click()
#
#         #単語入力
#         element = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[3]/div[1]/div/form/textarea")
#         element.clear()
#         element.send_keys(self.words)
#
#
#         #インポート入力
#         browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[3]/div[1]/div/form/div[1]/button")
#         time.sleep(3)
#         browser_from.click()
#
#         #タイトル入力
#         dt_now = datetime.datetime.now()
#         title = "Word_list_" + str(dt_now.date())
#         element = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[2]/div/div[1]/div/label/div/div/div[2]/textarea")
#         element.clear()
#         element.send_keys(title)
#
#
#         #仮の作成完了
#         time.sleep(2)
#         browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[1]/div/div/div/div[3]/button")
#         browser_from.click()
#
#         return "new words set"
#
#
#     def set_language(self):
#
#         #画面を小さく
#         self.__browser.set_window_size(100,200)
#         time.sleep(2)
#
#         # 英語に設定
#         element = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[2]/div/div/div[2]/div/div[1]/div[1]/div/div[3]/div[1]/div[2]/div[1]/div/div[1]/div/div/span[2]/div[2]/div/div/select")
#         time.sleep(3)
#         element.click()
#         lang_select_element = Select(element)
#         lang_select_element.select_by_value('en')
#
#
#         #日本語に設定
#         element = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[2]/div/div/div[2]/div/div[1]/div[1]/div/div[3]/div[1]/div[2]/div[1]/div/div[2]/div/div/div[2]/span[2]/div[2]/div/div/select")
#         time.sleep(3)
#         element.click()
#         lang_select_element = Select(element)
#         lang_select_element.select_by_value('ja')
#         return "language set"
#
#
#
#     def complete_creation(self):
#         self.__browser.set_window_size(1000,750)
#         browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[1]/div/div/div/div[3]/button")
#         browser_from.click()
#         time.sleep(3)
#         return "new word list created"
#
#
#     def get_url(self):
#         time.sleep(1)
#         cur_url = self.__browser.current_url
#         cur_url = cur_url[0:-4]
#         return cur_url
#
#     def entire_action(self):
#         #self.degree_downer()
#         #self.create_new()
#         self.set_language()
#         self.complete_creation()
#         return self.get_url()
#
#
# ###　main  ###
# q = Quizlet(words_given)
# q.degree_downer()
# q.open_to_login(USER, PSWD)
# q.entire_action()
