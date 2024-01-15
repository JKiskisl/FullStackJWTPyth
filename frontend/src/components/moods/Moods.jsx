import React, { useState, useEffect } from "react";
import "./datepickers.css";
import MoodForm from "./MoodForm";
import MoodTable from "./MoodTable";
import "./moods.css";
import {
  addMood,
  analyzeMoodDiary,
  deleteMoods,
  getMoods,
  updateMood,
} from "../../services/moods.service";
import { getTokenFromLocalStorage } from "../../services/auth.service";
import { Snackbar, CircularProgress, Modal, Fade } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Moods = () => {
  const [moods, setMoods] = useState([]);
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState(null);
  const [newMoodAdded, setNewMoodAdded] = useState(false);
  // eslint-disable-next-line
  const [newMood, setNewMood] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMood, setEditMood] = useState(null);
  const [editFormValue, setEditFormValue] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [aiTips, setAiTips] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAnalyzeMoodDiary = async (moodId) => {
    try {
      setIsLoading(true);
      const accessToken = await getTokenFromLocalStorage();
      const moodToAnalyze = moods.find((mood) => mood.id === moodId);

      if (!moodToAnalyze) {
        console.error("Mood not found for analysis");
        return;
      }

      const response = await analyzeMoodDiary(accessToken, moodId);

      if (response.error) {
        console.error("Error during mood analysis:", response.error);
      } else {
        setSnackbarSeverity("success");
        setSnackbarMessage(`Mood analysis completed!`);
        if (response.data !== undefined) {
          setEditFormValue((prevFormValue) => ({
            ...prevFormValue,
            AITips: response.data,
          }));
          setAiTips(response.data);
        } else {
          console.error("Unexpected response format:", response);
        }
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Unexpected error occurred during mood analysis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMood = (mood) => {
    setEditMood(mood);
    setEditFormValue({
      title: mood.title,
      content: mood.content,
      date: mood.date,
      happythings: mood.happythings,
      waterintake: mood.waterintake,
      todaysmood: mood.todaysmood,
      selfcareActivities: mood.selfcareActivities,
      Breakfast: mood.Breakfast,
      Lunch: mood.Lunch,
      Dinner: mood.Dinner,
      Snacks: mood.Snacks,
      Anxious: mood.Anxious,
      Sad: mood.Sad,
      AITips: mood.AITips,
    });
    setSelectedDate(new Date(mood.date));
    setShowForm(true);
  };

  const handleUpdateMood = async (event) => {
    event.preventDefault();

    const updatedMoodData = {
      title: editFormValue.title,
      content: editFormValue.content,
      date: editFormValue.date,
      happythings: editFormValue.happythings,
      waterintake: editFormValue.waterintake,
      todaysmood: editFormValue.todaysmood,
      selfcareActivities: editFormValue.selfcareActivities,
      Breakfast: editFormValue.Breakfast,
      Lunch: editFormValue.Lunch,
      Dinner: editFormValue.Dinner,
      Snacks: editFormValue.Snacks,
      Anxious: editFormValue.Anxious,
      Sad: editFormValue.Sad,
      AITips: editFormValue.AITips,
    };

    try {
      const accessToken = await getTokenFromLocalStorage();
      const response = await updateMood(
        accessToken,
        editMood.id,
        updatedMoodData
      );

      if (response.error === null) {
        const updatedMood = {
          ...editMood,
          ...updatedMoodData,
        };
        setMoods((prevMoods) =>
          prevMoods.map((mood) =>
            mood.id === editMood.id ? updatedMood : mood
          )
        );
        setEditMood(null);
        setEditFormValue({});
        setErrorMessage("");
        setShowForm(false);

        setSnackbarSeverity("success");
        setSnackbarMessage(`Mood updated successfully`);
        setSnackbarOpen(true);
      } else {
        setErrorMessage(response.error);
        setSnackbarSeverity("error");
        setSnackbarMessage(`Mood didn't update!`);
        setSnackbarOpen(true);
      }
    } catch (error) {
      setErrorMessage(JSON.stringify(error.message, null, 2));
    }
  };

  useEffect(() => {
    let isMounted = true;

    const getMoodsData = async () => {
      try {
        const accessToken = await getTokenFromLocalStorage();
        const response = await getMoods(accessToken);

        console.log(response.data);

        if (!isMounted) {
          return;
        }

        if (response.error === null) {
          setMoods(response.data);
          console.log(response.data);
          setErrorMessage("");
          if (newMoodAdded) {
            setNewMoodAdded(false);
          }
        } else {
          setErrorMessage(response.message);
        }
      } catch (error) {
        setErrorMessage(JSON.stringify(error.message, null, 2));
      }
    };

    getMoodsData();

    return () => {
      isMounted = false;
    };
  }, [newMoodAdded, aiTips]);

  const handleDeleteMood = async (moodId) => {
    try {
      const accessToken = await getTokenFromLocalStorage();
      const response = await deleteMoods(accessToken, moodId);

      const newMoods = moods.filter((mood) => mood.id !== moodId);

      setMoods(newMoods);
      setErrorMessage("");
      setErrorMessage(response.error);

      setSnackbarSeverity("success");
      setSnackbarMessage(`Mood deleted successfully`);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(`Mood error while deleting!`);
      setSnackbarOpen(true);
      setErrorMessage(JSON.stringify(error.message, null, 2));
    }
  };

  const handleAddMood = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const content = event.target.content.value;

    const date = event.target.date.value;
    const happythings = event.target.happythings.value;
    const waterintake = event.target.waterintake.value;
    const todaysmood = event.target.todaysmood.value;
    const selfcareActivities = event.target.selfcareActivities.value;
    const Breakfast = event.target.Breakfast.value;
    const Lunch = event.target.Lunch.value;
    const Dinner = event.target.Dinner.value;
    const Snacks = event.target.Snacks.value;
    const Anxious = event.target.Anxious.value;
    const Sad = event.target.Sad.value;

    try {
      const accessToken = await getTokenFromLocalStorage();
      const response = await addMood(accessToken, {
        title,
        content,
        date,
        happythings,
        waterintake,
        todaysmood,
        selfcareActivities,
        Breakfast,
        Lunch,
        Dinner,
        Snacks,
        Anxious,
        Sad,
      });

      if (response.error === null) {
        const newMood = {
          id: response.data.id,
          title: response.data.title,
          content: response.data.content,
          date: response.data.date,
          happythings: response.data.happythings,
          waterintake: response.data.waterintake,
          todaysmood: response.data.todaysmood,
          selfcareActivities: response.data.selfcareActivities,
          Breakfast: response.data.Breakfast,
          Lunch: response.data.Lunch,
          Dinner: response.data.Dinner,
          Snacks: response.data.Snacks,
          Anxious: response.data.Anxious,
          Sad: response.data.Sad,
        };

        setMoods((prevMoods) => [...prevMoods, newMood]);
        setErrorMessage("");
        setShowForm(false);
        setNewMoodAdded(true);

        setSnackbarSeverity("success");
        setSnackbarMessage(`Mood added successfully!`);
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(`Mood failed to add!`);
        setSnackbarOpen(true);
        setErrorMessage(response.error);
      }
    } catch (error) {
      setErrorMessage(JSON.stringify(error.message, null, 2));
    }
  };

  const showPopUpClear = () => {
    setEditFormValue({});
    setSelectedDate(null);
    setEditMood(null);
    setShowForm(true);
  };

  return (
    <div className="moods">
      <h2>Moods</h2>
      <button className="add-mood-button" onClick={() => showPopUpClear()}>
        Add Moods
      </button>
      {showForm && (
        <MoodForm
          editFormValue={editFormValue}
          selectedDate={selectedDate}
          setEditFormValue={setEditFormValue}
          setSelectedDate={setSelectedDate}
          handleAddMood={handleAddMood}
          handleUpdateMood={handleUpdateMood}
          editMood={editMood}
          setShowForm={setShowForm}
          handleDeleteMood={handleDeleteMood}
        />
      )}

      <MoodTable
        moods={moods}
        handleEditMood={handleEditMood}
        handleDeleteMood={handleDeleteMood}
        newMood={newMood}
        analyzeMoodDiary={handleAnalyzeMoodDiary}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Modal open={isLoading} closeAfterTransition>
        <Fade in={isLoading}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--color-bg-variant)",
                padding: "20px",
                borderRadius: "10px",
                color: "var(--color-white)",
              }}
            >
              <CircularProgress style={{ color: "var(--color-primary)" }} />
              <div style={{ marginTop: "10px" }}>Analyzing Mood...</div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Moods;
