from PIL import Image
import os
import glob

input_dir = '/Volumes/APFS/project/SanGuoPai/public/assets/avatars/'
output_dir = '/Volumes/APFS/project/SanGuoPai/public/assets/cards/'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

def find_edge(pixels, w, h, axis='left', threshold=60):
    """
    Finds the edge of the card by scanning for dark pixels.
    """
    if axis == 'left':
        # Scan columns from left to right
        for x in range(w // 2):
            # Check a few vertical slices to avoid noise
            dark_count = 0
            for y_percent in [0.2, 0.4, 0.6, 0.8]:
                y = int(h * y_percent)
                r, g, b = pixels[x, y][:3]
                # Luminance formula (approximate)
                if (r + g + b) / 3 < threshold:
                    dark_count += 1
            if dark_count >= 2: # At least half the samples are dark
                return x
    elif axis == 'right':
        for x in range(w - 1, w // 2, -1):
            dark_count = 0
            for y_percent in [0.2, 0.4, 0.6, 0.8]:
                y = int(h * y_percent)
                r, g, b = pixels[x, y][:3]
                if (r + g + b) / 3 < threshold:
                    dark_count += 1
            if dark_count >= 2:
                return x
    elif axis == 'top':
        for y in range(h // 2):
            dark_count = 0
            for x_percent in [0.3, 0.5, 0.7]:
                x = int(w * x_percent)
                r, g, b = pixels[x, y][:3]
                if (r + g + b) / 3 < threshold:
                    dark_count += 1
            if dark_count >= 2:
                return y
    elif axis == 'bottom':
        for y in range(h - 1, h // 2, -1):
            dark_count = 0
            for x_percent in [0.3, 0.5, 0.7]:
                x = int(w * x_percent)
                r, g, b = pixels[x, y][:3]
                if (r + g + b) / 3 < threshold:
                    dark_count += 1
            if dark_count >= 2:
                return y
    return None

files = glob.glob(os.path.join(input_dir, '*_sexy_pixel.png'))
print(f"Found {len(files)} images.")

for filepath in files:
    filename = os.path.basename(filepath)
    output_name = filename.replace('_sexy_pixel.png', '_card.png')
    output_path = os.path.join(output_dir, output_name)
    
    try:
        img = Image.open(filepath)
        w, h = img.size
        pixels = img.load()
        
        left = find_edge(pixels, w, h, 'left')
        right = find_edge(pixels, w, h, 'right')
        top = find_edge(pixels, w, h, 'top')
        bottom = find_edge(pixels, w, h, 'bottom')
        
        if all(x is not None for x in [left, right, top, bottom]):
            # Add a small 1-pixel margin to be safe or just use it
            card = img.crop((left, top, right + 1, bottom + 1))
            card.save(output_path)
            print(f"Processed {filename}: ({left}, {top}, {right}, {bottom})")
        else:
            print(f"Failed to find edges for {filename}")
            
    except Exception as e:
        print(f"Error processing {filename}: {e}")

print("Batch processing complete.")
