import { Button, Paper, Typography } from '@mui/material';

export default function RoomMenu({ onJoinRoom }: { onJoinRoom: () => void }) {
  return (
    <Paper className="menu-container">
      <Typography variant="h1">Room</Typography>
      <Button type="button" onClick={() => onJoinRoom()}>
        Join Room
      </Button>
    </Paper>
  );
}
