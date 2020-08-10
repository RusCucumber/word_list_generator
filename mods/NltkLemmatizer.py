import re
from nltk.tokenize import word_tokenize
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.tag import pos_tag

class NltkLemmatizer():
    def __init__(self, sentence):
        self.__sentence = sentence
        self.__index = None

    def set_index(self, index):
        self.__index = index
        self.__find_marked_words()

    def Lemmatize(self, marked_word = False):
        tagged_sentence = self.__tag(self.__tokenize(self.__sentence))

        for word, tag in tagged_sentence:
            if tag.startswith("NN"):
                pos = "n"
            elif tag.startswith("VB"):
                pos = "v"
            else:
                pos = "a"

            if marked_word:
                if word == self.__marked_words_list[0]:
                    self.__lemmatized_list.append(WordNetLemmatizer().lemmatize(word, pos))
                    self.__marked_words_list.pop(0)
                if len(self.__marked_words_list) == 0:
                    break
            else:
                self.__lemmatized_list.append(WordNetLemmatizer().lemmatize(word, pos))
                
        return self.__lemmatized_list

    def __tokenize(self, sentence):
        return word_tokenize(sentence)

    def __tag(self, tokenized_sentence):
        return pos_tag(tokenized_sentence)

    def __find_marked_words(self):
        regex = re.compile(".*?" + self.__symbols + ".*?")

        all_words = self.__sentence.split(" ")
        for i in self.__index:
            marked_word = all_words[int(i)]
            if regex.match(marked_word):
                self.__marked_words_list.extend(self.__tokenize(marked_word))
            else:
                self.__marked_words_list.append(marked_word)

    def get_marked_words(self):
        return self.__marked_words_list

    __symbols = "[!\"#$%&'\\\\()*+,-./:;<=>?@[\\]^_`{|}~「」〔〕“”〈〉『』【】＆＊・（）＄＃＠。、？！｀＋￥％。、]"
    __lemmatized_list = []
    __marked_words_list = []
