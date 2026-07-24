import sys
from rembg import remove
from PIL import Image

def process_image(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        with open(input_path, 'rb') as i:
            input_data = i.read()
        
        output_data = remove(input_data)
        
        with open(output_path, 'wb') as o:
            o.write(output_data)
        print(f"Successfully saved cutout to {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python process_bg.py <input> <output>")
        sys.exit(1)
    
    process_image(sys.argv[1], sys.argv[2])
