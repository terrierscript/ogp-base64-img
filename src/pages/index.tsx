import { Box, Input, Link, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import React, { useMemo, useRef, useState } from 'react'

export default function Home() {
  const [img, setImg] = useState<string>()
  const canvasRef = useRef<HTMLCanvasElement>()
  const img2 = useMemo(() => {
    return img?.split(",")[1]
  }, [img])
  console.log(img, img?.length)
  return (
    <Box>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Box>xxx</Box>
        <Input type="file" onChange={async (e) => {
          const [file] = e.target.files
          const reader = new FileReader()
          reader.onload = e => {
            const img = e.target.result
            // .toString()
            // .split(",")[1]
            // setImg(img.toString())
          }
          if (!canvasRef.current) {
            return
          }
          const imgC = new Image()
          // canvasRef.current.width = imgC.width
          // canvasRef.current.height = imgC.height
          const ctx = canvasRef.current.getContext('2d')
          console.log(URL.createObjectURL(file))
          imgC.onload = () => {
            ctx.drawImage(imgC, 10, 10)
            setImg(canvasRef.current.toDataURL())
          }
          imgC.src = URL.createObjectURL(file)
          reader.readAsDataURL(file)
        }} />
        <Stack>
          <Box>
            LEN:{img2?.length}
          </Box>
          {img && <a target="_blank" href={`/img/${encodeURIComponent(img2)}`}>
            preview
          </a>}
          {img && <a target="_blank" href={`/img/${encodeURIComponent(img2).slice(0, 5000000)}`}>
            preview
          </a>}
          {img && <a target="_blank" href={`/img/${encodeURIComponent(img).slice(0, 10000)}`}>
            preview2
          </a>}
          {img && <a target="_blank" href={`/img/${encodeURIComponent(img).slice(0, 100000)}`}>
            preview2
          </a>}
        </Stack>
        <canvas ref={canvasRef} >

        </canvas>
        <Box>xxxx</Box>
      </Box>
    </Box>
  )
}
