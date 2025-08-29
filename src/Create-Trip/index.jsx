import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '../constant/options';
import { Button } from '../components/ui/button'
import { toast } from 'sonner';
import { chatSession } from '../service/ALmodel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

function CreateTrip() {
  const [place, setplace] = useState()
  const [formdata, setformdata] = useState([]);
  const [openDialog, setopenDialog] = useState(false);
  const [loading, setloading] = useState();
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setformdata({
      ...formdata,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formdata)
  }, [formdata])

  const OnGenarateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setopenDialog(true);
      return;
    }

    if (!formdata?.noOfDays > 5 && !formdata?.location || !formdata?.budget || !formdata?.traveller) {
      return toast("please fill all details.")
    }

    setloading(true);

    const Final_Prompt = AI_PROMPT
      .replace('{location}', formdata?.location)
      .replace('{totalDays}', formdata?.noOfDays)
      .replace('{traveler}', formdata?.traveller)
      .replace('{budget}', formdata?.budget)

    console.log(Final_Prompt);

    const result = await chatSession.sendMessage(Final_Prompt);
    console.log(result?.response?.text());
    setloading(false);
    SaveTrip(result?.response?.text());
  }

  const login = useGoogleLogin({
    onSuccess: (codesResp) => GetUserProfile(codesResp),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (token_info) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token_info?.access_token}`, {
      headers: {
        Authorization: `Bearer ${token_info?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setopenDialog(false);
      OnGenarateTrip();
    });
  }

  const SaveTrip = async (Trip_Details) => {
    setloading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem('user'));

    let parsedTripDetails;
    try {
      parsedTripDetails = JSON.parse(Trip_Details);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Failed to parse trip details. Please try again.');
      setloading(false);
      return;
    }

    await setDoc(doc(db, 'AITrips', docId), {
      userSelection: formdata,
      tripData: parsedTripDetails,
      userEmail: user?.email,
      id: docId
    });

    setloading(false);
    navigate(`/view-trip/${docId}`);
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 animate-fadeIn'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🚞✈️</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-9'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of your choice✈️?</h2>
          <Input
            placeholder={'Ex. Mumbai,India'}
            type='text'
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            onChange={(v) => { setplace(v); handleInputChange('location', v.target.value) }}
          />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
        <Input
          placeholder={'Ex-3'}
          type={"number"}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          onChange={(e) => { handleInputChange('noOfDays', e.target.value) }}
        />
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => { handleInputChange('budget', item.title) }}
                className={`p-4 border rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer
                  ${formdata?.budget == item.title && 'shadow-lg border-black bg-blue-50'}`}
              >
                <h2 className='text-4xl transition-transform duration-300 hover:scale-110 hover:animate-bounce'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
          {SelectTravelsList.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => { handleInputChange('traveller', item.id) }}
                className={`p-4 border rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer
                  ${formdata?.traveller == item.id && 'shadow-lg border-black bg-blue-50'}`}
              >
                <h2 className='text-4xl transition-transform duration-300 hover:scale-110 hover:animate-bounce'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            );
          })}
        </div>
      </div>

      <div className='my-10 flex justify-end'>
        <Button
          disabled={loading}
          onClick={() => { OnGenarateTrip() }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          {loading ? <FaSpinner className='h-7 w-7 animate-spin' /> : "Generate Trip"}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setopenDialog}>
        <DialogContent className="animate-[fadeInScale_0.3s_ease-in-out]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <img src='/public/logo.svg' className="w-40 h-auto ml-[34%]" />
            </DialogDescription>
            <h2 className='font-bold text-lg mt-5'>Sign In with Google</h2>
            <p>Sign In to the App with Google Authentication securely</p>
            <Button
              className='w-full mt-7 flex gap-2 items-center hover:scale-105 transition-all duration-300'
              onClick={login}
            >
              <FcGoogle className='h-6 w-6' />
              Sign In With Google
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip
