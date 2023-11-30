import React from 'react';
import { useForm } from 'react-hook-form';
import { createEvent, DeleteEvent, updateEvent, getEvent } from '../api/events.api';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';

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
        }


    });
    useEffect(() => {
        async function loadEvent() {

            if (params.id) {
                const res = await getEvent(params.id)
                setValue('title', res.data.title)
                setValue('description', res.data.description)
                setValue('date', res.data.date)
            }
        }
        loadEvent()
    }, [])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" {...register('title', { required: 'Title is required' })} />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>
                <div>
                    <label>Description:</label>
                    <textarea {...register('description', { required: 'Description is required' })}></textarea>
                    {errors.description && <p>{errors.description.message}</p>}
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        {...register('date', {
                            required: 'Date is required',
                        })}
                    />
                    {errors.date && <p>{errors.date.message}</p>}
                </div>
                <div>
                    <label>Ubication:</label>
                    <input type="text" {...register('ubication', { required: 'Ubication is required' })} />
                    {errors.ubication && <p>{errors.ubication.message}</p>}
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
            {params.id && <button onClick={async () => {
                const message = window.confirm("¿Estas seguro que quieres eliminar la tarea?")
                if (message) {
                    await DeleteEvent(params.id);
                    navigate("/events")
                }
            }}>Delete</button>}

        </div>
    );
}
