// ts
import React, { useEffect } from 'react';

import PageTemplate from '../../components/PageTemplate';

import styles from './index.module.scss';

const isInjected = false;

const injectPcodeScript = (callback: VoidFunction) => {
  if (isInjected) return;

  const scriptElement = document.createElement('script');
  scriptElement.innerText = 'window.yaContextCb = window.yaContextCb || []';

  document.body.appendChild(scriptElement);

  const loaderElement = document.createElement('script');
  loaderElement.src = 'https://yandex.ru/ads/system/context.js';

  document.body.appendChild(loaderElement);

  loaderElement.onload = () => {
    callback();
  };
}

const Page: React.FC = React.memo(() => {
  useEffect(() => {
    const callback = () => {
      (window as any).yaContextCb.push(() => {
        const blockId = 'R-A-1529408-1';

        (window as any).Ya.Context.AdvManager.render({
          renderTo: "video_in_combo",
          blockId,
          statId: 123456,
          videoCallbacks: {
            onAdStart: () => console.log('ON AD START'),
            onAdEnd: () => console.log('ON AD END')
          },
          onError: function (data: any) {
            console.log('type', data.type); // error или warning
            console.log('code', data.code); // Код ошибки из таблицы выше
            console.log('text', data.text); // Текстовое описание ошибки
            // Обработка ошибки со стороны площадки  
          }
        },
          function () {
            //altCallback - Вызывается в тот момент, когда по результатам розыгрыша аукциона в движке произошёл неподбор рекламы.
            console.log('altCallback');
          })
      })
    };

    injectPcodeScript(callback);
  }, []);

  return (
    <PageTemplate>
      <div className={styles.advPage}>
        <h3 className={styles.header}>Страница для тестирования рекламы</h3>

        <div className={styles.container}>
          <div className={styles.videoInCombo} id='video_in_combo'>

          </div>
        </div>
      </div>
    </PageTemplate>
  );
});

export default Page;
