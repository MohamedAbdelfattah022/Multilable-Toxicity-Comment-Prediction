from flask import Flask, request, jsonify
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout, Bidirectional
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.layers import TextVectorization
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins='http://localhost:3000')

app.secret_key = 'e9aa5b78bce79caa06c445b365058979840b1ab60338fdc6'

num_of_words = 200000

with open(".\\vocab.txt", 'r') as f:
    vocab = f.read().splitlines()

vectorizer = TextVectorization(max_tokens=num_of_words,
                               output_sequence_length=1800,
                               output_mode='int',
                               vocabulary=vocab)

stop_words = set(stopwords.words('english'))

def preprocess_text(text, lemmatizer):
    text = text.lower()
    text = re.sub(r'\W', ' ', text)
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    tokens = word_tokenize(text)
    # tokens = [lemmatizer.lemmatize(word) for word in tokens if word not in stop_words]
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    return ' '.join(tokens)

model = tf.keras.models.load_model('.\\my_model.h5')

def predict_comment(comment):
    vectorized_comment = vectorizer([comment])
    results = model.predict(vectorized_comment)
    lables = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']
    text = ''
    for idx, col in enumerate(lables):
        text += '{}: {}\n'.format(col, results[0][idx]>0.5)
    
    return text

@app.route('/predict/', methods=['POST'])
def predict():
    lemmatizer = WordNetLemmatizer()
    input = request.json['input']
    preprocessed = preprocess_text(input, lemmatizer)
    print(preprocessed)
    return predict_comment(preprocessed)

if __name__ == '__main__':
    app.run(port=5000, debug=True)