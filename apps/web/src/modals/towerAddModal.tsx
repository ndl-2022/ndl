import { Box, Button } from '@mui/material';
import React from 'react';
import { getTowerTypes } from '../lib/game/sprites';

export default function TowerAddModal({
  modalReturn,
}: {
  modalReturn: (id: string) => void;
}) {
  return (
    <Box>
      {getTowerTypes().map((tower) => {
        return (
          <Button
            key={tower.id}
            onClick={() => {
              modalReturn(tower.id);
            }}
          >
            {tower.id}
          </Button>
        );
      })}
    </Box>
  );
}
