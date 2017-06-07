import React from 'react';

export default function Input({ value, onChange }) {
    return (
        <input value={value} type="text" onChange={event => onChange(event.target.value)} />
    )
}