import React, { useEffect, useState } from "react";
import PlaceCardItem from "./PlaceCardItem";
import { GetUnsplashPhoto } from "@/service/GlobalApi";

function PlacesToVisit({ trip }) {
  const [placeImages, setPlaceImages] = useState({});

  useEffect(() => {
    if (!trip?.tripData?.itinerary) return;

    const fetchImages = async () => {
      let allPlaces = [];

      // Extract all unique place names from itinerary
      Object.values(trip.tripData.itinerary).forEach((day) => {
        day.places.forEach((place) => {
          if (place?.placeName && !allPlaces.includes(place.placeName)) {
            allPlaces.push(place.placeName);
          }
        });
      });

      // Fetch all images in parallel
      const promises = allPlaces.map(async (name) => {
        try {
          const resp = await GetUnsplashPhoto(name);
          if (resp.data.results?.length > 0) {
            return { name, url: resp.data.results[0].urls.small };
          } else {
            return { name, url: "/placeholder.jpg" };
          }
        } catch (err) {
          console.error("Error fetching image for", name, err);
          return { name, url: "/placeholder.jpg" };
        }
      });

      const results = await Promise.all(promises);
      const imageMap = {};
      results.forEach(({ name, url }) => {
        imageMap[name] = url;
      });

      setPlaceImages(imageMap);
    };

    fetchImages();
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-lg mt-10 mb-7">Places to Visit</h2>
      <div>
        {trip.tripData && typeof trip.tripData.itinerary === "object" ? (
          Object.entries(trip.tripData.itinerary).map(([day, info]) => (
            <div key={day} className="mt-5">
              <h3 className="font-medium text-lg">{day}</h3>
              <p className="font-medium text-sm text-orange-300">
                {info.best_time_to_visit}
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                {info.places.map((place, index) => (
                  <div key={index} className="my-3">
                    <PlaceCardItem
                      place={place}
                      imageUrl={placeImages[place.placeName]}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No itinerary available</p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
