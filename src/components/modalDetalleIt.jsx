import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import Card from './detalle/CardDetalle';
import LugarDetalle from './detalle/LugarDetalle';
import img1 from "../img/pref_user/category1.png";
import img2 from "../img/pref_user/category2.png";
import img3 from "../img/pref_user/category3.png";
import img4 from "../img/pref_user/category4.png";

function ModalDetalleIt() {
  const [items, setItems] = useState([
    { id: '1', title: 'Xochimilco', rating: '3.9', time: '8:00 am - 10:00 am', image: img1, images: [img1, img2, img3], address: 'Dirección de Xochimilco', description: 'Xochimilco es una delegación de la Ciudad de México conocida por sus hermosos canales y chinampas, que son islas flotantes utilizadas para la agricultura. Es un lugar lleno de cultura, tradición y belleza natural, y es famoso por los paseos en trajineras, donde puedes disfrutar de música, comida y bebida mientras navegas por los canales.' },
    { id: '2', title: 'Parque Chino', rating: '4.4', time: '11:30 am - 1:30 pm', image: img2 },
    { id: '3', title: 'Museo Frida Kahlo', rating: '4.7', time: '2:00 pm - 4:00 pm', image: img3 },
    { id: '4', title: 'Coyoacán', rating: '4.2', time: '5:00 pm - 7:00 pm', image: img4 },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleRemove = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content MD-tam">
          <div className="modal-header">
            <h5 className="modal-title MD-title" id="exampleModalLabel">Día 10</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-12 mb-3">
                <button type="button" className="btn btn-primary MD-btn-regresar" data-bs-dismiss="modal">
                  Regresar
                </button>
                <div className="MD-lista-elementos">
                  <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                      {items.map((item) => (
                        <Card
                          key={item.id}
                          id={item.id}
                          title={item.title}
                          rating={item.rating}
                          time={item.time}
                          image={item.image}
                          onRemove={handleRemove}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-12">
                <LugarDetalle lugar={items.find((item) => item.id === '1')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDetalleIt;
