import { useEffect } from 'react';

const useViewportHeight = () => {
    useEffect(() => {
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setViewportHeight(); // Вызываем при загрузке компонента
        window.addEventListener('resize', setViewportHeight); // Обновляем при изменении размера окна

        return () => {
            window.removeEventListener('resize', setViewportHeight);
        };
    }, []);
};

export default useViewportHeight;
