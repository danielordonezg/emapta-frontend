import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  Stack,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { saveEHRMapping } from "../services/api";
import { useTranslation } from "react-i18next";

const EHRMappingStepper: React.FC<{
  open: boolean;
  onClose: () => void;
  onSaveSuccess?: () => void;
}> = ({ open, onClose, onSaveSuccess }) => {
  const { t } = useTranslation();
  const steps = [t("step1"), t("step2"), t("step3")];
  type EHRMappingData = {
    ehrName: string;
    name: string;
    gender: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
    emergencyContact: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    primaryCarePhysician: string;
    allergies: string;
    currentMedications: string;
    medicalHistory: string;
    socialHistory: string;
    familyHistory: string;
  };
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { control, handleSubmit, watch, reset } = useForm<EHRMappingData>({
    defaultValues: {
      ehrName: "",
      name: "",
      gender: "",
      dob: "",
      address: "",
      phone: "",
      email: "",
      emergencyContact: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      primaryCarePhysician: "",
      allergies: "",
      currentMedications: "",
      medicalHistory: "",
      socialHistory: "",
      familyHistory: "",
    },
  });
  const [isCustom, setIsCustom] = useState(false);
  const [customEhr, setCustomEhr] = useState("");

  const values = watch();
  const onNext = async (data: EHRMappingData) => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
      return;
    }
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const finalMapping = {
        [data.ehrName]: {
          patient: {
            name: data?.name,
            gender: data?.gender,
            dob: data?.dob,
            address: data?.address,
            phone: data?.phone,
            email: data?.email,
            emergencyContact: data?.emergencyContact,
            insuranceProvider: data?.insuranceProvider,
            insurancePolicyNumber: data?.insurancePolicyNumber,
            primaryCarePhysician: data?.primaryCarePhysician,
            allergies: data?.allergies,
            currentMedications: data?.currentMedications,
            medicalHistory: data?.medicalHistory,
            socialHistory: data?.socialHistory,
            familyHistory: data?.familyHistory,
          },
        },
      };
      await saveEHRMapping({ mapping: finalMapping, ehrName: data?.ehrName });
      setSuccessMessage(t("mappingSavedSuccess"));
      onClose();
      reset();
      if (onSaveSuccess) onSaveSuccess();
    } catch (error) {
      console.error(error);
      setErrorMessage(t("errorSavingMapping"));
    } finally {
      setLoading(false);
    }
  };
  const onBack = () => setActiveStep((prev) => prev - 1);
  const onCancel = () => {
    reset();
    setActiveStep(0);
    setErrorMessage("");
    setSuccessMessage("");
    onClose();
  };
  const renderStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <Controller
            name="ehrName"
            control={control}
            rules={{ required: t("requiredField") as string }}
            render={({ field, fieldState }) => (
              <>
                <FormControl
                  fullWidth
                  error={!!fieldState.error}
                  sx={{ mb: 2 }}
                >
                  <InputLabel>{t("ehrNameLabel")}</InputLabel>
                  <Select
                    label={t("ehrNameLabel")}
                    value={isCustom ? "other" : field.value}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      if (selectedValue === "other") {
                        setIsCustom(true);
                        field.onChange(customEhr);
                      } else {
                        setIsCustom(false);
                        setCustomEhr("");
                        field.onChange(selectedValue);
                      }
                    }}
                  >
                    <MenuItem value="client">{t("ehrOptionClient")}</MenuItem>
                    <MenuItem value="hospitals">
                      {t("ehrOptionHospitals")}
                    </MenuItem>
                    <MenuItem value="clinics">{t("ehrOptionClinics")}</MenuItem>
                    <MenuItem value="other">{t("ehrOptionOther")}</MenuItem>
                  </Select>
                  <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>

                {isCustom && (
                  <TextField
                    fullWidth
                    label={t("ehrNameCustomLabel")}
                    value={customEhr}
                    onChange={(e) => {
                      setCustomEhr(e.target.value);
                      field.onChange(e.target.value);
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              </>
            )}
          />
        );
      case 1:
        return (
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              rules={{ required: t("requiredField") as string }}
              render={({ field, fieldState }) => (
                <TextField
                  label={t("patientNameLabel")}
                  fullWidth
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="gender"
              control={control}
              rules={{
                pattern: {
                  value: /^(Male|Female)$/i,
                  message: t("genderLabelError"),
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  label={t("genderLabel")}
                  fullWidth
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="dob"
              control={control}
              rules={{
                required: t("requiredField") as string,
                validate: (value) =>
                  new Date(value) <= new Date() || t("dateFutureError"),
              }}
              render={({ field, fieldState }) => (
                <TextField
                  type="date"
                  label={t("dobLabel")}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField label={t("addressLabel")} fullWidth {...field} />
              )}
            />
            <Controller
              name="phone"
              control={control}
              rules={{
                pattern: {
                  value: /^\d+$/,
                  message: t("numericFieldError"),
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  label={t("phoneLabel")}
                  fullWidth
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("invalidEmailError"),
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  label={t("emailLabel")}
                  fullWidth
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="emergencyContact"
              control={control}
              render={({ field }) => (
                <TextField
                  label={t("emergencyContactLabel")}
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="insuranceProvider"
              control={control}
              render={({ field }) => (
                <TextField
                  label={t("insuranceProviderLabel")}
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="insurancePolicyNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  label={t("insurancePolicyNumberLabel")}
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="primaryCarePhysician"
              control={control}
              render={({ field }) => (
                <TextField
                  label={t("primaryCarePhysicianLabel")}
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="allergies"
              control={control}
              render={({ field }) => (
                <TextField label={t("allergiesLabel")} fullWidth {...field} />
              )}
            />
            <Controller
              name="currentMedications"
              control={control}
              render={({ field }) => (
                <TextField
                  label={t("currentMedicationsLabel")}
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="medicalHistory"
              control={control}
              render={({ field }) => (
                <TextField
                  label={t("medicalHistoryLabel")}
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="socialHistory"
              control={control}
              render={({ field }) => (
                <TextField
                  label={t("socialHistoryLabel")}
                  fullWidth
                  {...field}
                />
              )}
            />
            <Controller
              name="familyHistory"
              control={control}
              render={({ field }) => (
                <TextField
                  label={t("familyHistoryLabel")}
                  fullWidth
                  {...field}
                />
              )}
            />
          </Stack>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              {t("reviewDataSummary")}
            </Typography>
            <Box mt={2}>
              <Typography variant="subtitle1">
                <strong>{t("ehrNameLabel")}:</strong> {values.ehrName}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("patientNameLabel")}:</strong> {values.name}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("genderLabel")}:</strong> {values.gender}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("dobLabel")}:</strong> {values.dob}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("addressLabel")}:</strong> {values.address}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("phoneLabel")}:</strong> {values.phone}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("emailLabel")}:</strong> {values.email}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("emergencyContactLabel")}:</strong>{" "}
                {values.emergencyContact}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("insuranceProviderLabel")}:</strong>{" "}
                {values.insuranceProvider}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("insurancePolicyNumberLabel")}:</strong>{" "}
                {values.insurancePolicyNumber}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("primaryCarePhysicianLabel")}:</strong>{" "}
                {values.primaryCarePhysician}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("allergiesLabel")}:</strong> {values.allergies}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("currentMedicationsLabel")}:</strong>{" "}
                {values.currentMedications}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("medicalHistoryLabel")}:</strong>{" "}
                {values.medicalHistory}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("socialHistoryLabel")}:</strong>{" "}
                {values.socialHistory}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t("familyHistoryLabel")}:</strong>{" "}
                {values.familyHistory}
              </Typography>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6">{t("mappingStepperTitle")}</Typography>
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <Box
          component="form"
          onSubmit={handleSubmit(onNext)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {renderStepContent(activeStep)}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="outlined"
              onClick={activeStep === 0 ? onCancel : onBack}
            >
              {activeStep === 0 ? t("cancel") : t("back")}
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {activeStep === steps.length - 1
                ? loading
                  ? t("saving")
                  : t("save")
                : t("next")}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EHRMappingStepper;
