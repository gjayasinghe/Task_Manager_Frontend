import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Alert,
  Snackbar,
  Grid,
  Paper,
} from "@mui/material";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCreateOrUpdate = async (task) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, task);
        setSuccessMessage("Task updated successfully!");
      } else {
        await createTask(task);
        setSuccessMessage("Task created successfully!");
      }
      fetchTasks();
      setEditingTask(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setSuccessMessage("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const closeSnackbar = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            {/* Add/Edit Task Form */}
            <Grid item xs={12} md={5}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <TaskForm onSubmit={handleCreateOrUpdate} initialData={editingTask} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={7}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
              </Paper>
            </Grid>
          </Grid>

          {errorMessage && (
            <Snackbar
              open
              onClose={closeSnackbar}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                {errorMessage}
              </Alert>
            </Snackbar>
          )}

          {successMessage && (
            <Snackbar
              open
              onClose={closeSnackbar}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={closeSnackbar} severity="success" sx={{ width: "100%" }}>
                {successMessage}
              </Alert>
            </Snackbar>
          )}
        </Box>
      </Container>
    </>
  );
};

export default HomePage;