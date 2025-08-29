import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react'; // For a nice icon in the button
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; // ✅ Added Framer Motion

function Hero() {
  return (
    <div className='h-screen flex items-center justify-center relative'>
      {/* Content */}
      <motion.div
        className='flex flex-col items-center gap-8 text-center px-4'
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className='font-extrabold text-white text-4xl md:text-6xl leading-tight'
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className='text-[#f96450]'>Discover Your Next Adventure with AI:</span>
          <br />
          Personalized Itineraries at Your Fingertips
        </motion.h1>

        <motion.p
          className='text-lg text-gray-200 max-w-3xl'
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget. Stop planning, start exploring.
        </motion.p>

        <Link to={"/create-trip"}>
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 1, rotateX: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Button
              size="lg"
              className="bg-[#f96450] text-lg font-semibold py-7 px-8 rounded-full
                          hover:bg-[#e85a46] transform transition-all duration-300
                          hover:shadow-xl shadow-lg"
            >
              Get Started, It's Free
              <Rocket className="w-5 h-5 ml-3" />
            </Button>
          </motion.div>
        </Link>

        <motion.img
          src="/lap.png"
          alt=""
          className='w-[750px]'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          whileHover={{ rotateY: 15, scale: 1.05 }}
        />
      </motion.div>
    </div>
  );
}

export default Hero;
