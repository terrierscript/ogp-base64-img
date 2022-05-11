import { Box, Input, Link, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import React, { useMemo, useRef, useState } from 'react'
import pica from "pica"

const Pica = pica()

const aspectRatioSize = (max: [number, number], input: [number, number]): [number, number] => {
  const [maxW, maxH] = max
  const [w, h] = input
  const ratio = h / w
  if (ratio < 1) {
    return [maxW, maxH * ratio]
  } else {
    return [maxW * ratio, maxH]

  }
}
export default function Home() {
  const [img, setImg] = useState<string>()
  const canvasRef = useRef<HTMLCanvasElement>()
  const img2 = useMemo(() => {
    if (!img) {
      return
    }
    const [header, data] = img?.split(",")
    return encodeURIComponent(data?.replaceAll("=", ""))
  }, [img])

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
          const ctx = canvasRef.current.getContext('2d')


          imgC.onload = async () => {
            // ctx.drawImage(imgC, 0, 0)
            const [w, h] = aspectRatioSize(
              [300, 300],
              [imgC.width, imgC.height]
            )
            canvasRef.current.width = w
            canvasRef.current.height = h
            await Pica.resize(imgC,
              canvasRef.current,
              {
                filter: "hamming"
              }
            )
            const dataUrl = canvasRef.current.toDataURL("image/webp")
            setImg(dataUrl)
          }
          // canvasRef.current.onchange = (e) => {
          //   console.log("change")
          // }
          imgC.src = URL.createObjectURL(file)
          reader.readAsDataURL(file)
        }} />
        <Stack>
          <Box>
            LEN:{img2?.length}
          </Box>
          {img && <a target="_blank" href={`/img/${img2}`}>
            preview
          </a>}
          {/* {img && <a target="_blank" href={`/img/${encodeURIComponent(img2).slice(0, 5000000)}`}>
            preview
          </a>}
          {img && <a target="_blank" href={`/img/${encodeURIComponent(img).slice(0, 10000)}`}>
            preview2
          </a>}
          {img && <a target="_blank" href={`/img/${encodeURIComponent(img).slice(0, 100000)}`}>
            preview2
          </a>} */}
        </Stack>
        <canvas ref={canvasRef} >

        </canvas>
        <Box>xxxx</Box>
      </Box>
    </Box>
  )
}
