import React from 'react';
import MediaScroll from './MediaScroll';
import HistoryDescriptionComparison from './HistoryDescriptionComparison';
import ContactForm from './ContactForm';

const HistoryDescription = () => {
  return (
    <section className="  px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        
        <div className="prose prose-lg text-gray-700 leading-relaxed">
          <p>
            Если вы заглянули в эту вкладку, значит, наш объект вас действительно заинтересовал! Позвольте рассказать
            немного истории о том, как это помещение появилось и превратилось в то, что вы видите сейчас.
          </p>
          <MediaScroll /> 
          <p>
            Вы наверняка слышали истории, когда продавец с жаром рассказывает, как покупал или строил «для себя», вложил
            кучу сил и средств в ремонт, а теперь готов отдать это сокровище «хорошему человеку» почти даром. Часто это
            просто красивая маркетинговая сказка, а на деле объект оказывается с кучей скрытых недостатков. Но наш случай —
            исключение. Это действительно тот редкий объект, который создавался с душой и с затратами, которые превышают
            его сегодняшнюю цену.
          </p><br/>
          <p>
            Итак, с чего всё начиналось? У нас было помещение площадью 102 м² в цокольном этаже с потолками всего
            2,55–2,60 м (и это без учёта пола и потолка!). Ни канализации, ни водоснабжения, ни отопления, ни вентиляции —
            ничего. Электричество? Всего 1 кВт мощности и одна розетка с лампочкой на 220 Вт. Входная группа не
            соответствовала ни эксплуатационным, ни эстетическим требованиям, а отделка как таковая отсутствовала. О лифте
            для маломобильных людей и речи не шло.
          </p><br/>
          <p>
            А теперь посмотрите, что мы имеем сегодня! Помещение 102 м² плюс бонус — около 20 м² изолированной наружной
            площади (входная группа и приямки), которая достаётся вам фактически бесплатно. Потолки выросли до 3 метров, и
            это без учёта утепления, гидроизоляции, тёплого водяного пола по всей площади, подпотолочного пространства для
            коммуникаций и стильного финишного потолка. В итоге высота увеличилась на целый метр!
          </p><br/>
          <p>
            Подключены водоснабжение и канализация (включая магистральную для производственных стоков). Электрическая
            мощность увеличена с 1 кВт до 20 кВт, а напряжение — до 380 Вт для производственных нужд. Установлена
            приточно-вытяжная вентиляция, кондиционирование и тепловая завеса для входной группы. Окна и входная группа
            заменены на современные алюминиевые конструкции, а оконные проёмы увеличены вдвое. Входные блоки и приямки
            полностью реконструированы.
          </p><br/>
          <HistoryDescriptionComparison /><br/>
          <p>
            Внутри — настоящая красота: полы выложены высококачественной итальянской плиткой, стены покрыты
            износостойкой венецианской штукатуркой, а потолки — это стильные алюминиевые реечные конструкции, которые не
            только красивы, но и дают лёгкий доступ к коммуникациям. Установлена ресепшн-стойка из кирпича и
            гипсокартона, облицованная плиткой, с каменной столешницей и подведёнными сетями для локальной связи и
            сервера. Внутренние двери и перегородки — из цельного стекла. Есть полноценный санузел и мини-кухня.
          </p><br/>
          <p>
            Этот объект — не просто помещение, а пространство, созданное с заботой и вниманием к деталям. Оно готово к
            вашим идеям и проектам. Приходите, посмотрите своими глазами — уверены, вы почувствуете его особую атмосферу!
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export default HistoryDescription;