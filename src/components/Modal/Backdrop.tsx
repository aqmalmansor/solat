import React from 'react';
import { motion } from 'framer-motion';

interface BackdropComponentProps {
    children: React.ReactNode;
    onClick: () => void;
}

const Backdrop = ({ children, onClick }:BackdropComponentProps):JSX.Element => {
    return (
        <motion.div
            onClick={onClick}
            className='flex overflow-y-hidden justify-center items-center bg-[#000000E1] top-0 bottom-0 left-0 right-0 h-screen w-screen fixed z-[1000]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
};

export default Backdrop;
