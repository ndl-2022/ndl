import { Button, Paper, Typography } from '@mui/material';

export default function RoomMenu({
  onJoinRoom,
  onCreateRoom,
}: {
  onJoinRoom: () => void;
  onCreateRoom: () => void;
}) {
  return (
    <Paper className="menu-container">
      <Typography variant="h1">Room</Typography>
      <Button type="button" onClick={() => onCreateRoom()}>
        Create Room
      </Button>
      <Button type="button" onClick={() => onJoinRoom()}>
        Join Room
      </Button>
    </Paper>
  );
}
