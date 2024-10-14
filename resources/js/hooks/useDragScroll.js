import { useEffect, useRef, useState } from 'react';

const useDragScroll = (props = {}) => {
    const { activeClassName = '', speed = 1 } = props;

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [mouseMove, setMouseMove] = useState(false);
    const [result, setResult] = useState({
        isMouseDown,
        isMouseMove,
        ref: useRef(),
    });

    const slider = result.ref.current;
    let startX;
    let scrollLeft;

    useEffect(() => {
        console.log(isMouseDown);
        if (!slider) return;
        if (isMouseDown) slider.classList.add(activeClassName || 'test');
        else slider.classList.remove(activeClassName || 'test');

        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    }, [isMouseDown]);

    useEffect(() => {
        slider.scrollLeft = scrollLeft - scrollMove;
    }, [mouseMove]);

    if (!slider) return result;

    slider.addEventListener('mouseleave', () => {
        setIsMouseDown(false);
    });

    slider.addEventListener('mouseup', () => {
        setIsMouseDown(false);
    });

    slider.addEventListener('mousedown', (e) => {
        setIsMouseDown(true);
    });

    slider.addEventListener('mousemove', (e) => {
        const mouseMoveX = e.pageX;
        const marginSlider = slider.offsetLeft;
        setMouseMove(mouseMoveX - marginSlider);
        e.preventDefault();

        const x = e.pageX - slider.offsetLeft;
        const scrollMove = (x - startX) * speed; // scroll-fast
        console.log(scrollMove);
    });

    return result;
};

export default useDragScroll;
