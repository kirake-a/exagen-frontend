import { useEffect, useState } from "react";
import { getCategoryTests } from "../common/api/categoryTestService";
import type { Category } from "../common/interfaces/categoryInterface";

export const useCategoriesTest = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoriesTest = async () => {
    const res = await getCategoryTests();
    if (res.success) {
      setCategories(res.data || []);
      console.log("Categories fetched:", res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoriesTest();
  }, []);

  return { categories, loading, fetchCategoriesTest };
};
