from fastapi import FastAPI, UploadFile, File
import pdfplumber
from utils import clean_txt, extract_skills, skill_gap, extract_experience
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount(

    "/uploads",

    StaticFiles(directory="../uploads"),

    name="uploads"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI Resume Screening Backend Running"}


@app.post("/upload-resume/")
async def upload_resume(
    files: list[UploadFile] = File(...),
    job_description: str = ""
):

    results = []

    for file in files:

        # Save uploaded file
        file_location = f"../uploads/{file.filename}"

        with open(file_location, "wb") as f:
            f.write(await file.read())

        # Extract PDF text
        extracted_text = ""

        with pdfplumber.open(file_location) as pdf:

            for page in pdf.pages:

                text = page.extract_text()

                if text:
                    extracted_text += text

        # Clean resume
        cleaned_resume = clean_txt(extracted_text)

        # Candidate Experience
        candidate_experience = extract_experience(extracted_text)

        # Clean JD
        cleaned_jd = clean_txt(job_description)

        # Required Experience
        required_experience = extract_experience(job_description)

        # Extract skills
        skills = extract_skills(cleaned_resume)

        # TF-IDF
        vectorizer = TfidfVectorizer()

        vectors = vectorizer.fit_transform(
            [cleaned_resume, cleaned_jd]
        )

        # Similarity
        similarity = cosine_similarity(
            vectors[0],
            vectors[1]
        )

        # Required skills
        required_skills = extract_skills(cleaned_jd)

        # Matched skills
        matched_skills = len(
            set(skills).intersection(set(required_skills))
        )

        total_required = len(required_skills)

        # Skill match score
        if total_required > 0:

            skill_match_score = (
                matched_skills / total_required
            ) * 100

        else:

            skill_match_score = 0

        if required_experience > 0:

            if candidate_experience >= required_experience:

                experience_score = 100

            else:

                experience_score = (
                    candidate_experience /
                    required_experience
                ) * 100

        else:

            experience_score = 100

        # Experience Status
        if candidate_experience > required_experience + 3:

            experience_status = "Overqualified"

        elif candidate_experience < required_experience:

            experience_status = "Underqualified"

        else:

            experience_status = "Suitable"
        # Cosine score
        cosine_score = similarity[0][0] * 100

        # Final score
        match_score = (
            cosine_score * 0.4
            +
            skill_match_score * 0.6
            +
            experience_score * 0.2
        )

        # Missing skills
        missing_skills = skill_gap(
            ",".join(required_skills),
            skills
        )

        # Explainable AI Insights

        matched_skills_list = list(

            set(skills).intersection(set(required_skills))

        )

        strong_areas = matched_skills_list[:3]

        explanation = {

            "matched_skills": f"{matched_skills}/{total_required}",

            "strong_areas": strong_areas,

            "missing_skills_count": len(missing_skills)

        }

        # ATS Compatibility Score

        ats_score = 0

        # Resume Length Check

        if len(extracted_text) > 1000:

            ats_score += 40

        else:

            ats_score += 20

        # Skills Count Check

        if len(skills) >= 5:

            ats_score += 40

        else:

            ats_score += 20

        # File Format Check

        if file.filename.endswith(".pdf") or file.filename.endswith(".docx"):

            ats_score += 20
        # Recommendation
        if match_score >= 80:

            recommendation = "Highly Recommended"

        elif match_score >= 60:

            recommendation = "Recommended"

        else:

            recommendation = "Not Recommended"

        # Eligibility
        if match_score >= 80:

            eligibility = "Eligible"

        else:

            eligibility = "Not Eligible"

        # Improvements
        improvements = []

        for skill in missing_skills:

            improvements.append(
                f"Learn {skill}"
            )

        # Save result
        results.append({
            "resume_path": file_location,

            "filename": file.filename,

            "match_score": round(match_score, 2),

            "skills": skills,

            "eligibility": eligibility,

            "missing_skills": missing_skills,

            "recommendation": recommendation,

            "explanation": explanation,

            "ats_score": ats_score,

            "improvements": improvements,

            "candidate_experience": candidate_experience,

            "required_experience": required_experience,

            "experience_status": experience_status
        })
        results = sorted(

        results,

        key=lambda x: x["match_score"],

        reverse=True
        )

    return results