import React from 'react';
import { Variants, motion } from 'framer-motion';
import SVG from 'react-inlinesvg';

import Button from 'components/Button';
import Backdrop from './Backdrop';

import Motion from 'utils/motion';

import Icons from 'assets/icons';

interface ModalComponentProps {
    variants?: Variants;
    children: React.ReactNode;
    onClick: () => void;
}

const Modal = ({ onClick, children, variants }: ModalComponentProps):JSX.Element => {
    const modalAnimation = variants !== undefined ? variants : undefined;

    return (
        <Backdrop onClick={onClick}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className='flex flex-col rounded-[20px] bg-white items-center m-auto min-h-[min(50%,300px)] w-[90%] max-w-[600px]'
                variants={modalAnimation}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                <div className='absolute top-0 right-0'>
                    <Button
                        label={(
                            <SVG
                                src={Icons.Cancel}
                                fill='#7E7E7E'
                                width={20}
                                height={20}
                            />
                        )}
                        fill={false}
                        type='p-3 inline-flex items-center justify-center cursor-pointer'
                        onClick={() => onClick()}
                    />
                </div>
                {children}
            </motion.div>
        </Backdrop>
    );
};

Modal.defaultProps = {
    variants: Motion.dropIn,
};

export default Modal;
