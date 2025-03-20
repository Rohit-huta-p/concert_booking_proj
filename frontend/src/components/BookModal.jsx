import React, { useState } from 'react'
import axiosInstance from '../axiosInstance';

const BookModal = ({concertId, title}) => {
    const [ticketCount, setTicketCount] = useState(1);


    const bookConcert = async () => {
        try {
            
            const res = await axiosInstance.post("api/auth/bookconcert", {concertId, ticketCount});
            console.log(res.data);
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
        <div className='bg-white p-4'>
            <h1 className='text-xl font-bold mb-5'>Book {title}</h1>
            <div className="flex items-center mt-2 mr-5">
                    <label className="mr-2">Tickets:</label>
                    <input
                    type="text"
                    value={ticketCount}
                    onChange={(e) => setTicketCount(e.target.value)}
                    className="border p-1 w-16 text-center"
                    />
            </div>
            <button className='bg-blue-500 w-full text-white px-4 py-2 mt-5 rounded-lg cursor-pointer'
            onClick={bookConcert}
            >Book</button>

        </div>
       
    </div>
  )
}

export default BookModal