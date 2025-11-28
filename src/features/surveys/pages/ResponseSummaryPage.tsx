import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";

import { getSurveyResponse } from "../../../common/api/surveyService";
import type { SurveyAnswerResponse } from "../../../common/interfaces/surveyInterfaces";

export default function ResponseSummaryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [survey, setSurvey] = useState<SurveyAnswerResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const res = await getSurveyResponse(id);
      setSurvey(res.data);
    };
    fetchData();
  }, [id]);

  const grouped = useMemo(() => {
    if (!survey) return [];

    const groups: Record<number, { questionId: number; answers: string[] }> = {};

    survey.responses.forEach((r) => {
      if (!groups[r.id]) groups[r.id] = { questionId: r.id, answers: [] };
      groups[r.id].answers.push(r.selectedAnswer);
    });

    return Object.values(groups);
  }, [survey]);

  return (
    <div className="p-5">
      <div className="flex align-items-center gap-2 mb-4">
        <Button icon="pi pi-arrow-left" text onClick={() => navigate(-1)} />
        <h2 className="m-0">Survey Responses</h2>
      </div>

      {survey && (
        <Card className="mb-4">
          <h3 className="m-0">{survey.title}</h3>
          <p className="text-secondary mt-2">
            Total responses:{" "}
            <Tag value={survey.totalResponses} severity="info"></Tag>
          </p>
        </Card>
      )}

      {grouped.map((group) => (
        <Card key={group.questionId} className="mb-4 shadow-2">
          <h4>Question #{group.questionId}</h4>

          <DataTable value={group.answers.map((a, i) => ({ index: i + 1, answer: a }))}>
            <Column field="index" header="#" style={{ width: "60px" }} />
            <Column field="answer" header="Answer" />
          </DataTable>
        </Card>
      ))}
    </div>
  );
}
