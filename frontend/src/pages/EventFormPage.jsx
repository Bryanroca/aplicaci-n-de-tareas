import React from 'react';
import { useForm } from 'react-hook-form';
import { createEvent, DeleteEvent, updateEvent, getEvent } from '../api/events.api';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { toast } from 'react-hot-toast'
export function EventFormPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const navigate = useNavigate();
    const params = useParams();


    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await updateEvent(params.id, data)
            navigate("/events")

        } else {

            data.date = format(new Date(data.date), 'yyyy-MM-dd');
            const res = await createEvent(data);
            navigate("/events")
            toast.success('Tarea actualizada', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }


    });
    useEffect(() => {
        async function loadEvent() {

            if (params.id) {
                const res = await getEvent(params.id)
                setValue('title', res.data.title)
                setValue('description', res.data.description)
                setValue('date', res.data.date)
                setValue('ubication', res.data.ubication)
            }
        }
        loadEvent()
    }, [])

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        {...register('title', { required: 'Title is required' })}
                        placeholder="Enter title"
                        className="w-full border p-2 rounded placeholder-black"
                        style={{ color: 'black' }}
                    />


                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        {...register('description', { required: 'Description is required' })}
                        placeholder="Enter description"
                        className="w-full border p-2 rounded placeholder-black"
                        style={{ color: 'black' }}
                    ></textarea>
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                        Date:
                    </label>
                    <input
                        type="date"
                        id="date"
                        {...register('date', { required: 'Date is required' })}
                        placeholder="Select date"
                        className="w-full border p-2 rounded placeholder-black"
                        style={{ color: 'black' }}
                    />
                    {errors.date && <p className="text-red-500">{errors.date.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="ubication" className="block text-gray-700 font-bold mb-2">
                        Ubication:
                    </label>
                    <input
                        type="text"
                        id="ubication"
                        {...register('ubication', { required: 'Ubication is required' })}
                        placeholder="Enter ubication"
                        className="text-gray-700 w-full border p-2 rounded placeholder-black"
                    />
                    {errors.ubication && <p className="text-red-500">{errors.ubication.message}</p>}
                </div>
                <div>

                </div>
                <div className='flex justify-between'>
                    <div>
                        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded">
                            Save
                        </button>
                    </div>
                    {params.id && (
                        <button
                            onClick={async () => {
                                const message = window.confirm('¿Estás seguro que quieres eliminar la tarea?');
                                if (message) {
                                    console.log("tarea eliminada")
                                    await DeleteEvent(params.id);
                                    toast.success('Tarea Eliminada', {
                                        position: 'bottom-right',
                                        style: {
                                            background: '#101010',
                                            color: '#fff',
                                        },
                                    });
                                }
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                    )}
                </div>

            </form>
        </div>
    );
}
