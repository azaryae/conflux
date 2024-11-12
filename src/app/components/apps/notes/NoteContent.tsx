import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

const InterviewChat = () => {
  const questions = [
    'Selamat datang di sesi wawancara. Bagaimana cara Anda mengatasi stres dalam pekerjaan?',
    'Apa motivasi utama Anda dalam melamar pekerjaan ini?',
    'Bagaimana Anda menghadapi tantangan dalam bekerja secara tim?',
    'Apa yang Anda lakukan untuk mengembangkan keterampilan Anda?',
    'Apa yang Anda lakukan ketika Anda tidak setuju dengan pendapat rekan kerja Anda?',
    'Apa yang Anda lakukan ketika Anda tidak setuju dengan keputusan atasan Anda?',
    'Bagaimana Anda menyeimbangkan pekerjaan dan kehidupan pribadi Anda?',
    'Coba ceritakan tentang proyek terbaik yang pernah Anda kerjakan.',
    'Apa yang Anda lakukan ketika Anda merasa tidak puas dengan pekerjaan Anda?',
    'Jika Anda diterima di perusahaan ini, apa yang akan Anda lakukan dalam 30 hari pertama Anda?',
  ];

  const [messages, setMessages] = useState([{ sender: 'ai', text: questions[0] }]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'id-ID'; // Set language to Indonesian

      speechRecognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'user', text },
        ]);

        // Display the next question after a user response
        setTimeout(() => {
          setCurrentQuestionIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            if (nextIndex < questions.length) {
              const nextQuestion = questions[nextIndex];
              setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'ai', text: nextQuestion },
              ]);
              // Synthesize the next question
              speakText(nextQuestion);
            }
            return nextIndex;
          });
        }, 1000); // Delay before the next question
      };

      speechRecognition.onend = () => {
        setIsRecording(false);
      };

      setRecognition(speechRecognition);
    } else {
      alert('Web Speech API is not supported in this browser.');
    }

    // Speak the first question when component mounts
    speakText(questions[0]);
  }, []);

  const handleRecording = () => {
    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsRecording(!isRecording);
  };

  // Speech synthesis function
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; // Set language to Indonesian
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        maxWidth: '100wh',
        margin: 'auto',
        p: 2,
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Latihan Wawancara
      </Typography>
      <Divider />

      {/* Chat Messages Section */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          mt: 2,
          mb: 2,
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'ai' ? 'flex-start' : 'flex-end',
              mb: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: '70%',
                p: 1.5,
                borderRadius: 2,
                backgroundColor: message.sender === 'ai' ? '#f0f0f0' : '#1976d2',
                color: message.sender === 'ai' ? 'black' : 'white',
                textAlign: message.sender === 'ai' ? 'left' : 'right',
              }}
            >
              <Typography>{message.text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Voice Recording Button */}
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
    </Box>
  );
};

export default InterviewChat;
