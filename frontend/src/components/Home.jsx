import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../GlobalContext';
import axiosInstance from '../axiosInstance';
import Modal from './Modal';
import BookModal from './BookModal';

const Home = ({concerts}) => {
  const {setConcerts} = useContext(GlobalContext);
  const [bookedconcerts, setBookedConcerts] = useState([]);
  console.log(bookedconcerts);
  
  const [isAddConcert, setIsAddConcert] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  

  const fetchConcerts = async () => {
    try {
      const res = await axiosInstance.get("/api/concerts")
      setConcerts(res.data.concerts);  
    } catch (error) {
      console.log(error);
    }
  }

  const get_all_booked_concerts = async () => {
    try {
        const res = await axiosInstance.get("/api/auth/bookedconcerts")
        setBookedConcerts(res.data.bookedConcerts);
      } catch (error) {
        console.log(error);
      }
  } 
  
  useEffect(() => {
    fetchConcerts();
    get_all_booked_concerts();
  }, [])
  

  return (
    <div className="p-4">
      <div className='flex justify-between'>
        <h1 className="text-xl font-bold">Concerts</h1>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer' onClick={() => setIsAddConcert(true)}>Add Concert</button>
        {isAddConcert && <Modal setIsAddConcert={setIsAddConcert} setConcerts={setConcerts}/>}
      </div>
    <div className="grid grid-cols-1 gap-4 mt-4">
      {concerts.map((concert) => {
        const isBooked = bookedconcerts.some(booked => booked.concertId === concert._id);
        return (
          <div key={concert._id} className={`flex justify-between items-center border p-4 rounded-lg shadow-lg ${isBooked ? 'bg-gray-200 opacity-50' : 'bg-white'}`}>
            <div>
              <h2 className="text-lg font-semibold">{concert.title}</h2>
              <p className="text-gray-600">{concert.date}</p>
            </div>
            {isBooked ? (
              <span className='text-green-500 font-bold'>Booked</span>
            ) : (
              <>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer' onClick={() => setIsBookModalOpen(true)}>Book</button>
                {isBookModalOpen && <BookModal title={concert.title} concertId={concert._id}/>}
              </>
            )}
          </div>
        )
      })}

    </div>
  </div>
  )
}

export default Home