import React, { createRef, useCallback, useEffect } from 'react';
import throttle from 'lodash.throttle';

import PageTemplate from '../../../../src/components/PageTemplate';
import { Fireworks } from './fireworks_script';

import styles from './index.module.scss';
import { getRandomInt } from '../../../helpers/get_rangom_int';

/**
 * Размер шапки в пикселях
 */
const HEADER_HEIGHT = 80;

/**
 * Время анимации перемещения dogecoin в мс
 */
const DOGE_MOVING_DURATION = 250;

/**
 * Троттлинг перемещения мыши
 */
const DOGE_MOVE_THROTTLE = 10;

/**
 * Максимально возможная сумма смещения dogecoin по обеим осям (импирически получена)
 */
const ACCEPTABLE_OFFSET_SUM = 200;

/**
 * Количество пикселей, граничащих к dogecoin, при которых начинает срабатывать условие приближения курсора
 */
const AVALIABLE_CLOSE_OFFSET = 30;

const getFloat = (number: number) => {
    return Number(number.toFixed(1));
};

const Page: React.FC = React.memo(() => {
    const ref = createRef<HTMLImageElement>();

    const dogeCoords = {
        xStart: 0,
        xEnd: 0,
        yStart: 0,
        yEnd: 0
    };

    /**
     * Движется ли dogecoin в данный момент
     */
    let isTransitioning = false;

    /**
     * Был ли успешный клик по dogecoin
     */
    let wasSuccesedClick = false;

    /**
     * Текущее значение поворота 
     */
    let rotateValue = 360;

    /**
     * Инстанс класса с фейерверком
     */
    let fireworks: { run: () => void } | null = null;

    /**
     * Первоначальное появление dogecoin
     */
    const firstVisible = useCallback(() => {
        const element = ref.current;

        if (!element) return;

        const dogecoinSize = element.offsetWidth;

        const centerX = document.body.offsetWidth / 2 - dogecoinSize / 2;
        const centerY = document.body.offsetHeight / 2 - dogecoinSize / 2 - HEADER_HEIGHT;

        element.style.transform = `translate(${centerX}px,${centerY}px) scale(0.05) rotate(${rotateValue / 2}deg)`;

        setTimeout(() => {
            element.style.transition = 'transform .5s linear';
            element.style.transform = `translate(${centerX}px,${centerY}px) scale(1) rotate(${rotateValue}deg)`;
            element.style.opacity = '1';

            dogeCoords.xStart = getFloat(centerX);
            dogeCoords.xEnd = dogeCoords.xStart + dogecoinSize;

            dogeCoords.yStart = getFloat(centerY);
            dogeCoords.yEnd = dogeCoords.yStart + dogecoinSize;
        });
    }, []);

    /**
     * Проверяет находится ли близко мышь к иконке dogecoin
     */
    const isMouseClosestToDogecoin = (event: MouseEvent) => {
        const x = getFloat(event.x);
        const y = getFloat(event.y);

        const movedFromRight = (dogeCoords.xEnd - x + AVALIABLE_CLOSE_OFFSET) > 0;
        const movedFromLeft = (x - dogeCoords.xStart + AVALIABLE_CLOSE_OFFSET) > 0;
        const movedFromTop = (dogeCoords.yStart - y + HEADER_HEIGHT - AVALIABLE_CLOSE_OFFSET) < 0;
        const movedFromBottom = (y - dogeCoords.yEnd - HEADER_HEIGHT - AVALIABLE_CLOSE_OFFSET) < 0;

        const isIntersectVertical = movedFromTop && movedFromBottom;
        const isIntersectHorizontal = movedFromLeft && movedFromRight;

        const isIntersectDoge = isIntersectHorizontal && isIntersectVertical;

        return isIntersectDoge;
    };

    /**
     * Обновляем координаты dogecoin
     */
    const updateDogeCoords = ({ xStart, xEnd, yStart, yEnd }: { xStart: number, xEnd: number, yStart: number, yEnd: number }) => {
        dogeCoords.xStart = xStart;
        dogeCoords.xEnd = xEnd;

        dogeCoords.yStart = yStart;
        dogeCoords.yEnd = yEnd;
    };

    /**
     * С некоторой вероятность поворачиваем dogecoin
     */
    const tryToUpdateRandomRotate = () => {
        /**
         * Если true - поворачиваем
         */
        const changeFlag = Math.random() > 0.75;

        if (changeFlag) {
            /**
             * Если true - поворачиваем по часовой оси, false - против
             */
            const signFlag = Math.random() > 0.75;

            if (signFlag) {
                rotateValue += 180;
            } else {
                rotateValue -= 180;
            }
        }
    };

    /**
     * Получаем новые координаты для dogecoin
     *
     * Здесь есть хитрая механика, учитывающая следующее положение и текущее,
     * и если они находятся близко - пересчитываем новое положение еще раз
     */
    const getNewDogecoinCoords = (elementSize: number): { randomX: number, randomY: number } => {
        const xMin = 0;
        const xMax = document.body.offsetWidth - elementSize;

        const yMin = 0;
        const yMax = document.body.offsetHeight - HEADER_HEIGHT - elementSize;

        const randomX = getRandomInt(xMin, xMax);
        const randomY = getRandomInt(yMin, yMax);

        const xChangeOffset = Math.abs(randomX - dogeCoords.xStart);
        const yChangeOffset = Math.abs(randomY - dogeCoords.yStart);
        const changeOffsetSum = xChangeOffset + yChangeOffset;

        /**
         * Новое положение находится близко - пересчитываем еще раз
         */
        if (changeOffsetSum < ACCEPTABLE_OFFSET_SUM) return getNewDogecoinCoords(elementSize);

        return { randomX, randomY };
    };

    /**
     * Начинаем двигать dogecoin в другое место
     */
    const moveDogecoinRandom = () => {
        const element = ref.current;

        if (!element) return;

        if (isTransitioning) return;

        const elementSize = element.offsetWidth;

        const { randomX, randomY } = getNewDogecoinCoords(elementSize);

        tryToUpdateRandomRotate();

        element.style.transition = `transform ${DOGE_MOVING_DURATION}ms ease-in`;
        element.style.transform = `translate(${randomX}px,${randomY}px) rotate(${rotateValue}deg) scale(1)`;

        updateDogeCoords({
            xStart: randomX,
            xEnd: randomX + elementSize,
            yStart: randomY,
            yEnd: randomY + elementSize,
        });

        isTransitioning = true;
    };

    const onPointerMove = throttle(useCallback(event => {
        if (wasSuccesedClick) {
            return destroy();
        }

        isMouseClosestToDogecoin(event) && moveDogecoinRandom();
    }, []), DOGE_MOVE_THROTTLE);

    const successClick = () => {
        wasSuccesedClick = true;

        fireworks && fireworks.run();

        const element = ref.current;
        if (!element) return;

        const hideDuration = DOGE_MOVING_DURATION * 5;

        element.style.transition = `transform ${hideDuration}ms ease-in`;

        let transformValue = element.style.transform;

        /**
         * Увеличиваем rotate value на один круг
         */
        transformValue = transformValue.replace(/rotate\(([0-9deg]+)\)/, 'rotate(calc($1 + 360deg))');

        /**
         * Устанавливаем scale to zero
         */
        transformValue = transformValue.replace(/scale\(([0-9.]+)\)/, 'scale(0)');

        // Но на продакшне такой код лучше не писать
        element.style.transform = transformValue;
    };

    const onPointerDown = (event: MouseEvent) => {
        if (wasSuccesedClick) {
            return destroy();
        }

        /**
         * Если клик произошел по искомому элементу - победа
         */
        if (event.target === ref.current) {
            successClick();
        }
    };

    /**
     * Обработка окончания анимации перемещения
     */
    const onTransitionEnd = useCallback(() => {
        isTransitioning = false;
    }, []);

    /**
     * Обработка движения мыши
     */
    const handleMoveEvent = useCallback(() => {
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerdown', onPointerDown);

        const element = ref.current;
        element && element.addEventListener('transitionend', onTransitionEnd);
    }, []);

    const destroy = () => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerdown', onPointerDown);

        const element = ref.current;
        element && element.addEventListener('transitionend', onTransitionEnd);
    };

    useEffect(() => {
        firstVisible();

        handleMoveEvent();

        fireworks = new Fireworks(HEADER_HEIGHT);

        return () => {
            destroy();
        };
    }, []);

    return (
        <PageTemplate>
            <div className={styles.Dogecoin}>
                <div ref={ref} className={styles['Dogecoin-icon']} />
                <canvas className={styles['Dogecoin-canvas']}></canvas>
            </div>
        </PageTemplate>
    );
});

export default Page;
