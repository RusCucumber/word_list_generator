from selenium import webdriver
import time
import datetime
import chromedriver_binary
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options

class Quizlet:

    def __init__(self, words_given):
        self.words_given = words_given
        self.words = []
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument('--window-size=1024, 2048')
        #chrome_options.add_argument('--headless')
        self.__browser = webdriver.Chrome(chrome_options=chrome_options)

    def degree_downer(self):
        for i in range(len(self.words_given)):
            self.words.append(self.words_given[i][0] + "," + self.words_given[i][1] + "\n")


    def create_new(self, USER, PSWD):

        #self.__browser.set_window_size(1000,750)
        #作成ページへ遷移
        url_create = "https://quizlet.com/create-set"
        self.__browser.get(url_create)
        time.sleep(3)

        #ログインボタン押す
        browser_from = self.__browser.find_element_by_css_selector("body > div.UIModal.UIModal-container.is-white.is-open > div > div.UIModalBody > form > div.SignupWithEmailForm-belowForm > div.UIDiv.SignupWithEmailForm-alreadyHaveAccount > span > span > button > span")
        time.sleep(3)
        print("button found")
        browser_from.click()
        time.sleep(3)
        print("clicked")


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



        #インポート画面出す
        try:
            browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[3]/div/button")
            time.sleep(3)
            browser_from.click()
        except:
            browser_from = self.__browser.find_element_by_css_selector("body > div.UIModal.UIModal-container.is-gray.is-open.OCRUpsellModal > div > div.UIModal-closeButtonWrapper > div > button > svg")
            time.sleep(2)
            browser_from.click()

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



        return "new words set"


    def set_language(self):

        #仮の作成完了
        self.__browser.set_window_size(1000,750)
        time.sleep(2)
        browser_from = self.__browser.find_element_by_xpath("/html/body/div[3]/main/div/div/div[1]/div[1]/div/div/div/div[3]/button")
        browser_from.click()

        time.sleep(2)

        self.__browser.set_window_size(100,200)
        time.sleep(3)

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
        #return "language set"



    #def complete_creation(self):
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


    def finish(self):
        self.__browser.close()
        self.__browser.quit()

if __name__ == "__main__":
    pass