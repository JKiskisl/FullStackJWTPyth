import React from "react";
import DatePicker from "react-datepicker";
import "./datepickers.css";
import { format } from "date-fns";
import "./labelinput.css";

const MoodForm = ({
  editFormValue,
  selectedDate,
  setEditFormValue,
  setSelectedDate,
  handleAddMood,
  handleUpdateMood,
  editMood,
  setShowForm,
  handleDeleteMood,
}) => {
  return (
    <>
      <div className="overlay"></div>
      <div className="popup">
        <form
          onSubmit={editMood ? handleUpdateMood : handleAddMood}
          className="mood-form"
        >
          <div className="label-input-container">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editFormValue.title || ""}
              onChange={(event) =>
                setEditFormValue({
                  ...editFormValue,
                  title: event.target.value,
                })
              }
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              placeholder="Content"
              value={editFormValue.content || ""}
              onChange={(event) =>
                setEditFormValue({
                  ...editFormValue,
                  content: event.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="label-input-container">
            <label htmlFor="date">Date</label>
            <DatePicker
              selected={selectedDate}
              name="date"
              placeholderText="Select a date"
              dateFormat="MM/dd/yyyy"
              dayClassName={() => "react-datepicker__day"}
              calendarClassName="react-datepicker-popper"
              onChange={(date) => {
                setSelectedDate(date);
                const formattedDate = format(date, "MM/dd/yyyy");
                setEditFormValue({
                  ...editFormValue,
                  date: formattedDate,
                });
              }}
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="happythings">Things that made me happy today</label>
            <textarea
              name="happythings"
              placeholder="Things that made me happy today"
              value={editFormValue.happythings || ""}
              onChange={(event) =>
                setEditFormValue({
                  ...editFormValue,
                  happythings: event.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="label-input-container">
            <label htmlFor="waterintake">Today's water intake (litres)</label>
            <input
              type="number"
              name="waterintake"
              min="0"
              max="10"
              placeholder="Today's water intake (litres)"
              value={editFormValue.waterintake || ""}
              onChange={(event) =>
                setEditFormValue({
                  ...editFormValue,
                  waterintake: event.target.value,
                })
              }
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="todaysmood">Today's mood rating (1-10)</label>
            <input
              type="number"
              name="todaysmood"
              min="1"
              max="10"
              placeholder="Today's Mood (1-10)"
              value={editFormValue.todaysmood || ""}
              onChange={(event) =>
                setEditFormValue({
                  ...editFormValue,
                  todaysmood: event.target.value,
                })
              }
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="selfcareActivities">Self-care activities</label>
            <textarea
              name="selfcareActivities"
              placeholder="Self-care activities"
              value={editFormValue.selfcareActivities || ""}
              onChange={(event) =>
                setEditFormValue({
                  ...editFormValue,
                  selfcareActivities: event.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="label-input-container">
            <label htmlFor="Breakfast">What I ate for breakfast today?</label>
            <textarea
              name="Breakfast"
              placeholder="Breakfast"
              value={editFormValue.Breakfast || ""}
              onChange={(event) =>
                setEditFormValue({
                  ...editFormValue,
                  Breakfast: event.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="label-input-container">
            <label htmlFor="Lunch">What I ate for lunch today?</label>
            <textarea
              name="Lunch"
              placeholder="Lunch"
              value={editFormValue.Lunch || ""}
              onChange={(event) =>
                setEditFormValue({
                  ...editFormValue,
                  Lunch: event.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="label-input-container">
            <label htmlFor="Dinner">What I ate for dinner today?</label>
            <textarea
              name="Dinner"
              placeholder="Dinner"
              value={editFormValue.Dinner || ""}
              onChange={(event) =>
                setEditFormValue({
                  ...editFormValue,
                  Dinner: event.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="label-input-container">
            <label htmlFor="Snacks">Snacks I ate today</label>
            <textarea
              name="Snacks"
              placeholder="Snacks"
              value={editFormValue.Snacks || ""}
              onChange={(event) =>
                setEditFormValue({
                  ...editFormValue,
                  Snacks: event.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="label-input-container">
            <label htmlFor="Anxious">Things that made me anxious today</label>
            <textarea
              name="Anxious"
              placeholder="Things that made me anxious today"
              value={editFormValue.Anxious || ""}
              onChange={(event) =>
                setEditFormValue({
                  ...editFormValue,
                  Anxious: event.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="label-input-container">
            <label htmlFor="Sad">Things that made me sad today</label>
            <textarea
              name="Sad"
              placeholder="Things that made me sad today"
              value={editFormValue.Sad || ""}
              onChange={(event) =>
                setEditFormValue({
                  ...editFormValue,
                  Sad: event.target.value,
                })
              }
            ></textarea>
          </div>
          {editMood && (
            <div className="label-input-container">
              <label htmlFor="AITips">AI generated tips</label>
              <textarea
                name="AITips"
                value={editFormValue.AITips || ""}
                readOnly
              ></textarea>
            </div>
          )}
          <div className="popup-buttons">
            <button type="submit">{editMood ? "Update" : "Add mood"}</button>
            {editMood && (
              <>
                <button
                  type="button"
                  onClick={() => handleDeleteMood(editMood.id)}
                >
                  Delete
                </button>
              </>
            )}
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MoodForm;
