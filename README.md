<h1 align="center">Toxicity Comment Prediction</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/MohamedAbdelfattah022/Multilable-Toxicity-Comment-Prediction">
&#xa0;
  <img alt="Github language count" src="https://img.shields.io/github/languages/count/MohamedAbdelfattah022/Multilable-Toxicity-Comment-Prediction">
&#xa0;
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/MohamedAbdelfattah022/Multilable-Toxicity-Comment-Prediction">
</p>

<p align="center">
  <a href="#about">About</a> &#xa0; | &#xa0; 
  <a href="#features">Features</a> &#xa0; | &#xa0;
  <a href="#application-ui">Application UI</a> &#xa0; | &#xa0;
  <a href="#technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#starting">Starting</a>
  
</p>
<br>

## About

Toxicity Prediction is a machine learning project that classifies comments into multiple categories of toxicity. Using this [dataset](https://www.kaggle.com/competitions/jigsaw-toxic-comment-classification-challenge) of comments labeled for toxic behavior, the project builds and evaluates various machine learning models, including neural networks, to identify and predict toxic comments. This project also integrates a web application using Flask and Next.js to provide a user-friendly interface for predicting the toxicity of new comments.

## Features

- Preprocessing of text data including tokenization and lemmatization
- Implementation of multiple machine learning models: Logistic Regression, Random Forest, Multinomial Naive Bayes, and Decision Tree
- Building and training a Bidirectional LSTM neural network for improved prediction accuracy
- Evaluation and comparison of model performance using precision, recall, and accuracy metrics
- Interactive web interface for predicting comment toxicity

## Application UI

<img id="application-ui" alt="UI" src="pics\home.png">

## Technologies

- Python
- Pandas
- NumPy
- TensorFlow
- Scikit-learn
- NLTK
- Flask
- Next.js

## Requirements

Before starting make sure to have [Node.js](https://nodejs.org/en/) installed.

## Starting

```bash
# Clone this project
git clone https://github.com/MohamedAbdelfattah022/Multilable-Toxicity-Comment-Prediction
```

```bash
# Access
cd Multilable-Toxicity-Comment-Prediction
```

```bash
# Install Python dependencies
pip install -r requirements.txt
```

```bash
# Run the Flask server
cd backend
python app.py
```

```bash
# Install Node dependencies
cd client
npm i
```

```bash
# Run the Next.js project
npm run dev
```

<a href="#top">Back to top</a>
