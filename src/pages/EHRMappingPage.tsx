import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EHRMappingStepper from "./EHRMappingForm";
import { deleteEHRMapping, getAllEHRMappings } from "../services/api";
import { useTranslation } from "react-i18next";

interface PatientDataType {
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
}

interface EHRMapping {
  ehrName: string;
  _id: string;
  mapping: {
    [systemName: string]: {
      patient: PatientDataType;
    };
  };
}

const PatientData: React.FC<{ patient: PatientDataType }> = ({ patient }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 1 }}>
      <Typography>
        <strong>{t("nameKey")}:</strong> {patient?.name}
      </Typography>
      <Typography>
        <strong>{t("genderKey")}:</strong> {patient?.gender}
      </Typography>
      <Typography>
        <strong>{t("dobKey")}:</strong> {patient?.dob}
      </Typography>
      <Typography>
        <strong>{t("addressKey")}:</strong> {patient?.address}
      </Typography>
      <Typography>
        <strong>{t("phoneKey")}:</strong> {patient?.phone}
      </Typography>
      <Typography>
        <strong>{t("emailKey")}:</strong> {patient?.email}
      </Typography>
      <Typography>
        <strong>{t("emergencyContactKey")}:</strong> {patient?.emergencyContact}
      </Typography>
      <Typography>
        <strong>{t("insuranceProviderKey")}:</strong>{" "}
        {patient?.insuranceProvider}
      </Typography>
      <Typography>
        <strong>{t("insurancePolicyNumberKey")}:</strong>{" "}
        {patient?.insurancePolicyNumber}
      </Typography>
      <Typography>
        <strong>{t("primaryCarePhysicianKey")}:</strong>{" "}
        {patient?.primaryCarePhysician}
      </Typography>
      <Typography>
        <strong>{t("allergiesKey")}:</strong> {patient?.allergies}
      </Typography>
      <Typography>
        <strong>{t("currentMedicationsKey")}:</strong>{" "}
        {patient?.currentMedications}
      </Typography>
      <Typography>
        <strong>{t("medicalHistoryKey")}:</strong> {patient?.medicalHistory}
      </Typography>
      <Typography>
        <strong>{t("socialHistoryKey")}:</strong> {patient?.socialHistory}
      </Typography>
      <Typography>
        <strong>{t("familyHistoryKey")}:</strong> {patient?.familyHistory}
      </Typography>
    </Box>
  );
};

const EHRMappingPage: React.FC = () => {
  const { t } = useTranslation();
  const [mappings, setMappings] = useState<EHRMapping[]>([]);
  const [open, setOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState<EHRMapping | null>(
    null
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const saveMappings = async () => {
    const mappingsValues = await getAllEHRMappings();
    setMappings(mappingsValues);
  };

  useEffect(() => {
    saveMappings();
  }, []);

  const handleDeleteClick = (mapping: EHRMapping) => {
    setSelectedMapping(mapping);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedMapping) {
      await deleteEHRMapping(selectedMapping._id);
      setSelectedMapping(null);
      await saveMappings();
    }
    setDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedMapping(null);
    setDeleteDialogOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f9fbfc",
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom mt={10}>
        {t("ehrMappingConfig")}
      </Typography>

      <Button variant="contained" onClick={handleOpen}>
        {t("createMapping")}
      </Button>

      <EHRMappingStepper onSaveSuccess={saveMappings} open={open} onClose={handleClose} />

      <Box mt={4}>
        <Typography variant="h6" fontWeight={'bold'} gutterBottom>
          {t("currentMappingsList")}
        </Typography>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>EHR Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Mapping</strong>
                </TableCell>
                <TableCell>
                  <strong>{t("actions")}</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mappings.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item?.ehrName}</TableCell>
                  <TableCell>
                  <PatientData
                      patient={item.mapping[Object.keys(item.mapping)[0]]?.patient}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteClick(item)}
                    >
                      {t("deleteButton")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>{t("deleteButton")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("deleteConfirmation")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="inherit">
            {t("cancelDelete")}
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EHRMappingPage;
