import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../../css/Detalles.css';

function CardDetalle({ id, title, rating, time, image, onRemove }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="CD-card">
            <div className="CD-card-body">
                <i
                    className="bi bi-list CD-icon-drag"
                    {...listeners}
                    {...attributes}
                ></i>
                <img
                    src={image}
                    alt={title}
                    className="CD-card-img"
                />
                <div className="CD-content">
                    <h5 className="CD-card-title">{title}</h5>
                    <p className="CD-card-text">
                        {rating} <i className="bi bi-star-fill text-warning"></i>
                    </p>
                    <p className="CD-card-text">{time}</p>
                    <a href="#" className="CD-card-link">
                        Ver detalles
                    </a>
                </div>
                <i
                    className="bi bi-trash CD-icon-delete"
                    onClick={() => onRemove(id)}
                ></i>
            </div>
        </div>
    );
}

export default CardDetalle;
