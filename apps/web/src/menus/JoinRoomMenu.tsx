import { Button, Paper, TextField, Typography } from '@mui/material';
import React from 'react';

export default function JoinRoom({
  onSubmit,
}: {
  onSubmit: (roomCode: string) => void;
}) {
  const [roomCode, setRoomCode] = React.useState<string>('');

  return (
    <Paper className="menu-container">
      <Typography variant="h1">Join Room</Typography>
      <TextField
        label="Room code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <Button onClick={() => onSubmit(roomCode)}>Join</Button>
    </Paper>
  );
}
