import React from 'react';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';

export default function UsernameMenu({
  onSubmit,
}: {
  onSubmit: (username: string) => void;
}) {
  const [username, setUsername] = React.useState<string>('');
  return (
    <Paper className="username-menu-container">
      <Stack direction="column" spacing={2}>
        <Typography variant="h1">Protector</Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSubmit(username)}
        >
          Next
        </Button>
      </Stack>
    </Paper>
  );
}
