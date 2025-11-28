import { useEffect, useState } from "react";
import { getSurveys } from "../common/api/surveyService";
import type { Survey } from "../common/interfaces/surveyInterfaces";

export const useSurveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>();
  const [loading, setLoading] = useState(true);

  const fetchSurveys = async () => {
    const res = await getSurveys();
    if (res.success) {
      setSurveys(res.data || [])
      console.log("Surveys fetched:", res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  return { surveys, loading, fetchSurveys };
};
