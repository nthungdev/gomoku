import { useQuery } from "react-query"
import { GetRoomByIdResponse } from "../../../backend/src/routes/types"

function useRoom(roomId: string) {
  return useQuery({
    queryKey: ['room', roomId],
    queryFn: async (): Promise<GetRoomByIdResponse> => {
      const response = await fetch(
        `${import.meta.env.VITE_API_ORIGIN}/rooms/${roomId}`
      )
      return response.json()
    },
  })
}

export default useRoom