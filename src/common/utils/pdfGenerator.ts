import { jsPDF } from "jspdf";
import "jspdf-autotable";
import type { ClosedQuestion, OpenQuestion } from "../interfaces/questionInterface";
import type { QuestionData } from "../api/questionService";

// Extiende jsPDF para incluir autoTable, aunque TypeScript lo maneja mal, es necesario para el uso.
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: unknown) => jsPDF;
  }
}

// --- Generador de PDF para Estudiantes (Preguntas y Espacios) ---
export const generateStudentPdf = (
  testTitle: string,
  closedQuestions: ClosedQuestion[],
  openQuestions: OpenQuestion[]
) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`Examen: ${testTitle}`, 14, 20);
  doc.setFontSize(12);
  let yOffset = 30;

  // 1. Preguntas Cerradas
  closedQuestions.forEach((q, index) => {
    const questionNumber = index + 1;
    const statement = `P${questionNumber}. ${q.statement}`;

    // Agregar enunciado
    doc.text(statement, 14, yOffset);
    yOffset += 5;

    // Opciones como lista
    q.options.forEach((option, optionIndex) => {
      const optionLetter = String.fromCharCode(65 + optionIndex); // A, B, C, D...
      doc.text(`${optionLetter}) ${option}`, 20, yOffset);
      yOffset += 5;
    });
    yOffset += 10;

    // Salto de página si queda poco espacio
    if (yOffset > 270) {
      doc.addPage();
      yOffset = 20;
    }
  });

  // 2. Preguntas Abiertas
  openQuestions.forEach((q, index) => {
    const questionNumber = closedQuestions.length + index + 1;
    const statement = `P${questionNumber}. ${q.statement}`;

    // Agregar enunciado
    doc.text(statement, 14, yOffset);
    yOffset += 8;

    // Espacio grande para la respuesta
    const lines = 6; // 6 líneas de espacio
    for (let i = 0; i < lines; i++) {
    doc.line(14, yOffset, 196, yOffset); // Dibuja una línea
      yOffset += 5;
    }
    yOffset += 10;

    // Salto de página si queda poco espacio
    if (yOffset > 270) {
      doc.addPage();
      yOffset = 20;
    }
  });

  doc.save(`Examen_${testTitle}_Estudiante.pdf`);
};

// --- Generador de PDF para Profesor (Preguntas y Respuestas) ---
export const generateProfessorPdf = (
  testTitle: string,
  closedQuestions: ClosedQuestion[],
  openQuestions: OpenQuestion[]
) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`Respuestas - Examen: ${testTitle}`, 14, 20);
  doc.setFontSize(12);
  let yOffset = 30;

  // 1. Preguntas Cerradas
  closedQuestions.forEach((q, index) => {
    const questionNumber = index + 1;
    doc.text(`P${questionNumber}. ${q.statement}`, 14, yOffset);
    yOffset += 5;

    const correctAnswerLetter = String.fromCharCode(
      65 + q.options.indexOf(q.correctAnswer)
    );
    doc.text(
      `Respuesta Correcta: ${correctAnswerLetter}) ${q.correctAnswer}`,
      14,
      yOffset,
      {
        textColor: [0, 150, 0], // Color verde para la respuesta
      }
    );
    yOffset += 10;

    if (yOffset > 270) {
      doc.addPage();
      yOffset = 20;
    }
  });

  // 2. Preguntas Abiertas
  openQuestions.forEach((q, index) => {
    const questionNumber = closedQuestions.length + index + 1;
    doc.text(`P${questionNumber}. ${q.statement}`, 14, yOffset);
    yOffset += 5;


    doc.text(`Respuesta Esperada:`, 14, yOffset, {
      textColor: [0, 0, 150],
    });
    doc.text(q.response, 14, yOffset + 5);
    yOffset += 15;

    if (yOffset > 270) {
      doc.addPage();
      yOffset = 20;
    }
  });

  doc.save(`Examen_${testTitle}_Respuestas.pdf`);
};


export const handleDownloadPdfs = async (testTitle: string, questions: QuestionData) => {
  const { closedQuestions, openQuestions } = questions;
  
  generateStudentPdf(testTitle, closedQuestions, openQuestions);

  generateProfessorPdf(testTitle, closedQuestions, openQuestions);
};