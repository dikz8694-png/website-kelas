import * as React from "react"
import PropTypes from "prop-types"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useSpring, animated } from "@react-spring/web"
import CloseIcon from "@mui/icons-material/Close"

const Fade = React.forwardRef(function Fade(props, ref) {
	const { children, in: open, onEnter, onExited, ...other } = props
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		config: { duration: open ? 200 : 50 },
		onStart: () => open && onEnter?.(null, true),
		onRest: () => !open && onExited?.(null, true),
	})

	return (
		<animated.div ref={ref} style={style} {...other}>
			{children}
		</animated.div>
	)
})

Fade.propTypes = {
	children: PropTypes.element.isRequired,
	in: PropTypes.bool,
	onEnter: PropTypes.func,
	onExited: PropTypes.func,
}

export default function BoxTextAnonim() {
	const [open, setOpen] = React.useState(false)
	const [message, setMessage] = React.useState("")

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const handleSend = () => {
		window.open("https://ngl.link/panga.83", "_blank")
	}

	return (
		<div>
			<div onClick={handleOpen}>
				<div id="BoxTextAnonim">
					<div className="flex justify-between">
						<img src="/paper-plane.png" alt="" className="w-auto h-6" />
						<img src="/next.png" alt="" className="h-3 w-3" />
					</div>
					<h1 className="capitalize text-white text-left pr-5 text-base font-semibold mt-5">Text Anonim</h1>
				</div>
			</div>

			<Modal
				open={open}
				onClose={handleClose}
				closeAfterTransition
				aria-labelledby="spring-modal-title"
				aria-describedby="spring-modal-description"
				slots={{ backdrop: Backdrop }}
				slotProps={{ backdrop: { TransitionComponent: Fade } }}
			>
				<Fade in={open}>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							bgcolor: "#1f2937",
							color: "white",
							borderRadius: 3,
							p: 4,
							boxShadow: 24,
							width: "90%",
							maxWidth: 400,
						}}
					>
						<Button onClick={handleClose} sx={{ position: "absolute", top: 8, right: 8, color: "white", opacity: 0.7 }}>
							<CloseIcon />
						</Button>
						<Typography sx={{ mt: 3 }}>
							<div className="flex flex-col items-center space-y-4">
								<p className="text-lg font-semibold text-center">Kirim pesan anonim kamu ke kami via NGL</p>
								<textarea
									placeholder="Tulis dulu pesannya di sini (opsional)..."
									className="w-full p-3 rounded-md text-black border border-gray-300 focus:ring-2 focus:ring-pink-500"
									rows={4}
									value={message}
									onChange={(e) => setMessage(e.target.value)}
								/>
								<button
									onClick={handleSend}
									className="bg-pink-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-pink-600 transition"
								>
									Buka NGL Sekarang
								</button>
							</div>
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}
