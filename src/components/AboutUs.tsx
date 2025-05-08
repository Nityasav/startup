import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, User, Save, Edit } from "lucide-react";
import axios from "axios";

// This would typically come from an environment variable
const API_ENDPOINT = "/api/profile";

const AboutUs = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bio, setBio] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load profile data
  useEffect(() => {
    // In a production app, this would be an API call
    // For now, we'll use a static path
    const loadProfileData = async () => {
      setIsLoading(true);
      try {
        // Check for cached image in localStorage first
        const cachedImage = localStorage.getItem("profile_image");
        const cachedBio = localStorage.getItem("profile_bio");
        
        if (cachedImage) {
          setImage(cachedImage);
        } else {
          // Try to load default image if no cached image
          try {
            const imageResponse = await fetch("/profile_image.jpg");
            if (imageResponse.ok) {
              const blob = await imageResponse.blob();
              const imageUrl = URL.createObjectURL(blob);
              setImage(imageUrl);
              localStorage.setItem("profile_image", imageUrl);
            }
          } catch (error) {
            console.log("No default profile image found");
          }
        }
        
        if (cachedBio) {
          setBio(cachedBio);
        } else {
          setBio("We are passionate about empowering businesses with AI solutions that transform operations and drive growth. Our team combines deep technical expertise with business acumen to deliver solutions that make a real impact.");
          localStorage.setItem("profile_bio", "We are passionate about empowering businesses with AI solutions that transform operations and drive growth. Our team combines deep technical expertise with business acumen to deliver solutions that make a real impact.");
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfileData();
    
    // Check for admin mode - in a real app, this would be a proper auth check
    const checkAdmin = () => {
      // For demo purposes: press Command+Shift+A to toggle admin mode (Mac friendly)
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.metaKey && e.shiftKey && e.key === "a") {
          setIsAdmin(prev => !prev);
          console.log("Admin mode:", !isAdmin);
        }
      };
      
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    };
    
    const cleanup = checkAdmin();
    return cleanup;
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImage(result);
        // Store in localStorage for persistence between refreshes
        localStorage.setItem("profile_image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBio = event.target.value;
    setBio(newBio);
    // Store in localStorage for persistence between refreshes
    localStorage.setItem("profile_bio", newBio);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // In a real app, this would be an API call to save the data to the server
    try {
      // Simulating an API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For a real implementation, you would do:
      // const formData = new FormData();
      // if (imageFile) formData.append("image", imageFile);
      // formData.append("bio", bio);
      // await axios.post(API_ENDPOINT, formData);
      
      console.log("Saved profile data");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile data:", error);
      alert("Failed to save profile data. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

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
          
          {isAdmin && (
            <div className="mt-4 inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full">
              <span className="text-blue-400 text-sm font-medium">Admin Mode Active</span>
              <span className="ml-2 text-xs text-blue-300/70">(Press ⌘+Shift+A to toggle)</span>
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative w-64 h-64 rounded-full overflow-hidden bg-blue-900/20 border-2 border-blue-500/50 flex items-center justify-center"
            >
              {image ? (
                <>
                  <img src={image} alt="Profile" className="w-full h-full object-cover" />
                  {isAdmin && (
                    <div 
                      className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="text-white text-center">
                        <Edit size={24} className="mx-auto mb-2" />
                        <span>Change Photo</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div 
                  className={`flex flex-col items-center justify-center text-blue-400 ${isAdmin ? 'cursor-pointer' : ''}`}
                  onClick={() => isAdmin && fileInputRef.current?.click()}
                >
                  <User size={48} />
                  {isAdmin ? (
                    <>
                      <span className="mt-2 text-sm font-medium">Click to add photo</span>
                      <Upload size={16} className="mt-2" />
                    </>
                  ) : (
                    <span className="mt-2 text-sm font-medium">No profile photo</span>
                  )}
                </div>
              )}
              {isAdmin && (
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="relative">
                {!isEditing ? (
                  <div className="p-6 rounded-xl bg-blue-900/10 border border-blue-900/30">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                      {isAdmin && (
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="p-2 rounded-lg hover:bg-blue-900/30 text-blue-400"
                        >
                          <Edit size={18} />
                        </button>
                      )}
                    </div>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{bio}</p>
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-blue-900/10 border border-blue-900/30">
                    <h3 className="text-2xl font-bold text-white mb-4">Edit Our Mission</h3>
                    <textarea
                      value={bio}
                      onChange={handleBioChange}
                      className="w-full h-40 bg-black/50 border border-blue-900/50 rounded-lg p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your bio here..."
                    />
                    <div className="mt-4 flex justify-end gap-2">
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-blue-700 text-blue-400 hover:bg-blue-900/20 rounded-lg"
                        disabled={isSaving}
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={16} />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
        
        {isAdmin && (
          <div className="mt-12 max-w-xl mx-auto bg-blue-900/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-blue-400 font-medium mb-2">Admin Instructions</h4>
            <p className="text-slate-300 text-sm mb-2">
              Changes made in admin mode are saved to local storage for demonstration purposes. In a production environment, these would be saved to a database.
            </p>
            <p className="text-slate-300 text-sm">
              • Press <span className="bg-blue-900/30 px-1 rounded">⌘+Shift+A</span> to toggle admin mode<br />
              • Admin mode allows editing the profile photo and bio<br />
              • Changes persist between page refreshes via localStorage
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutUs; 