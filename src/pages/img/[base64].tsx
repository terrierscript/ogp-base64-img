import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useMemo } from "react"
import Head from "next/head"
import { GetStaticPaths, GetStaticProps } from "next"
export const Page = ({ data }) => {
  const route = useRouter()
  // const base64 = useMemo(() => {
  //   const header = "data:image/webp;base64"
  //   const revert = route?.query?.base64?.toString()
  //     .replaceAll("-", "+")
  //     .replaceAll("_", "/")

  //   return `${header},${revert}`
  // }, [route])
  // console.log(r)

  return <Box>
    <Head>
      <title>img</title>
      <meta property="og:title" content="img"></meta>
      <meta property="twitter:card" content="summary_large_image"></meta>
      <meta property="og:image" content={data} />
    </Head>
    <img src={data} />
  </Box>
}

export const getStaticPaths: GetStaticPaths = async (req) => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  const header = "data:image/webp;base64"
  const revert = params.base64?.toString()
    .replaceAll("-", "+")
    .replaceAll("_", "/")
  const data = `${header},${revert}`

  return {
    props: {
      data
    }
  }
}

export default Page

