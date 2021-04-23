import { cn } from '@bem-react/classname';
import React, { useCallback, useState } from 'react';
import { copyText } from '../../helpers/copy-text';

const cnCode = cn('Code');
const cnCodeContent = cnCode('Content');

import styles from './index.module.scss';

let timer: NodeJS.Timer | null = null;

const Code: React.FC<{ code: string }> = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const onCodeClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const domElem: HTMLDivElement | null = (e.target as HTMLDivElement).closest(`.${cnCodeContent}`);

        domElem && copyText(domElem, () => {
            setCopied(true);

            timer && clearTimeout(timer as NodeJS.Timer);

            timer = setTimeout(() => {
                setCopied(false);
            }, 3000);
        });
    }, []);

    return (
        <div className={styles.Code} onClick={e => onCodeClick(e)}>
            <div className={copied ? styles['Code-Copy_copied'] : styles['Code-Copy']} />
            <div className={cnCodeContent}>
                <pre><code className='javascript'>{code}</code></pre>
            </div>
        </div>
    );
}

export default Code;
