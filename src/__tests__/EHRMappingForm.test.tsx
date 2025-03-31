import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EHRMappingForm from "../pages/EHRMappingForm";

describe("EHRMappingForm", () => {
  it("renders form inputs and calls onSubmit", () => {
    render(<EHRMappingForm />);

    const questionField = screen.getByLabelText(/Pregunta/i);
    const endpointField = screen.getByLabelText(/Endpoint/i);
    const ehrSystemField = screen.getByLabelText(/Sistema EHR/i);
    const submitBtn = screen.getByRole("button", { name: /Guardar/i });

    fireEvent.change(questionField, { target: { value: "Síntomas" } });
    fireEvent.change(endpointField, { target: { value: "/api/symptoms" } });
    fireEvent.change(ehrSystemField, { target: { value: "Epic" } });
    fireEvent.click(submitBtn);

  });
});
