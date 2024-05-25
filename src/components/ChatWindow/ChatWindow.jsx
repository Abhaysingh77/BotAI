// src/components/ChatWindow.js
import  { useState } from 'react';
import { Box, Paper, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageList from '../MessageList/MessageList';
import PropTypes from 'prop-types';

function ChatWindow({ messages, onSendMessage }) {
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ flex: 1, marginBottom: 2, padding: 2, overflowY: 'auto' }}>
        <MessageList messages={messages} />
      </Paper>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
          sx={{ marginRight: 1 }}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

ChatWindow.propTypes = {
    messages: PropTypes.string.isRequired, 
    onSendMessage: PropTypes.func.isRequired,
}
export default ChatWindow;
