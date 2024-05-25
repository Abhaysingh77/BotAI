// src/components/MessageList.js
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

function MessageList({ messages }) {
  return (
    <Box>
      {messages.map((message, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: 2,
          }}
        >
          <Box
            sx={{
              padding: 1,
              backgroundColor: message.sender === 'user' ? 'primary.main' : 'grey.300',
              color: message.sender === 'user' ? 'white' : 'black',
              borderRadius: 1,
              maxWidth: { xs: '80%', sm: '70%', md: '60%' },
              wordBreak: 'break-word',
            }}
          >
            <Typography>{message.text}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

MessageList.propTypes = {
    messages :PropTypes.array.isRequired,
}
export default MessageList;
