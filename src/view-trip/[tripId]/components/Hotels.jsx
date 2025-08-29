import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetUnsplashPhoto } from "@/service/GlobalApi";

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState([]);

  useEffect(() => {
    if (!trip?.tripData?.hotel_options) {
      console.log("Waiting for hotel data...");
      return;
    }

    const fetchImages = async () => {
      const promises = trip.tripData.hotel_options.map(async (hotel) => {
        try {
          const resp = await GetUnsplashPhoto(`${hotel.HotelName} hotel`);
          if (resp.data.results?.length > 0) {
            return resp.data.results[0].urls.small;
          } else {
            console.warn(`No Unsplash result for ${hotel.HotelName}, using placeholder.`);
            return "/placeholder.jpg";
          }
        } catch (err) {
          console.error("Error fetching Unsplash photo for", hotel.HotelName, err);
          return "/placeholder.jpg";
        }
      });

      const urls = await Promise.all(promises);
      setHotelImages(urls);
    };

    fetchImages();
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-xl mt-10 mb-7">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
          <Link
            key={index}
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              hotel.HotelName +
              "," +
              hotel.HotelAddress
            }
            target="_blank"
          >
            <div className="hover:scale-105 transition-all cursor-pointer">
              <img
                src={hotelImages[index] || "/placeholder.jpg"}
                alt={hotel.HotelName}
                className="rounded-xl w-full h-48 object-cover"
              />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{hotel.HotelName}</h2>
                <h2 className="text-xs text-gray-400">
                  📍{hotel.HotelAddress}
                </h2>
                <h2 className="text-sm text-gray-900">💴 {hotel.Price}</h2>
                <h2 className="text-sm">⭐ {hotel.Rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
