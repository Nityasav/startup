import { motion } from "framer-motion";

// ========== EDIT THIS SECTION ==========
// 1. Add your image to the public folder (e.g., "public/profile.png")
// 2. Update the IMAGE_PATH to point to your image
// 3. Edit the BIO_TEXT with your information
const IMAGE_PATH = "/profile.png"; // Place your image in the public folder and update this path
const BIO_TEXT = "Hey! I am Nitya, and I love startups and technology. I always wanted to start my own business which would help me but also other people, through a B2B business. Venturly is an idea which many businesses need, and will need in the future. I hope to make this a full edged business, and hopefully make it successful enough to become an actual startup.";
// ======================================

const AboutUs = () => {
  return (
    <section 
      id="about" 
      className="min-h-screen py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #000, #0c1527, #000)"
      }}
    >
      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text"
          >
            About Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300"
          >
            The team behind Venturly
          </motion.p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative w-64 h-64 rounded-full overflow-hidden bg-blue-900/20 border-2 border-blue-500/50 flex items-center justify-center"
          >
            <img 
              src={IMAGE_PATH} 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="p-6 rounded-xl bg-blue-900/10 border border-blue-900/30">
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {BIO_TEXT}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 