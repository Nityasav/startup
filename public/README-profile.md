# How to Add Your Profile Image

To add your profile image to the About Us section, follow these steps:

1. **Prepare your image**:
   - Create a PNG or JPG image for your profile
   - Ideally, use a square image (e.g., 500x500 pixels)
   - Name your file with a simple name (e.g., `profile.png`)

2. **Add the image to the project**:
   - Place your image file in the `public` folder of the project
   - For example: `/public/profile.png`

3. **Update the AboutUs component**:
   - Open the file `src/components/AboutUs.tsx`
   - Find the line: `const IMAGE_PATH = "/profile.png";`
   - If needed, change the path to match your image's filename
   - For example, if you named your file `my-photo.jpg`, change it to: `const IMAGE_PATH = "/my-photo.jpg";`

4. **Edit your bio**:
   - In the same file, find the line that starts with: `const BIO_TEXT = "...";`
   - Replace the text with your own bio

5. **Save the file and refresh the website**:
   - The changes will take effect immediately after saving

That's it! Your profile image and bio will now be displayed in the About Us section of the website. 