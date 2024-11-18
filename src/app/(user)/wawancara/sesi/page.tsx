"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Typography, IconButton, Divider, Paper, TextField, Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import Link from 'next/link';

const InterviewChat: React.FC = () => {
  const initialQuestions = [
    'Selamat datang di sesi wawancara. Bagaimana cara Anda mengatasi stres dalam pekerjaan?',
    'Apa motivasi utama Anda dalam melamar pekerjaan ini?',
    'Bagaimana Anda menghadapi tantangan dalam bekerja secara tim?',
    'Apa yang Anda lakukan untuk mengembangkan keterampilan Anda?',
    'Apa yang Anda lakukan ketika Anda tidak setuju dengan pendapat rekan kerja Anda?',
  ];

  const [remainingQuestions, setRemainingQuestions] = useState(initialQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestions[0]);
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new (window as any).webkitSpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = 'id-ID';

      speechRecognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');

        setTranscribedText(transcript);
        setUserAnswer(transcript);
      };

      speechRecognition.onend = () => {
        setIsRecording(false);
      };

      speechRecognition.onstart = () => {
        setIsRecording(true);
      };

      setRecognition(speechRecognition);
    } else {
      alert('Web Speech API is not supported in this browser.');
    }

    speakText(initialQuestions[0]);

    // Cleanup function
    return () => {
      stopRecognition();
    };
  }, []);

  const handleRecording = () => {
    if (isRecording) {
      stopRecognition();
    } else {
      setTranscribedText('');
      if (recognition) {
        recognition.start();
      }
    }
  };

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsRecording(false);
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    window.speechSynthesis.cancel(); // Ensure previous speech synthesis stops
    window.speechSynthesis.speak(utterance);
  };

  const handleNextQuestion = () => {
    const newQuestions = [...remainingQuestions];
    newQuestions.shift();

    if (newQuestions.length > 0) {
      const nextQuestion = newQuestions[0];
      setCurrentQuestion(nextQuestion);
      setRemainingQuestions(newQuestions);
      speakText(nextQuestion);
    } else {
      setCurrentQuestion('Sesi selesai.');
    }

    // Reset recording and text states
    stopRecognition();
    setTranscribedText('');
    setUserAnswer('');
  };

  const handleUserAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  return (
    <Box sx={{ p: 3, width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Latihan Wawancara
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2} direction="column" sx={{ flex: 1, overflow: 'auto' }}>
        <Grid item>
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            Pertanyaan
          </Typography>
        </Grid>

        <Grid item>
          <Paper elevation={3} sx={{ p: 2, mb: 2, textAlign: 'center' }}>
            <Typography variant="h6">
              {currentQuestion}
            </Typography>
          </Paper>
        </Grid>

        <Grid item>
          <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
            <IconButton
              color={isRecording ? "error" : "primary"}
              onClick={handleRecording}
              sx={{
                border: '2px solid',
                padding: 2,
                '&:hover': {
                  backgroundColor: isRecording ? 'rgba(255,0,0,0.1)' : 'rgba(0,0,0,0.1)'
                }
              }}
            >
              {isRecording ? <StopIcon fontSize="large" /> : <MicIcon fontSize="large" />}
            </IconButton>
            {isRecording && (
              <Typography variant="caption" color="textSecondary">
                Merekam...
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item sx={{ width: '100%', mt: 2 }}>
          <TextField
            label="Jawaban Anda"
            multiline
            rows={4}
            value={userAnswer}
            onChange={handleUserAnswerChange}
            variant="outlined"
            fullWidth
            placeholder="Tuliskan jawaban Anda di sini atau gunakan rekaman suara"
          />
        </Grid>

        <Grid item sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
            sx={{ flex: 1, mr: 1 }}
          >
            Pertanyaan Selanjutnya
          </Button>
          <Link href="/riwayat/detail" style={{ flex: 1 }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: '100%' }}
            >
              Selesai
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InterviewChat;