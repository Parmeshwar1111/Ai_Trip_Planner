import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetUnsplashPhoto } from "@/service/GlobalApi";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.jpg");

  useEffect(() => {
    if (!trip?.userSelection?.location) return;

    const fetchImage = async () => {
      try {
        const resp = await GetUnsplashPhoto(trip.userSelection.location);
        if (resp.data.results?.length > 0) {
          setPhotoUrl(resp.data.results[0].urls.small);
        } else {
          console.warn(`No Unsplash result for ${trip.userSelection.location}, using placeholder.`);
          setPhotoUrl("/placeholder.jpg");
        }
      } catch (err) {
        console.error("Error fetching Unsplash photo:", err);
        setPhotoUrl("/placeholder.jpg");
      }
    };

    fetchImage();
  }, [trip]);

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl}
          alt={trip?.userSelection?.location}
          className="object-cover rounded-xl h-[220px] w-full"
        />
        <div>
          <h2 className="font-bold text-lg">{trip?.userSelection?.location}</h2>
          <h2 className="text-sm text-gray-400">
            {trip?.userSelection?.noOfDays} Days Trip with {trip?.userSelection?.traveller } person
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
