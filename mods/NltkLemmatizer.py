import re
from nltk.tokenize import word_tokenize
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.tag import pos_tag

class NltkLemmatizer():
    def __init__(self, sentence):
        self.__sentence = sentence
        self.__index = None
        self.__lemmatized_list = []
        self.__marked_words_list = []

    def set_index(self, index):
        self.__index = index
        self.__find_marked_words()

    def Lemmatize(self, marked_word = False, caribration = False):
        tagged_sentence = self.__tag(self.__tokenize(self.__sentence))
        i = 0

        for word, tag in tagged_sentence:
            if tag.startswith("NN"):
                pos = "n"
            elif tag.startswith("VB"):
                pos = "v"
            else:
                pos = "a"

            if marked_word:
                if word == self.__marked_words_list[i]:
                    i += 1
                    self.__lemmatize(word, pos, caribration)
                    #self.__marked_words_list.pop(0)

                    if len(self.__marked_words_list) == i:
                        break
            else:
                tuple(self.__lemmatize(word, pos, caribration))
                
        return tuple(self.__lemmatized_list)

    def get_marked_words(self):
        return tuple(self.__marked_words_list)

    def __tokenize(self, sentence):
        return word_tokenize(sentence)

    def __tag(self, tokenized_sentence):
        return pos_tag(tokenized_sentence)

    def __lemmatize(self, word, pos, caribration_flag):
        lemmatized_word = WordNetLemmatizer().lemmatize(word, pos)
        if caribration_flag:
            self.__caribration(lemmatized_word)
        else: 
            self.__lemmatized_list.append(lemmatized_word)

    def __caribration(self, lemmatized_word):
        if lemmatized_word == "n't":
            if len(self.__lemmatized_list) != 0 and self.__lemmatized_list[-1] == "ca":
                self.__lemmatized_list[-1] = self.__lemmatized_list[-1] + lemmatized_word
            else:
                lemmatized_word = "not"
                self.__lemmatized_list.append(lemmatized_word)
            return

        regex = re.compile("^" + self.__symbols + "$")
        if regex.match(lemmatized_word):
            return

        regex = re.compile("^'[a-zA-Z]+")
        if regex.match(lemmatized_word):
            if len(self.__lemmatized_list) != 0:
                self.__lemmatized_list[-1] = self.__lemmatized_list[-1] + lemmatized_word
                return 

        self.__lemmatized_list.append(lemmatized_word)   

    def __find_marked_words(self):
        regex = re.compile(".*?" + self.__symbols + ".*?")

        all_words = self.__sentence.split(" ")
        for i in self.__index:
            marked_word = all_words[int(i)]
            if regex.match(marked_word):
                self.__marked_words_list.extend(self.__tokenize(marked_word))
            else:
                self.__marked_words_list.append(marked_word)        

    __symbols = "[!\"#$%&'\\\\()*+,-./:;<=>?@[\\]^_`{|}~「」〔〕“”〈〉『』【】＆＊・（）＄＃＠。、？！｀＋￥％。、]"