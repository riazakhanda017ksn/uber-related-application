import { useState } from "react";
import { useForm } from "react-hook-form";

const UploadServer = () => {
  const [imageURL, setImageURL] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const eventData = {
      name: data.name,
      price: data.price,
      imageURL: imageURL,
    };
    fetch("http://localhost:5055/addPost", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(eventData),
    }).then((res) => {
      console.log("res data", res);
    });
  };
  ///
  const handleImageUpload = (event) => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "3b8fa16325c0baa1794c79a7349a090d");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} />
        <input type="number" {...register("price", { required: true })} />
        <input
          name="exampleRequired"
          type="file"
          onChange={handleImageUpload}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default UploadServer;
