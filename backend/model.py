from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Load dataset
df = pd.read_excel(r"C:\Users\yuva\Downloads\Hackathon_Resume_Screening_Final_Dataset.xlsx")

# Show first 5 rows
print(df.head())

def clean_txt(text):
    # convert to lowercase
    text = text.lower()

    # keep only letters, numbers and spaces
    cleaned = ""
    for i in text:
        if i.isalnum():
            cleaned += i
        else:
            cleaned += " "

    # tokenize
    words = word_tokenize(cleaned)

    # stopwords
    stop_words = set(stopwords.words('english'))

    filtered_words = []

    for word in words:

        if word not in stop_words:
            filtered_words.append(word)

    return " ".join(filtered_words)

df["Cleaned Resume"] = df["Resume Text"].apply(clean_txt)

skills_list = [
    "python",
    "sql",
    "react",
    "fastapi",
    "machine learning",
    "tensorflow",
    "numpy",
    "pandas",
    "java",
    "docker",
    "aws",
    "javascript"
]

# Extracting skills from cleaned dataset
def extract_skills(text):
    extracted_skills = []
    text = text.lower()
    for skill in skills_list:
        if skill.lower() in text:
            extracted_skills.append(skill)
    return extracted_skills

# Apply to Dataset
df["Extracted Skills"] = df["Cleaned Resume"].apply(extract_skills)
print(df["Extracted Skills"].head())

# Candidate Ranking
scores = []

for i in range(len(df)):
    resume = df["Cleaned Resume"][i]
    job_description = df["Job Description Text"][i]
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume, job_description])
    similarity = cosine_similarity(vectors[0],vectors[1])
    match_score = similarity[0][0] * 100
    scores.append(match_score)
df["Match Score"] = scores

# Sorting
ranked_df = df.sort_values(
    by="Match Score",
    ascending=False
)

# Top 5 candidates
print(ranked_df[["Candidate Name", "Match Score"]].head())

# Finding skillgap
def skill_gap(required_skills, extracted_skills):

    missing_skills = []

    # convert required skills string into list
    required = required_skills.lower().split(",")

    for skill in required:
        skill = skill.strip()
        if skill not in extracted_skills:
            missing_skills.append(skill)

    return missing_skills

df["Missing Skills"] = df.apply(
    lambda row: skill_gap(
        row["Required Skills"],
        row["Extracted Skills"]
    ),axis=1)

print(df[["Extracted Skills","Required Skills","Missing Skills"]].head())

# Adding Rank
ranked_df = df.sort_values(by="Match Score",ascending=False)
ranked_df["Rank"] = range(1, len(ranked_df) + 1)
print(ranked_df[["Rank","Candidate Name","Match Score","Extracted Skills","Missing Skills"]].head())
