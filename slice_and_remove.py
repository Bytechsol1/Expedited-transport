import os
from PIL import Image
from rembg import remove

def process_collage(input_path, output_dir):
    try:
        print(f"Loading {input_path}")
        img = Image.open(input_path)
        w, h = img.size
        print(f"Image size: {w}x{h}")
        
        # 3 columns, 2 rows
        col_w = w // 3
        row_h = h // 2
        
        names = [
            "expedited", "freight-transportation", "carrier",
            "ltl", "logistics", "freight-shipping"
        ]
        
        for i in range(6):
            row = i // 3
            col = i % 3
            
            box = (col * col_w, row * row_h, (col + 1) * col_w, (row + 1) * row_h)
            slice_img = img.crop(box)
            
            # The slices have text at the bottom. We should crop the text out if possible, 
            # but let's just let rembg handle it. Rembg might remove the text because it focuses on the main object!
            
            print(f"Removing background for {names[i]}...")
            output_img = remove(slice_img)
            
            out_path = os.path.join(output_dir, f"{names[i]}.png")
            output_img.save(out_path)
            print(f"Saved {out_path}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    input_file = r"C:\Users\HIJAZ TR\.gemini\antigravity\brain\db8f430b-f890-44c8-977a-6596edbb60a7\media__1784926566127.png"
    output_dir = r"e:\Expedited-transport\public\images"
    process_collage(input_file, output_dir)
