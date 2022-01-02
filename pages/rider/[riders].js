import swal from "sweetalert";
import { useRouter } from "next/router";
import data from "../../utils/riders";
import { useForm } from "react-hook-form";
import ProcessPayment from "../../component/ProccessPayment/ProccessPayment";
import { useState } from "react";

export default function Details() {
  const router = useRouter();
  const { riders } = router.query;
  const rider = data.find((a) => a.riders == riders);

  if (!rider) {
    return (
      <div className="sorry">
        <h3>Sorry did not come out</h3>
      </div>
    );
  }

  ////
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setPaymentSuccess(data);
  };

  ///
  const [handlePaymentSuccess, setPaymentSuccess] = useState(null);
  const handlePaymentSuccessItem = (paymentId) => {
    const myOrder = {
      myJourney: handlePaymentSuccess,
      paymentId,
      date: new Date(),
    };
    fetch("http://localhost:5055/addUserInformation", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(myOrder),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          swal("Your payment was successfully", "success");
        }
      });
  };

  return (
    <div className="user_information_taking_bg">
      <div
        className="server-send"
        style={{ display: handlePaymentSuccess ? "none" : "block" }}
      >
        <h2>Please fill out the form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name*"
            {...register("userName")}
            required
          />
          <input
            type="number"
            placeholder="Number*"
            {...register("number")}
            required
          />
          <input
            type="email"
            placeholder="Email*"
            {...register("email")}
            required
          />
          <input
            type="text"
            placeholder="Address*"
            {...register("Address")}
            required
          />
          <input type="text" value={rider.name} {...register("name")} />
          <input
            type="number"
            value={("$", rider.price)}
            {...register("price", { required: true })}
          />
          <button type="submit">Send Information</button>
        </form>
      </div>
      <div
        className="payment_style server-send"
        style={{
          display: handlePaymentSuccess ? "block" : "none",
          marginTop: "50px",
        }}
      >
        <h2>Please Pay Now</h2>
        <ProcessPayment
          handlePayment={handlePaymentSuccessItem}
        ></ProcessPayment>
      </div>
    </div>
  );
}
