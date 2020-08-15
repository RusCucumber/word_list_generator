import nltk

def nltk_download():
    try:
        nltk.download("punkt")
        nltk.download("wordnet")
        nltk.download("averaged_perceptron_tagger")
        return "OK", "download success"
    except:
        return "NG", "download faild"

if __name__ == "__main__":
    nltk_download()