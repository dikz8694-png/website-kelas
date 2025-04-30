import React, { useState } from "react"
import { supabase } from "../utils/supabaseClient"
import Swal from "sweetalert2"

function UploadImage() {
  const [imageUpload, setImageUpload] = useState(null)
  const maxUploadSizeInBytes = 10 * 1024 * 1024
  const maxUploadsPerDay = 20

  const handleImageChange = (event) => {
    setImageUpload(event.target.files[0])
  }

  const uploadImage = async () => {
    if (!imageUpload) return

    const uploadedImagesCount = parseInt(localStorage.getItem("uploadedImagesCount")) || 0
    const lastUploadDate = localStorage.getItem("lastUploadDate")

    if (uploadedImagesCount >= maxUploadsPerDay) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have reached the maximum uploads for today.",
      })
      return
    }

    if (lastUploadDate && new Date(lastUploadDate).toDateString() !== new Date().toDateString()) {
      localStorage.setItem("uploadedImagesCount", 0)
    }

    if (imageUpload.size > maxUploadSizeInBytes) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The maximum size for a photo is 10MB",
      })
      return
    }

    const fileName = `${Date.now()}-${imageUpload.name}`
    const { data, error: uploadError } = await supabase.storage
      .from("upload")
      .upload(fileName, imageUpload)

    if (uploadError) {
      console.error(uploadError)
      Swal.fire({ icon: "error", title: "Upload failed", text: uploadError.message })
      return
    }

    const { data: urlData } = supabase.storage.from("upload").getPublicUrl(fileName)
    const imageUrl = urlData.publicUrl

    const { error: insertError } = await supabase
      .from("images")
      .insert([{ image_url: imageUrl }])

    if (insertError) {
      console.error(insertError)
      Swal.fire({ icon: "error", title: "Database Error", text: insertError.message })
      return
    }

    localStorage.setItem("uploadedImagesCount", uploadedImagesCount + 1)
    localStorage.setItem("lastUploadDate", new Date().toISOString())

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Your image has been successfully uploaded.",
    })

    setImageUpload(null)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center mb-4">
        <h1 className="text-1xl md:text-2xl md:px-10 font-bold mb-4 w-full text-white">
          Upload Your Classroom Memories
        </h1>
      </div>

      <div className="mx-auto p-4">
        <form>
          <div className="mb-4">
            <input type="file" id="imageUpload" className="hidden" onChange={handleImageChange} />
            <label
              htmlFor="imageUpload"
              className="cursor-pointer border-dashed border-2 border-gray-400 rounded-lg p-4 w-56 h-auto flex items-center justify-center">
              {imageUpload ? (
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={URL.createObjectURL(imageUpload)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="text-center px-5 py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-12 w-12 mx-auto text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p className="text-white opacity-60">Click to select an image</p>
                </div>
              )}
            </label>
          </div>
        </form>
      </div>

      <button
        type="button"
        className="py-2.5 w-[60%] mb-0 md:mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
        onClick={uploadImage}>
        UPLOAD
      </button>
    </div>
  )
}

export default UploadImage