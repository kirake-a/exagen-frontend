import { useEffect, useState } from "react";
import type { Category } from "../common/interfaces/categoryInterface";
import { getCategoryQuestions } from "../common/api/categoryQuestionsService";

export const useCategoriesQuestion = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoriesQuestion = async () => {
    const res = await getCategoryQuestions();
    if (res.success) {
      setCategories(res.data || []);
      console.log("Categories fetched:", res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoriesQuestion();
  }, []);

  return { categories, loading, fetchCategoriesQuestion };
};
