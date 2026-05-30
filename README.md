# 🤖 AI-Powered Resume Screening System

## 📌 Project Overview

The AI-Powered Resume Screening System is an intelligent recruitment platform that automates the resume screening process using Natural Language Processing (NLP) and Machine Learning techniques.

The system analyzes resumes against job descriptions, extracts relevant skills, identifies skill gaps, evaluates candidate experience, generates ATS compatibility scores, and ranks candidates based on their suitability for a role.

---

# 🎯 Problem Statement

Recruiters often spend significant time manually reviewing resumes, making the hiring process:

- Time-consuming
- Inconsistent
- Prone to human bias

This project automates candidate evaluation by transforming resume and job description data into objective, explainable insights.

---

# 🚀 Key Features

### ✅ Resume Upload
- Upload multiple PDF resumes
- Automatic text extraction

### ✅ Job Description Analysis
- Compare resumes with job descriptions
- Extract important keywords and skills

### ✅ Skill Extraction
- Identify technical skills automatically
- Extract skills from uploaded resumes

### ✅ Skill Gap Analysis
- Detect missing required skills
- Suggest areas for improvement

### ✅ Candidate Ranking
- Rank candidates based on relevance
- Display highest-ranked candidates first

### ✅ Match Score Generation
- Generate resume-to-job match score
- Use NLP-based similarity calculation

### ✅ ATS Compatibility Score
- Evaluate resume ATS friendliness
- Analyze keyword coverage and formatting

### ✅ Experience Analysis
- Extract years of experience
- Compare with required experience
- Detect:
  - Suitable Candidates
  - Underqualified Candidates
  - Overqualified Candidates

### ✅ Explainable AI Insights
- Show matched skills
- Show missing skills
- Explain why a candidate received a particular score

### ✅ Recruiter Dashboard
- Candidate comparison chart
- Ranked candidate list
- Detailed candidate profile view

---

# 🛠️ Technologies Used

## Frontend

- React.js
- Vite
- Tailwind CSS
- Recharts

## Backend

- FastAPI
- Python

## NLP & Machine Learning

- NLTK
- TF-IDF Vectorizer
- Cosine Similarity
- Scikit-Learn

## Resume Processing

- PDFPlumber

---

# 📂 Project Structure

AI-Resume-Screening-System

├── backend

│ ├── main.py

│ └── utils.py

│

├── frontend

│ ├── src

│ │ ├── pages

│ │ │ ├── Home.jsx

│ │ │ └── Candidate.jsx

│ │ ├── App.jsx

│ │ └── main.jsx

│

├── uploads

│

└── README.md

---

# 🔄 System Workflow

1. Upload one or more resumes
2. Paste the job description
3. Extract resume text
4. Clean and preprocess text
5. Extract skills
6. Calculate similarity score
7. Analyze experience
8. Generate ATS score
9. Rank candidates
10. Display recruiter dashboard

---

# 🧠 NLP Techniques Used

### Text Preprocessing

- Lowercase conversion
- Tokenization
- Stopword removal
- Special character removal

### Skill Extraction

Extracts skills such as:

- Python
- SQL
- React
- FastAPI
- Machine Learning
- TensorFlow
- Docker
- AWS
- Pandas
- NumPy

### Similarity Analysis

Uses:

- TF-IDF Vectorization
- Cosine Similarity

for resume-job matching.

---

# 📊 Candidate Evaluation Parameters

| Parameter | Purpose |
|------------|----------|
| Match Score | Resume relevance |
| Skill Match | Matching skills |
| Missing Skills | Skill gap analysis |
| Experience | Experience validation |
| ATS Score | Resume quality evaluation |
| Ranking | Candidate ordering |

---

# 🎖️ Recommendation Categories

### Highly Recommended
Match Score ≥ 80%

### Recommended
Match Score ≥ 60%

### Not Recommended
Match Score < 60%

---

# 📈 Sample Output

### Candidate Information

- Candidate Name: Ajay Kumar
- Match Score: 89%
- ATS Score: 100%
- Experience: 4 Years
- Required Experience: 3 Years
- Status: Suitable

### Extracted Skills

- Python
- FastAPI
- SQL
- React
- Machine Learning
- Docker
- AWS

### Recommendation

✅ Highly Recommended

---

# 💻 Installation

## Backend Setup

```bash
cd backend

pip install fastapi
pip install uvicorn
pip install pdfplumber
pip install scikit-learn
pip install nltk
```

Run Backend:

```bash
uvicorn main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🌐 Application URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 🎯 Skills Demonstrated

- Natural Language Processing
- Resume Parsing
- Information Extraction
- TF-IDF
- Cosine Similarity
- Candidate Ranking
- Skill Gap Analysis
- ATS Scoring
- FastAPI Development
- React Development
- Data Visualization
- Explainable AI

---

# 🔮 Future Enhancements

- DOCX Resume Support
- Candidate Filtering
- Candidate Search
- Education-Based Scoring
- Bias Detection Indicators
- Recruiter Authentication
- Advanced Semantic Matching
- LLM-Based Resume Analysis

---

# 👨‍💻 Author

**Akash B**

B.Tech - Computer Science Engineering

GitHub:
https://github.com/AKASHAKKI26

---

# 📜 License

This project was developed for educational, research, and hackathon purposes.
