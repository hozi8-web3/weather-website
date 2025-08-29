import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-64">
            <motion.div
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    border: '4px solid rgba(255, 255, 255, 0.2)',
                    borderTop: '4px solid white',
                }}
                animate={{ rotate: 360 }}
                transition={{
                    // FIX: 'loop' is not a valid property. Use 'repeat' for infinite animations.
                    repeat: Infinity,
                    ease: "linear",
                    duration: 1,
                }}
            />
        </div>
    );
};

export default Loader;