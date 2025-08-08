import { motion } from "framer-motion";
import React from "react";

const Square = ({ value, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      className="w-[90px] h-[90px] bg-[#1e293b] flex font-bold text-4xl items-center justify-center rounded"
    >
      <p>{value}</p>
    </motion.button>
  );
};

export default Square;
