import { Box, Grid, Modal, Slider, Typography } from "@mui/material";
import { useState } from "react";
import Cropper from "react-easy-crop";

import style from "./styles/Uploader.module.css";
import Button from "./Button";
import { useCallback } from "react";
import { useRef } from "react";
import { FileUploadOutlined } from "@mui/icons-material";

const Uploader = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No profile photo selected");
  const [croppedArea, setCroppedArea] = useState(null);
  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const inputRef = useRef();
  const triggerFileSelectPopUp = () => inputRef.current.click();

  const handleOpen = () => {
    setOpen(true);
    triggerFileSelectPopUp();
  };

  const handleClose = () => setOpen(false);

  const onCropCancel = () => {
    setImage(null);
    handleClose();
  };

  const showCroppedImage = useCallback(async () => {
    try {
      // const croppedImage = await getCroppedImg(image, croppedArea);
      const croppedImage = "";
      console.log("donee", { croppedImage });
      setCroppedArea(croppedImage);
      handleClose();
      // setOpenCrop(false)
      // setCroppedArea(URL.createObjectURL(blobUrl))
    } catch (e) {
      console.error(e);
    }
  }, [image, croppedArea]);

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
  };

  return (
    <>
      {image ? (
        <Modal open={open} onClose={handleClose}>
          <div className={style.modal_container}>
            <Box
              minHeight={400}
              width={"100%"}
            >
              <div className={style.cropper_container}>
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  maxWidth={100}
                  aspect={1 / 1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  cropShape="round"
                />
              </div>
              <div className={style.controls_container}>
                <div className={style.slider_container}>
                  <Typography>Zoom: {zoomPercent(zoom)}</Typography>
                  <div className={style.slider}>
                    <Slider
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e, zoom) => setZoom(zoom)}
                      className={style.zoom_range}
                    />
                  </div>
                </div>
                <div className={style.button_container}>
                  <Button onClick={onCropCancel}>Cancel</Button>
                  <Button onClick={showCroppedImage}>Crop</Button>
                </div>
              </div>
            </Box>
          </div>
        </Modal>
      ) : null}
      <div className={style.image_container}>
        {image ? (
          <img
            src={croppedArea ? croppedArea : image}
            alt={fileName}
            className={style.image_pload}
            onClick={handleOpen}
          />
        ) : (
          <Box
            element="a"
            onClick={triggerFileSelectPopUp}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {fileName}
            <FileUploadOutlined />
          </Box>
        )}
        <input
          accept="image/*"
          type="file"
          hidden
          ref={inputRef}
          className="input-field"
          onChange={onSelectFile}
          onClick={handleOpen}
        />
      </div>
    </>
  );
};

export default Uploader;
