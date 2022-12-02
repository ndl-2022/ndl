import { Button, Paper, Typography } from '@mui/material';
import { User } from '@ndl/shared';

export default function WaitingRoomMenu({
  users,
  onReady,
}: {
  users: User[];
  onReady: () => void;
}) {
  return (
    <Paper className="menu-container">
      <Typography variant="h1">Waiting Room</Typography>
      <ul>
        {users.map((user) => (
          <li key={user.username}>{user.username}</li>
        ))}
      </ul>
      <Button disabled={users.length < 2} onClick={onReady}>
        Ready
      </Button>
    </Paper>
  );
}
