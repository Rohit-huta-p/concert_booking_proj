import React, { useState } from 'react'
import axiosInstance from '../axiosInstance';

const Modal = ({setIsAddConcert, setConcerts}) => {
    const [data, setData] = useState({
        title: "",
        date: "",
        time: "",
        venue: "",
        price: "",
    });
    console.log(data);
    
    const addConcert = async () => {
        try {
            const res = await axiosInstance.post("/api/concerts/add", data);
            setConcerts((prev) => [...prev, res.data.concert]);
            setIsAddConcert(false);
            
        } catch (error) {
            console.log(err);
            
        }
    }
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
        <div className='bg-white p-4'>
            <h1 className='text-xl font-bold'>Add Conert</h1>
            <form className='flex flex-col gap-2 mt-4 '>
                <div>
                    <label>Tile:</label>
                    <input type="text" 
                    className='p-2  mb-2 '
                        placeholder='Title'
                        name="title"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    />
                </div>
                <div>
                    <label>Date</label>
                    <input type="date" 
                        placeholder='Date'
                        className='p-2  mb-2 '
                        name={data.date}
                        value={data.date}
                        onChange={(e) => setData({ ...data, date: e.target.value })}
                    />
                </div>

                <div>
                    <label>Time</label>
                    <input type="time" 
                        placeholder='Time'
                        className='p-2  mb-2 '
                        name={data.time}
                        value={data.time}
                        onChange={(e) => setData({ ...data, time: e.target.value })}
                    />
                </div>
                <div>

                    <label>Venue</label>
                    <input type="text" 
                        className='p-2  mb-2 '
                        placeholder='Venue'
                        name={data.venue}
                        value={data.venue}
                        onChange={(e) => setData({ ...data, venue: e.target.value })}
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input type="text" 
                        className='p-2  mb-2 '
                        placeholder='Price'
                        name={data.price}
                        value={data.price}
                        onChange={(e) => setData({ ...data, price: e.target.value })}
                    />
                </div>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer' 
                        onClick={() => addConcert()}
                    >
                    Add Concert
                </button>
            </form>
        </div>
    </div>
  )
}

export default Modal