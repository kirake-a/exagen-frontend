import { useEffect, useState } from "react";
import { getTests } from "../common/api/testService";
import type { Test } from "../common/interfaces/testInterface";

export const useTests = () => {
  const [tests, setTests] = useState<Test>();
  const [loading, setLoading] = useState(true);

  const fetchTests = async () => {
    const res = await getTests();
    if (res.success) {
      setTests(res.data || undefined);
      console.log("tests fetched:", res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return { tests, loading, fetchTests };
};
