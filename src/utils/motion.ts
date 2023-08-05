import { Variants } from 'framer-motion';

const textVariant = (delay:number):Variants => {
    return {
        hidden: {
            y: -50,
            opacity: 0,
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                duration: 1.25,
                delay,
            },
        },
    };
};

const fadeIn = (direction: 'up' | 'down' | 'right' | 'left', type:string, delay:number, duration:number):Variants => {
    const horizontalDirection = direction === 'right' ? -100 : 0;
    const verticalDirection = direction === 'down' ? -100 : 0;

    return {
        hidden: {
            x: direction === 'left' ? 100 : horizontalDirection,
            y: direction === 'up' ? 100 : verticalDirection,
            opacity: 0,
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type,
                delay,
                duration,
                ease: 'easeOut',
            },
        },
    };
};

const zoomIn = (delay:number, duration:number):Variants => {
    return {
        hidden: {
            scale: 0,
            opacity: 0,
        },
        show: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'tween',
                delay,
                duration,
                ease: 'easeOut',
            },
        },
    };
};

const slideIn = (direction: 'up' | 'down' | 'right' | 'left', type:string, delay:number, duration:number):Variants => {
    const horizontalDirection = direction === 'right' ? '100%' : 0;
    const verticalDirection = direction === 'down' ? '100%' : 0;

    return {
        hidden: {
            x: direction === 'left' ? '-100%' : horizontalDirection,
            y: direction === 'up' ? '100%' : verticalDirection,
            opacity: 0,
        },
        show: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type,
                delay,
                duration,
                ease: 'easeOut',
            },
        },
    };
};

const staggerContainer = (staggerChildren: number, delayChildren: number):Variants => {
    return {
        hidden: {},
        show: {
            transition: {
                staggerChildren,
                delayChildren: delayChildren || 0,
            },
        },
    };
};

const dropIn = {
    hidden: {
        y: '200vh',
        opacity: 0,
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'smooth',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: '100vh',
        opacity: 0,
    },
};

const flip = {
    hidden: {
        transform: 'scale(0) rotateX(-360deg)',
        opacity: 0,
        transition: {
            delay: 0.3,
        },
    },
    visible: {
        transform: ' scale(1) rotateX(0deg)',
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
    exit: {
        transform: 'scale(0) rotateX(360deg)',
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const newspaper = {
    hidden: {
        transform: 'scale(0) rotate(720deg)',
        opacity: 0,
        transition: {
            delay: 0.3,
        },
    },
    visible: {
        transform: ' scale(1) rotate(0deg)',
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
    exit: {
        transform: 'scale(0) rotate(-720deg)',
        opacity: 0,
        transition: {
            duration: 0.3,
        },
    },
};

const badSuspension = {
    hidden: {
        y: '-100vh',
        opacity: 0,
        transform: 'scale(0) rotateX(-360deg)',
    },
    visible: {
        y: '-25vh',
        opacity: 1,
        transition: {
            duration: 0.2,
            type: 'spring',
            damping: 15,
            stiffness: 500,
        },
    },
    exit: {
        y: '-100vh',
        opacity: 0,
    },
};

const basicEaseIn = {
    visible: {
        opacity: 1,
        scale: 1,
    },
    hidden: {
        opacity: 0.0,
        scale: 0.0,
    },
};

export default {
    textVariant,
    fadeIn,
    zoomIn,
    slideIn,
    staggerContainer,
    dropIn,
    flip,
    badSuspension,
    newspaper,
    basicEaseIn,
};
