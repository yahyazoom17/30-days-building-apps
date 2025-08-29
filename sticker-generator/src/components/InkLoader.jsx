// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const InkLoader = ({ label = "Generating..." }) => {
  const dots = [0, 1, 2];

  return (
    <div className="h-64 grid place-items-center">
      <div className="flex flex-col items-center">
        <div className="flex gap-2">
          {dots.map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-indigo-600 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.95, delay: i * 0.3 }}
            />
          ))}
        </div>
        <p className="text-gray-600 font-semibold mt-2">{label}</p>
      </div>
    </div>
  );
};

export default InkLoader;
