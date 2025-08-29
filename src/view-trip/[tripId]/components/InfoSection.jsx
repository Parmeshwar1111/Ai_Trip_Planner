// import React, { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { GetUnsplashPhoto } from '@/service/GlobalApi';

// function InfoSection({ trip }) {
//     const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');

//     useEffect(() => {
//         if (!trip || !trip.userSelection?.location) {
//             console.log("Waiting for trip data...");
//             return;
//         }

//         const locationLabel = trip.userSelection.location;
//         console.log("Searching Unsplash for:", locationLabel);

//         GetUnsplashPhoto(locationLabel)
//             .then(resp => {
//                 if (resp.data.results?.length > 0) {
//                     setPhotoUrl(resp.data.results[0].urls.regular);
//                 } else {
//                     console.warn("No Unsplash results found — using placeholder.");
//                     setPhotoUrl('/placeholder.jpg');
//                 }
//             })
//             .catch(err => {
//                 console.error("Error fetching Unsplash photo:", err);
//                 setPhotoUrl('/placeholder.jpg');
//             });

//     }, [trip]);

//     return (
//         <div>
//             <img
//                 src={photoUrl}
//                 alt="Place"
//                 className='h-[340px] w-full object-cover rounded-xl'
//             />
//             <div className='my-5 flex flex-col gap-2'>
//                 <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
//                 <div className='flex gap-5'>
//                     <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
//                         📅 {trip?.userSelection?.noOfDays} Day
//                     </h2>
//                     <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
//                         💰 {trip?.userSelection?.budget} Budget
//                     </h2>
//                     <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
//                         👥 No. of traveler/s: {trip?.userSelection?.traveller}
//                     </h2>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default InfoSection;

import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { GetUnsplashPhoto } from '@/service/GlobalApi';



function InfoSection({ trip }) {

    const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');



    useEffect(() => {

        if (!trip || !trip.userSelection?.location) {

            console.log("Waiting for trip data...");

            return;

        }



        const locationLabel = trip.userSelection.location;

        console.log("Searching Unsplash for:", locationLabel);



        GetUnsplashPhoto(locationLabel)

            .then(resp => {

                if (resp.data.results?.length > 0) {

                    setPhotoUrl(resp.data.results[0].urls.regular);

                } else {

                    console.warn("No Unsplash results found — using placeholder.");

                    setPhotoUrl('/placeholder.jpg');

                }

            })

            .catch(err => {

                console.error("Error fetching Unsplash photo:", err);

                setPhotoUrl('/placeholder.jpg');

            });



    }, [trip]);



    return (

        <div>

            <img

                src={photoUrl}

                alt="Place"

                className='h-[340px] w-full object-cover rounded-xl'

            />

            <div className='my-5 flex flex-col gap-2'>

                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>

                <div className='flex gap-5'>

                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>

                        📅 {trip?.userSelection?.noOfDays} Day

                    </h2>

                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>

                        💰 {trip?.userSelection?.budget} Budget

                    </h2>

                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>

                        👥 No. of traveler/s: {trip?.userSelection?.traveller}

                    </h2>

                </div>

            </div>

        </div>

    );

}



export default InfoSection;