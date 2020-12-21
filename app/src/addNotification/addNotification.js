import React, { useEffect, useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import "./addNotification.css";

export default function AddNotification(props) {
  const [isError, setError] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "1",
  });

  useEffect(() => {
    if (props.selectedNotification) {
      const { id, title, description, severity } = props.selectedNotification;
      setFormData({
        id: id,
        title: title,
        description: description,
        severity: severity,
      });
    }
  }, [props.selectedNotification]);

  return (
    <div className="addNotification-container">
      <Grid container spacing={2}>
        {isError ? (
          <Grid item xs={12}>
            <p style={{ color: "red" }}>Please enter all mandatory fields</p>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <TextField
            required
            id="title"
            label="Notification Text"
            variant="outlined"
            value={formData.title}
            onChange={(e) => {
              setFormData({
                id: formData.id,
                title: e.target.value,
                description: formData.description,
                severity: formData.severity,
              });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            label="Notification Description"
            variant="outlined"
            value={formData.description}
            onChange={(e) => {
              setFormData({
                id: formData.id,
                description: e.target.value,
                title: formData.title,
                severity: formData.severity,
              });
            }}
            multiline
            rows={10}
            rowsMax={10}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-select-currency-native"
            select
            required
            label="Severity"
            value={formData.severity}
            onChange={(e) => {
              setFormData({
                id: formData.id,
                severity: e.target.value,
                title: formData.title,
                description: formData.description,
              });
            }}
            SelectProps={{
              native: true,
            }}
            helperText="Please select your currency"
            variant="outlined"
          >
            <option key="1" value="1">
              Info
            </option>
            <option key="2" value="2">
              Warning
            </option>
            <option key="3" value="3">
              Severe
            </option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={3} md={2} lg={1}>
              <Button
                variant="contained"
                onClick={() => {
                  setError(false);
                  props.cancel();
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={3} md={2} lg={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (!formData.title || !formData.description) {
                    setError(true);
                    return;
                  }
                  setError(false);
                  props.add(formData);
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
