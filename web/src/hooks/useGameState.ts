import { useQuery } from "react-query"
import { GetGameStateResponse } from "../../../backend/src/routes/types"

function useGameState(roomId: string) {
  return useQuery({
    queryKey: ['game', roomId],
    queryFn: async (): Promise<GetGameStateResponse> => {
      const response = await fetch(
        `${import.meta.env.VITE_API_ORIGIN}/rooms/${roomId}/game`
      )
      return response.json()
    },
    enabled: false
  })
}

export default useGameState