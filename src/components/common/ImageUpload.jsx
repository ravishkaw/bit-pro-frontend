import { useState } from "react";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { deleteImage, uploadImage } from "../../services/systemApiService";

// Common image upload component
const ImageUpload = ({
  initialImage = null,
  onImageChange,
  category = "default",
}) => {
  const [fileName, setFileName] = useState(initialImage);
  const [fileList, setFileList] = useState(
    initialImage
      ? [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: import.meta.env.VITE_IMAGE_URL + initialImage,
          },
        ]
      : []
  );

  const [messageApi, contextHolder] = message.useMessage();

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // check if there's a file and it's done uploading
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      // Extract the image name from the response
      const imagePath = newFileList[0].response
        ? newFileList[0].response
        : null;
      onImageChange(imagePath);
      setFileName(imagePath);
    } else if (newFileList.length === 0) {
      onImageChange(null);
    }
  };

  // check if it is a image before upload
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      setFileList([]);
      messageApi.error("You can only upload image files!");
    }
    return isImage;
  };

  // upload to the server
  const uploadSelectedImage = async ({ file, onSuccess }) => {
    try {
      const resp = await uploadImage(file, category);
      onSuccess(resp, file);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // delete image from the server
  const removeSelectedImage = async (imagePath) => {
    try {
      // if (imagePath) {
      //   await deleteImage(imagePath, category);
      // }
      setFileList([]);
      onImageChange(null);
      return true;
    } catch (error) {
      console.error("Upload failed:", error);
      return false;
    }
  };

  return (
    <>
      {contextHolder}
      <Upload
        name="image"
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleUploadChange}
        showUploadList={{
          showPreviewIcon: false,
          showRemoveIcon: true,
        }}
        maxCount={1}
        onRemove={() => removeSelectedImage(fileName)}
        accept="image/*"
        customRequest={uploadSelectedImage}
      >
        {fileList.length >= 1 ? null : (
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </>
  );
};

export default ImageUpload;
