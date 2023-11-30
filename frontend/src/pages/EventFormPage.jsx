import React from 'react';
import { useForm } from 'react-hook-form';
import { createEvent } from '../api/events.api';
import { format } from 'date-fns'; // Importa la función de formato de date-fns

export function EventFormPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        // Formatea la fecha utilizando date-fns antes de enviarla al servidor
        data.date = format(new Date(data.date), 'yyyy-MM-dd');
        const res = await createEvent(data);
        console.log(res);
    });

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
                        type="date" // Usa el tipo 'date' para el campo de fecha
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
        </div>
    );
}
