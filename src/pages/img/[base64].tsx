import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useMemo } from "react"

export const Page = () => {
  const route = useRouter()
  const base64 = useMemo(() => {
    const header = "data:image/webp;base64"
    return `${header},${route.query.base64}`
  }, [route])
  // console.log(r)

  return <Box>
    <img src={base64} />
  </Box>
}

export default Page