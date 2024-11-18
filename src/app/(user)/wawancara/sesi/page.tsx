"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Typography, IconButton, Divider, Paper, TextField, Button, CircularProgress } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import Link from 'next/link';

interface QuestionAnswer {
  question: string;
  answer: string;
}

const InterviewChat: React.FC = () => {
  const [remainingQuestions, setRemainingQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/wawancara/sesi/generate');
        const data = await response.json();
        const questions = JSON.parse(data.result);
        setCurrentQuestion(questions[0]);
        setRemainingQuestions(questions.slice(1));
        speakText(questions[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

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
    // Save the current question and answer to the state
    setQuestionAnswers((prev) => [
      ...prev,
      { question: currentQuestion, answer: userAnswer },
    ]);

    const newQuestions = [...remainingQuestions];
    const nextQuestion = newQuestions.shift();

    if (nextQuestion) {
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

  const submitInterview = async () => {
    try {
      const response = await fetch('/api/wawancara/sesi', {
        method: 'POST',
        body: JSON.stringify(questionAnswers),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Wawancara selesai. Terima kasih!');
      } else {
        alert('Terjadi kesalahan saat mengirim data wawancara.');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengirim data wawancara.');
    }
  }

  return (
    <Box sx={{ p: 3, width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Latihan Wawancara
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
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
              <Button
                variant="contained"
                color="secondary"
                sx={{ width: '100%' }}
                onClick={submitInterview}
              >
                Selesai
              </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default InterviewChat;