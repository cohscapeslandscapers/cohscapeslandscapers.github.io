# Landscaping Website - Adding Your Own Images

## How to Add Your Own Images

I've created a folder structure for organizing your images. Here's how to add your own project photos:

### Folder Structure
```
images/
├── garden/          # Garden design projects (40 images)
├── hardscape/       # Hardscaping projects (30 images)  
├── lawn/           # Lawn care projects (25 images)
├── trees/          # Tree & plant projects (25 images)
├── outdoor/        # Outdoor living images (1 poster image)
└── videos/         # Project videos (1 video)
```

### Adding Your Images

1. **Garden Design Images (40 total)**
   - Place your garden project photos in `images/garden/`
   - Name them: `garden-01.jpg`, `garden-02.jpg`, etc.
   - Update the titles and descriptions in `script.js`

2. **Hardscaping Images (30 total)**
   - Place your hardscaping photos in `images/hardscape/`
   - Name them: `hardscape-01.jpg`, `hardscape-02.jpg`, etc.

3. **Lawn Care Images (25 total)**
   - Place your lawn care photos in `images/lawn/`
   - Name them: `lawn-01.jpg`, `lawn-02.jpg`, etc.

4. **Tree & Plant Images (25 total)**
   - Place your tree/plant photos in `images/trees/`
   - Name them: `trees-01.jpg`, `trees-02.jpg`, etc.

5. **Video (1 total)**
   - Place your project video in `videos/`
   - Name it: `outdoor-living-project.mp4`
   - Add a poster image: `images/outdoor/outdoor-poster.jpg`

### Customizing Project Details

In `script.js`, you can customize each project by editing:
- `title`: The project name
- `description`: Brief description of the work
- `src`: Path to your image/video file

### Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 1200px wide for best quality
- **Aspect Ratio**: Mixed ratios work well (landscape, portrait, square)
- **File Size**: Keep under 2MB per image for fast loading

### Video Requirements

- **Format**: MP4 (H.264 codec recommended)
- **Duration**: 30 seconds to 2 minutes ideal
- **Resolution**: 1080p recommended
- **File Size**: Keep under 50MB

### Quick Start

1. Add your first few images to test:
   ```
   images/garden/garden-01.jpg
   images/hardscape/hardscape-01.jpg
   images/lawn/lawn-01.jpg
   ```

2. Refresh the website to see your images appear

3. Continue adding more images following the naming convention

The gallery will automatically display your images with the filtering and lightbox functionality intact!