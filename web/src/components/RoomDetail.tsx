import { Room } from "../../../backend/src/db/types"

function RoomDetail({ room }: { room: Room }) {
  const player1 = room.users.find((user) => user.player.value === 1)
  const player2 = room.users.find((user) => user.player.value === 2)

  return (
    <div className="space-y-2">
      <div key={room.id} className="bg-gray-200 rounded-md p-2 space-y-2">
        <p>Room {room.id}</p>
        <div className="flex flex-col">
          {player1 && (
            <div className="">
              {player1.player.name} {player1.id}
            </div>
          )}

          {player2 && (
            <div className="">
              {player2.player.name} {player2.id}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RoomDetail