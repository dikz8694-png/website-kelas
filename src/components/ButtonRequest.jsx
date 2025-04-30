import React, { useEffect, useState } from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { useSpring, animated } from "@react-spring/web"
import CloseIcon from "@mui/icons-material/Close"
import { supabase } from "../utils/supabaseClient"

export default function ButtonRequest() {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const fade = useSpring({
		opacity: open ? 1 : 0,
		config: { duration: 200 },
	})

	const [images, setImages] = useState([])

	const fetchImagesFromSupabase = async () => {
		try {
			const { data, error } = await supabase.storage.from("upload").list("", {
				limit: 100,
				offset: 0,
				sortBy: { column: "created_at", order: "asc" },
			})

			if (error) throw error

			const urls = await Promise.all(
				data.map(async (file) => {
					const { data: publicURLData } = supabase.storage.from("upload").getPublicUrl(file.name)
					return {
						url: publicURLData.publicUrl,
						timestamp: new Date(file.created_at || file.metadata?.time_created || Date.now()),
					}
				})
			)

			setImages(urls)
		} catch (error) {
			console.error("Error fetching images from Supabase:", error.message)
		}
	}

	useEffect(() => {
		fetchImagesFromSupabase()
	}, [])

	return (
		<div>
			<button
				onClick={handleOpen}
				className="flex items-center space-x-2 text-white px-6 py-4"
				id="SendRequest">
				<img src="/Request.png" alt="Icon" className="w-6 h-6 relative bottom-1 " />
				<span className="text-base lg:text-1xl">Request</span>
			</button>

			<Modal
				aria-labelledby="spring-modal-title"
				aria-describedby="spring-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<animated.div style={fade}>
					<Box className="bg-[#1e1e1e] text-white rounded-xl shadow-xl p-6 w-[90%] md:w-[500px] mx-auto mt-[10%] relative">
						<button onClick={handleClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
							<CloseIcon />
						</button>

						<Typography id="spring-modal-description" sx={{ mt: 2 }}>
							<h6 className="text-center text-white text-2xl mb-5">Request</h6>
							<div className="h-[22rem] overflow-y-scroll overflow-y-scroll-no-thumb">
								{images
									.slice()
									.reverse()
									.map((imageData, index) => (
										<div
											key={index}
											className="flex justify-between items-center px-5 py-2 mt-2"
											id="LayoutIsiButtonRequest">
											<img
												src={imageData.url}
												alt={`Image ${index}`}
												className="h-10 w-10 blur-sm"
											/>
											<span className="ml-2 text-white">
												{new Date(imageData.timestamp).toLocaleString()}
											</span>
										</div>
									))}
							</div>
							<div className="text-white text-[0.7rem] mt-5">
								Note : Jika tidak ada gambar yang sudah anda upload silahkan reload
							</div>
						</Typography>
					</Box>
				</animated.div>
			</Modal>
		</div>
	)
}