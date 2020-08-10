from googletrans import Translator
import sys

#word_selected = ["China", "imposes", "sanctions", "on", "US", "senators",
#                "over", "HongKong"]

word_selected = ["China", "imposes", "sanctions"]

translator = Translator()
word_list = {}
for word in word_selected:
    translated = translator.translate(word, dest="ja")
    print(word)
    print(translated.text)
    print()
    word_list[word] = translated.text

print(word_list)
print("done")

f = open("Book1.csv", "w")
b4_trans = list(word_list.keys())
af_trans = list(word_list.values())
for i in range(len(word_list)):
    f.write(b4_trans[i] + "," + af_trans[i] + "\n")
f.close()
