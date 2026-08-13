from fastapi import APIRouter
from typing import List
from pydantic import BaseModel

router = APIRouter(prefix="/api/trivia", tags=["trivia"])


class Question(BaseModel):
    id: int
    question: str
    options: List[str]
    correct: int


questions = [
    Question(
        id=1,
        question="What year was the birthday person born?",
        options=["1990", "1995", "2000", "1985"],
        correct=1
    ),
    Question(
        id=2,
        question="What is their favorite color?",
        options=["Blue", "Red", "Purple", "Green"],
        correct=2
    ),
]


@router.get("/")
async def get_questions():
    return questions


@router.post("/submit")
async def submit_answer(question_id: int, answer: int):
    for q in questions:
        if q.id == question_id:
            is_correct = q.correct == answer
            return {
                "correct": is_correct,
                "message": "Correct! 🎉" if is_correct else "Wrong! Better luck next time 😅"
            }
    return {"error": "Question not found"}