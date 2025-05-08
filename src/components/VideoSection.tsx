import { useEffect } from "react";
import { motion } from "framer-motion";

const VideoSection = () => {
  useEffect(() => {
    console.log("VideoSection mounted");
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-blue-950">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text"
          >
            See Venturly in Action
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300"
          >
            Watch how our AI platform transforms your business operations
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl bg-black"
        >
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/jTW8vPqLVwo"
            title="Venturly Platform Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection; 