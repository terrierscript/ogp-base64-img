import { Box, Input, Link } from '@chakra-ui/react'
import Head from 'next/head'
import React, { useRef, useState } from 'react'

export default function Home() {
  const [img, setImg] = useState<string>()
  const canvasRef = useRef<HTMLCanvasElement>()
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
            const img = e.target.result.toString().split(",")[1]
            setImg(img)
            if (!canvasRef.current) {
              return
            }
            // const ctx = canvasRef.current.getContext('2d')
          }
          reader.readAsDataURL(file)
        }} />
        <Box>
          {img && <a target="_blank" href={`/img/${encodeURIComponent(img)}`}>
            preview
          </a>}
        </Box>
        <canvas ref={canvasRef} >

        </canvas>
      </Box>
    </Box>
  )
}
