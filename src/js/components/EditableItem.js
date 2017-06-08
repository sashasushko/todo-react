import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import Input from './Input';
import Button from './Button';

// подумать, как сделать ESC

export default function EditableItem(props) {
    const { item, onChange, onRemove } = props;
    const { label, checked, editable } = item;
    return (
        <div>
            <Checkbox
                checked={checked}
                onChange={onChange && (checked => onChange({ checked }))}
            />
            {!editable && (
                <span
                    onClick={onChange && (label => {
                        onChange({ editable: true });
                    })}
                >{label}</span>
            )}
            {editable && (
                <Input
                    value={label}
                    onChange={onChange && (label => {
                        onChange({
                            label
                        });
                    })}
                    onBlur={onChange && (label => {
                        onChange({
                            label,
                            editable: false
                        });
                    })}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            onChange({
                                label: event.target.value,
                                editable: false
                            })
                        }
                    }}
                    autofocus={true}
                />
            )}
            <Button
                label='Удалить'
                onClick={onRemove}
            />
        </div>
    )
}