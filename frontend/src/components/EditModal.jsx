import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance';

const EditModal = ({concertId, setIsEditModalOpen, bookedConcerts}) => {
    const [ticketCount, setTicketCount] = useState(1);
    console.log(bookedConcerts);
    
    const selectedConcert = bookedConcerts.find((concert) => concert.concertId === concertId);
    console.log(selectedConcert);
    
    useEffect(() => {
        if (selectedConcert) {
            setTicketCount(selectedConcert.noOfTickets);
        }
    }, [selectedConcert]);


    const editTickets = async () => {
        try {
            const res = await axiosInstance.post("api/auth/editTickets", {concertId, ticketCount});
            setIsEditModalOpen(false);
        } catch (error) {
            console.log(error);
            
        }   
    } 

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
    <div className='bg-white p-4'>
        <h1 className='text-xl font-bold mb-5'>Edit tickets</h1>
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
            onClick={editTickets}
        >
            Edit
        </button>
    
    </div>
</div>
  )
}

export default EditModal