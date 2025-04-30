export default function ButtonSend() {
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<div>
			<Modal
				aria-labelledby="spring-modal-title"
				aria-describedby="spring-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						TransitionComponent: Fade,
					},
				}}>
				<Fade in={open}>
					<Box className="modal-container">
						<CloseIcon
							style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer", color: "grey" }}
							onClick={handleClose}
						/>
						<Typography id="spring-modal-description" sx={{ mt: 2 }}>
							<UploadImage />
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</div>
	)
}
