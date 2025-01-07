import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";


const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Task List
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <ListItemText
              primary={task.title}
              secondary={task.description}
            />
            <IconButton
              edge="end"
              color="primary"
              onClick={() => onEdit(task)}
            >
      <FontAwesomeIcon icon={faEdit} />
      </IconButton>
            <IconButton
              edge="end"
              color="secondary"
              onClick={() => onDelete(task.id)}
            >
      <FontAwesomeIcon icon={faTrash} />
      </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;