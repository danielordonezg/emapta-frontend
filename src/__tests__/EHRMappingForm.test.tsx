import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EHRMappingStepper from "../pages/EHRMappingForm";

describe("EHRMappingStepper", () => {
  it("allows user to complete stepper and submit data", async () => {
    const handleClose = jest.fn();
    const handleSaveSuccess = jest.fn();

    render(
      <EHRMappingStepper
        open={true}
        onClose={handleClose}
        onSaveSuccess={handleSaveSuccess}
      />
    );

    const ehrInput = screen.getByLabelText(/ehr name/i);
    fireEvent.change(ehrInput, { target: { value: "Epic" } });

    const nextBtn = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextBtn);

    const patientNameInput = screen.getByLabelText(/patient name key/i);
    fireEvent.change(patientNameInput, { target: { value: "full_name" } });

    const nextBtnStep2 = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextBtnStep2);

    const saveBtn = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(handleSaveSuccess).toHaveBeenCalled();
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
