import { useSocketIoContext } from "@/contexts/SocketIoContext"
import useAuth from "@/hooks/useAuth"
import useGame from "@/hooks/useGame"
import { Button } from "flowbite-react"
import { Room } from "../../../backend/src/db/types"

function RoomControls({ room }: { room: Room }) {
  const { id } = useAuth()
  const { startGame } = useSocketIoContext()
  const { started } = useGame(room.id)

  const player1 = room.users.find((user) => user.player.value === 1)

  const isRoomOwner = player1?.id === id
  const isRoomFull = room.users.length === 2
  const enableStartButton = !started && isRoomOwner && isRoomFull
  const showStartButton = !started && isRoomOwner

  async function handleStartGame() {
    await startGame(room.id)
  }

  return (
    <div>
      {showStartButton && (
        <Button disabled={!enableStartButton} onClick={handleStartGame}>
          Start
        </Button>
      )}
      {/* Exit button */}
    </div>
  )
}

export default RoomControls