import axios from "axios";

class QuizService {
  constructor() {
    this.quiz = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  getAllquestions = async () => {
    try {
      let response = await this.quiz.get("/api/quiz");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  
}

const quizService = new QuizService();

export default quizService;
