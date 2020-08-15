from mods.NltkLemmatizer import NltkLemmatizer

sentence = "You're students. I can't eat apples. He swam. She is stronger than Ms.Smith."

print("\ntarget sentence: {}".format(sentence))

lem = NltkLemmatizer(sentence)
print("Lemmatize all words.")
print(lem.Lemmatize())

print("\nmarked words: [You're, students, can't, swam, is, Ms.Smith] (index = [0, 1, 3, 7, 9, 12])")
lem = NltkLemmatizer(sentence)
lem.set_index([0, 1, 3, 7, 9, 12])

lem = NltkLemmatizer(sentence)
print("Lemmatize only marked words.")
print(lem.Lemmatize(marked_word = True))