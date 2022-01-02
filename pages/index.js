import NextLink from "next/link";
import data from "../utils/riders";
import Navbar from "../component/navbar/navbar";
export default function Home({ riderItems }) {
  console.log(riderItems);
  return (
    <>
      <Navbar></Navbar>
      <div className="main-service-div">
        <h2>
          <span className="color">How about this, </span> what is your favorite
          car for a trip{" "}
        </h2>
        <div className="search-bar">
          <input
            type="search"
            name=""
            id=""
            placeholder="search car for your trip"
          />
        </div>

        <div className="layout-show">
          {data.map((rider) => (
            <div className="images-details">
              <img src={rider.imageURL} alt="" />

              <div className="caption_and_text">
                <h4>{rider.name}</h4>
                <h5>Where to go - Anywhere</h5>
                <NextLink href={`/rider/${rider.riders}`} key={rider._id}>
                  <button>Subscribe</button>
                </NextLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
