import React, { useState } from "react";
import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import "./moodtable.css";
import AITipsModal from "./AITipsModal";

const MoodTable = ({
  moods,
  handleEditMood,
  handleDeleteMood,
  newMood,
  analyzeMoodDiary,
}) => {
  const [isAITipsModalOpen, setAITipsModalOpen] = useState(false);
  const [selectedAITips, setSelectedAITips] = useState("");
  const [title, setTitle] = useState("");

  const handleAITipsModalOpen = (AITips, title) => {
    setSelectedAITips(AITips);
    setTitle(title);
    setAITipsModalOpen(true);
  };

  const handleAITIpsModalClose = () => {
    setAITipsModalOpen(false);
    setTitle("");
    setSelectedAITips("");
  };

  const columns = [
    "Mood Title",
    "Date",
    "Mood Rating",
    "Water Intake",
    {
      name: "Actions",
      options: {
        customBodyRenderLite: (dataIndex) => (
          <>
            <Button onClick={() => handleEditMood(moods[dataIndex])}>
              Edit
            </Button>
            <Button
              color="error"
              onClick={() => handleDeleteMood(moods[dataIndex].id)}
            >
              Delete
            </Button>
            <Button
              color="secondary"
              onClick={() => analyzeMoodDiary(moods[dataIndex].id)}
            >
              Give AI tips
            </Button>
          </>
        ),
      },
    },
    {
      name: "AI Tips",
      options: {
        customBodyRenderLite: (dataIndex) => (
          <>
            {moods[dataIndex].AITips !== null &&
              moods[dataIndex].AITips !== "" && (
                <Button
                  sx={{ color: "#0DBEB1" }}
                  onClick={() =>
                    handleAITipsModalOpen(
                      moods[dataIndex].AITips,
                      moods[dataIndex].title
                    )
                  }
                >
                  View AI Tips
                </Button>
              )}
          </>
        ),
      },
    },
  ];

  const data = moods.map((mood) => [
    mood.title,
    mood.date,
    mood.todaysmood,
    mood.waterintake,
    mood.AITips,
  ]);

  if (newMood) {
    data.push([
      newMood.title,
      newMood.date,
      newMood.todaysmood,
      newMood.waterintake,
      newMood.AITips,
    ]);
  }

  const options = {
    selectableRows: "none",
  };

  return (
    <>
      <MUIDataTable
        title={"Moods Table"}
        data={data}
        columns={columns}
        options={options}
        className="custom-mood-table"
      />
      <AITipsModal
        isOpen={isAITipsModalOpen}
        handleClose={handleAITIpsModalClose}
        AITips={selectedAITips}
        title={title}
      />
    </>
  );
};

export default MoodTable;
