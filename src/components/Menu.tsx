import React, { useRef } from "react";
import { motion, useAnimation, useCycle } from "framer-motion"
import SVG from "react-inlinesvg";
import icons from "../assets/icons";


interface MenuProps {
    children?: React.ReactNode | React.ReactNode[];
}

const Menu = ({ children }: MenuProps) => {

    const controls = useAnimation();
    const [isActive, setActive] = useCycle(false, true);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === menuRef.current) {
            controls.start({ y: isActive ? 0 : 230 });
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
                className="bg-neutral rounded-t-3xl w-full h-full flex flex-col items-center justify-end py-10 gap-5 relative"
            >
                <motion.div
                    initial={{ y: 0 }}
                    animate= { {rotate: isActive ? 0 : 180 }}
                    transition={{ duration: 0.5,  ease: 'easeInOut' }}
                    className="absolute right-7 top-4"
                >
                    <SVG
                        src={icons.ChevronUpSVG}
                        height={25}
                        width={25}
                    />
                </motion.div>
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
