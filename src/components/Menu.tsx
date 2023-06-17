import React, { useRef } from "react";
import { motion, useAnimation, useCycle } from "framer-motion"

interface MenuProps {
    children?: React.ReactNode | React.ReactNode[];
}

const Menu = ({ children }: MenuProps) => {

    const controls = useAnimation();
    const [isActive, setActive] = useCycle(false, true);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === menuRef.current) {
            controls.start({ y: isActive ? 0 : 250 });
            setActive();
        }
    };
    
    return(
        <motion.div
            initial={{ y: 0 }}
            animate={controls}
            transition={{ duration: 0.5,  ease: 'easeInOut' }}
            style={{width: '100%'}}
        >
            <div
                ref={menuRef}
                onClick={(e) => handleClick(e)}
                className="bg-neutral rounded-t-3xl w-full h-menu flex flex-col items-center justify-end py-10 gap-5"
            >
                 {React.Children.map(children, (child) =>
                    React.cloneElement(child as React.ReactElement<any>, {
                        onClick: (e: React.MouseEvent) => e.stopPropagation()
                    })
                )}
            </div>
        </motion.div>
    );
};

export default Menu;
