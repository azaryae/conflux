import React, { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "@/store/hooks";
import Scrollbar from "../../custom-scroll/Scrollbar";
import {
  fetchNotes,
  SelectNote,
  DeleteNote,
  SearchNotes,
} from "@/store/apps/notes/NotesSlice";
import { IconTrash } from "@tabler/icons-react";
import { NotesType } from '../../../(DashboardLayout)/types/apps/notes';

const NoteList = () => {
  const dispatch = useDispatch();
  const activeNote = useSelector((state) => state.notesReducer.notesContent);
  const searchTerm = useSelector((state) => state.notesReducer.noteSearch);

  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const filterNotes = (notes, nSearch) => {
    if (nSearch !== "")
      return notes.filter(
        (t) =>
          !t.deleted &&
          t.title
            .toLocaleLowerCase()
            .concat(" ")
            .includes(nSearch.toLocaleLowerCase())
      );

    return notes.filter((t) => !t.deleted);
  };

  const notes = useSelector((state) =>
    filterNotes(state.notesReducer.notes, state.notesReducer.noteSearch)
  );

  return (
    <>
      {/* Job Application Specifications Form */}
      <Box p={3} px={2} mb={2}>
        <Typography variant="h6" gutterBottom>
          Spesifikasi Lamaran Pekerjaan
        </Typography>
        <TextField
          label="Nama Instansi yang Dilamar"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          fullWidth
          variant="outlined"
          margin="dense"
        />
        <TextField
          label="Posisi yang Dilamar"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          fullWidth
          variant="outlined"
          margin="dense"
        />
        <TextField
          label="Deskripsi Pekerjaan"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          fullWidth
          variant="outlined"
          margin="dense"
          multiline
          rows={3}
        />
      </Box>



    </>
  );
};

export default NoteList;
