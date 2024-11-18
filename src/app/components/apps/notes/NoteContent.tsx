import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Typography, IconButton, Divider, Paper } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from 'next/link';

const InterviewChat = () => {



  const router = useRouter(); 

  const initialQuestions = [
    'Selamat datang di sesi wawancara. Bagaimana cara Anda mengatasi stres dalam pekerjaan?',
    'Apa motivasi utama Anda dalam melamar pekerjaan ini?',
    'Bagaimana Anda menghadapi tantangan dalam bekerja secara tim?',
    'Apa yang Anda lakukan untuk mengembangkan keterampilan Anda?',
    'Apa yang Anda lakukan ketika Anda tidak setuju dengan pendapat rekan kerja Anda?',
  ];

  const [remainingQuestions, setRemainingQuestions] = useState(initialQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestions[0]);
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'id-ID';

      speechRecognition.onresult = (event) => {
        const text = event.results[0][0].transcript;

        setMessages([{ sender: 'user', text }]);

        setTimeout(() => {
          setRemainingQuestions((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            newQuestions.shift();
            if (newQuestions.length > 0) {
              const nextQuestion = newQuestions[0];
              setCurrentQuestion(nextQuestion);
              speakText(nextQuestion);
            } else {
              setCurrentQuestion('Sesi selesai.');
            }
            return newQuestions;
          });

          setMessages([]);
        }, 1000);
      };

      speechRecognition.onend = () => {
        setIsRecording(false);
      };

      setRecognition(speechRecognition);
    } else {
      alert('Web Speech API is not supported in this browser.');
    }

    speakText(initialQuestions[0]);

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing camera: ", error);
        });
    }
  }, []);

  const handleRecording = () => {
    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsRecording(!isRecording);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Latihan Wawancara
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2} direction="column" alignItems="center">
        {/* Kolom Kamera */}
        <Grid item xs={12} sx={{ mb: 3 }}>
        <video
    ref={videoRef}
    autoPlay
    muted
    style={{
      objectFit: 'cover',
      width: '400px',
      height: '250px',
      border: '1px solid #ccc', // Opsional: Tambahkan border untuk estetika
      borderRadius: '4px', // Opsional: Tambahkan border-radius
    }}
  ></video>
        </Grid>

        {/* Kolom Pertanyaan dan Jawaban */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* Kolom Pertanyaan */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  width: '475px',
                  height: '275px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'auto',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Pertanyaan
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {currentQuestion}
                </Typography>
              </Paper>
            </Grid>

            {/* Kolom Jawaban */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  width: '475px',
                  height: '275px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Jawaban
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  {messages.map((message, index) => (
                    <Box
                      key={index}
                      sx={{
                        alignSelf: message.sender === 'ai' ? 'flex-start' : 'flex-end',
                        maxWidth: '80%',
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: message.sender === 'ai' ? '#f0f0f0' : '#1976d2',
                        color: message.sender === 'ai' ? 'black' : 'white',
                      }}
                    >
                      <Typography>{message.text}</Typography>
                    </Box>
                  ))}
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
                  <IconButton color="primary" onClick={handleRecording}>
                    {isRecording ? <StopIcon /> : <MicIcon />}
                  </IconButton>
                  {isRecording && (
                    <Typography variant="caption" color="textSecondary" ml={1}>
                      Mendengarkan...
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>

          </Grid>
        </Grid>
      </Grid>

      <Grid>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Link href="/riwayat/detail">
            <Button variant="contained" color="primary">
              Selesai
            </Button>
            </Link>

          </Box>


      </Grid>
    </Box>
  );
};

export default InterviewChat;
