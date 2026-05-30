import nltk
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Download NLTK resources
nltk.download('punkt')
nltk.download('punkt_tab')
nltk.download('stopwords')


# Skills List
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


# Text Cleaning Function
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


# Skill Extraction Function
def extract_skills(text):

    extracted_skills = []

    text = text.lower()

    for skill in skills_list:

        if skill.lower() in text:
            extracted_skills.append(skill)

    return extracted_skills


# Skill Gap Function
def skill_gap(required_skills, extracted_skills):

    missing_skills = []

    # convert required skills into list
    required = required_skills.lower().split(",")

    for skill in required:

        skill = skill.strip()

        if skill not in extracted_skills:
            missing_skills.append(skill)

    return missing_skills

# Extracting the Experience

def extract_experience(text):

    text = text.lower()

    patterns = [

        r'(\d+)\+?\s*years',
        r'(\d+)\+?\s*yrs',
        r'(\d+)\+?\s*year',
        r'(\d+)\+?\s*yr'

    ]

    experiences = []

    for pattern in patterns:

        matches = re.findall(pattern, text)

        for match in matches:

            experiences.append(int(match))

    if experiences:

        return max(experiences)

    return 0