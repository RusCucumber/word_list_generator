from googletrans import Translator
import sys
import csv

#word_selected = ["China", "imposes", "sanctions", "on", "US", "senators",
#                "over", "HongKong"]

word_selected = ["China", "imposes", "sanctions"]

translator = Translator()
word_list = []
for word in word_selected:
    translated = translator.translate(word, dest="ja")
    print(word)
    print(translated.text)
    #print()
    word_list.append([word, translated.text])

print(word_list)
print("done")

with open('Book2.csv', 'w', newline="") as f:
    writer = csv.writer(f)
    writer.writerows(word_list)
