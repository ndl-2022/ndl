// create room : POST /room

export interface CreateRoomResponse {
  roomCode: string;
}

// room code in param, POST request
export interface JoinRoomRequest {
  username: string;
}
