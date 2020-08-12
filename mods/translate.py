from googletrans import Translator

def translate(word_list):
    translated_word_list = []

    translator = Translator()

    for i, word in enumerate(word_list):
        translated_word = translator.translate(word, dest = "ja")
        translated_word_list.append([word, translated_word.text, i])
    
    return translated_word_list