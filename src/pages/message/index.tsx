import React, { useCallback, useEffect, useState } from 'react';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import SendIcon from '@material-ui/icons/Send';
import CachedIcon from '@material-ui/icons/Cached';

import PageTemplate from '../../../src/components/PageTemplate';

import styles from './index.module.scss';
import { getRandomInt } from '../../helpers/get_rangom_int';

/**
 * Время, через которое скрывается tooltip
 */
const TOOLTIP_HIDE_TIMEOUT = 3000;

/**
 * Задержка до появление tooltip'а, нужна с т.з. UI/UX (чтобы визуально было видно, что загружается)
 */
const TOOLTIP_SHOW_DELAY = 500;

/**
 * API, где получаем случайную цитату
 */
const RANDOM_QUOTE_API_URL = 'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand';

const Page: React.FC = React.memo(() => {
  const [text, setText] = useState('');
  const [isLoading, toggleLoading] = useState(true);
  const [isSended, toggleSended] = useState(false);

  let tooltipTimer: NodeJS.Timer | null = null;

  const onSendButtonClick = useCallback(() => {
    toggleSended(false);
    toggleLoading(true);

    fetch('/api/sendMessageMe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    }).then(response => response.json())
      .then(_ => {
        clearTimeout(tooltipTimer as NodeJS.Timer);

        tooltipTimer = setTimeout(() => {
          toggleSended(false);
        }, TOOLTIP_HIDE_TIMEOUT);

        setTimeout(() => {
          toggleSended(true);
          toggleLoading(false);
        }, TOOLTIP_SHOW_DELAY);
      });
  }, [text]);

  /**
   * Из API приходит кусок HTML, хотим получить только текстовое содержимое
   */
  const getContentFromHTMLRaw = (HTMLRawText: string) => {
    const element: HTMLElement = document.createElement('div');
    element.innerHTML = HTMLRawText;

    const firstChild = element.firstChild as HTMLElement;

    return firstChild.innerText.trim();
  };

  const getRandomQuote = useCallback(() => {
    fetch(RANDOM_QUOTE_API_URL + `&nocache=${Math.random()}`)
      .then(response => response.json())
      .then(result => {
        const index = getRandomInt(0, result.length - 1);
        const item = result[index];

        let text = getContentFromHTMLRaw(item.content.rendered);

        /**
         * Убираем точку в конце, если заканчивается на
         */
        if (text.endsWith('.')) {
          text = text.slice(0, text.length - 1);
        }

        const author = item.title.rendered;
        const quoteText = text + ' — ' + author + '.';

        /**
         * Если почему-то цитаты совпадают - запрашиваем новую
         */
        if (quoteText === text) {
          getRandomQuote();
        } else {
          setText(quoteText);
        }

        toggleLoading(false);
      });
  }, [text]);

  useEffect(() => {
    getRandomQuote();
  }, []);

  const handleTooltipClose = () => {
    toggleSended(false);
  }

  const onTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const onRandomButtonClick = () => {
    toggleLoading(true);
    toggleSended(false);

    getRandomQuote();
  }

  return (
    <PageTemplate>
      <div className={styles.MessageBox}>
        <div className={styles['MessageBox-Container']}>
          <TextareaAutosize onChange={onTextareaChange} value={text} className={styles['MessageBox-Textarea']} placeholder='Message text' />
          <Tooltip
            title='Sended'
            arrow
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={isSended}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <ButtonGroup className={styles['MessageBox-ButtonGroup']} color='primary' aria-label='outlined default button group'>
              <Button
                onClick={onRandomButtonClick}
                disabled={isLoading}
                className={styles['MessageBox-ChangeButton']}
                size='large'
                variant='contained'
                color='default'
                startIcon={<CachedIcon fontSize='small' />}
              >
                Change
                            </Button>
              <Button
                onClick={onSendButtonClick}
                disabled={isLoading}
                className={styles['MessageBox-SendButton']}
                size='large'
                variant='contained'
                color='primary'
                endIcon={<SendIcon fontSize='small' />}
              >
                Send
                        </Button>
            </ButtonGroup>
          </Tooltip>
        </div>
      </div>
    </PageTemplate>
  );
});

export default Page;
