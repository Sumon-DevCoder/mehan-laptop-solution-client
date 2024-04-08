// import useAxiosPublic from "./useAxiosPublic";
// import { PropTypes } from "prop-types";

// // imgbb api setup
// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const ImageUrl = async ({ imageInputFile }) => {
//   const axiosPublic = useAxiosPublic();

//   // imgbb img setup
//   const imageFile = { imageInputFile };
//   const res = await axiosPublic.post(image_hosting_api, imageFile, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return <div></div>;
// };

// ImageUrl.propTypes = {
//   imageInputFile: PropTypes.node,
// };

// export default ImageUrl;
