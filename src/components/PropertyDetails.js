import React from 'react';

function PropertyDetails() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Помещение</h2>
      <p className="mb-2"><strong>Address:</strong> город Минсе, улица Петра Мстиславца 1-14</p>
      <p className="mb-2"><strong>Цена</strong> 2200$ м2</p>
      <p className="mb-2"><strong>Санузел</strong> 1</p>
      <p className="mb-2"><strong>Вентиляция, полы с обогревом</strong></p>
      <p className="mb-2"><strong>Общая площадь:</strong> 102</p>
      <p><strong>Oписание</strong> Продается престижное помещение площадью 102 м² на улице Петра Мстиславца, 1 в Минске. Это идеальное место для офиса, салона красоты или небольшого бизнеса. Помещение отличается высококлассным дизайном и расположено в престижном районе, что делает его очень привлекательным для потенциальных покупателей. Не упустите возможность приобрести это уникальное предложение!

</p>
    </div>
  );
}

export default PropertyDetails;