import { useEffect, useState } from "react";
import { getQuestions } from "../common/api/questionService";
import type { QuestionResponse } from "../common/interfaces/questionInterface";

export const useQuestions = () => {
  const [questions, setQuestions] = useState<QuestionResponse>();
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    const res = await getQuestions();
    if (res.success) {
      setQuestions(res.data || undefined);
      console.log("Questions fetched:", res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return { questions, loading, fetchQuestions };
};
