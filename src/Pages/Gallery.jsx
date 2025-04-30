import { supabase } from "../utils/supabaseClient"
import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ButtonSend from "../components/ButtonSend"
import ButtonRequest from "../components/ButtonRequest"
import Modal from "@mui/material/Modal"
import { Box, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useSpring, animated } from "@react-spring/web"

const Carousel = () => {
  const [images, setImages] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    supabase
      .from("gallery")
      .select("image_url")
      .then(({ data, error }) => {
        if (!error && data) {
          setImages(data.map(item => item.image_url))
        }
      })
  }, [])

  const modalFade = useSpring({
    opacity: open ? 1 : 0,
    config: { duration: 300 },
  })

  const settings = {
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    infinite: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "30px",
        },
      },
    ],
  }

  const handleOpen = (image) => {
    setSelectedImage(image)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedImage(null)
  }

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} onClick={() => handleOpen(img)}>
            <img src={img} alt={`Gallery ${index}`} className="carousel-image" />
          </div>
        ))}
      </Slider>

      <Modal open={open} onClose={handleClose}>
        <animated.div style={modalFade}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 2,
              outline: "none",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </Box>
        </animated.div>
      </Modal>

      <div className="button-container" style={{ marginTop: "2rem", textAlign: "center" }}>
        <ButtonSend />
        <ButtonRequest />
      </div>
    </div>
  )
}

export default Carousel