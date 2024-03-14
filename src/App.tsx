import React, { useState, FormEvent, useEffect } from 'react';
import { createSummary, fetchSummaries } from './api';
import { Summary } from './types';
import { TextField, Button, CircularProgress, Box, Typography, Card, CardContent } from '@mui/material';

import './App.css';
import logo from './assets/logo.svg';

const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    setIsLoading(true)
    fetchSummaries()
      .then(data => setSummaries(data))
      .catch(error => {
        console.error('Failed to fetch summaries:', error);
        setErrorMessage('Failed to fetch summary list. Please try again later.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    if (content) {
      createSummary(content)
        .then(newSummary => {
          setSummaries(prevSummaries => [newSummary, ...prevSummaries]);
          setContent('');
        })
        .catch(error => {
          console.error(error);
          setErrorMessage('Failed to summarize. Please try again later.');
        })
        .finally(() => setIsSending(false));
    } else {
      setIsSending(false);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {!isLoading && <Box id="form" component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <img src={logo} style={{ border: 'none' }} alt="Logo" />
        </Box>

        <TextField
          fullWidth
          id="form_content"
          name="content"
          label="Copy & paste any content for summarization here..."
          placeholder="Copy & paste any content for summarization here..."
          multiline
          rows={4}
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': { // Target the root of the outlined input
              backgroundColor: 'white', // Set the background color to white
            }
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button id="submit_button" variant="contained" type="submit" disabled={isSending}>Submit</Button>
          {isSending && <CircularProgress size={24} />}
        </Box>
      </Box>}

      {errorMessage && <Typography sx={{ marginTop: 1 }} color="error">Error: {errorMessage}</Typography>}

      {summaries.length > 0 && (
        <Box id="summaries" sx={{ marginTop: 4 }}>
          {summaries.map((summary) => (
            <Card className="summary" key={summary.id} sx={{ marginBottom: 5 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>Summary</Typography>
                <Typography className="summary_content" variant="body2" component="pre" sx={{ marginBottom: 3 }}>{summary.summary}</Typography>

                <Typography variant="h5" gutterBottom>Original</Typography>
                <Typography className="original_content" variant="body2" component="pre" gutterBottom>{summary.original}</Typography>

                <Typography sx={{ marginTop: 3 }} variant="body2">
                  <b>Created</b>: {new Date(summary.created_at).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default App;
