import os
from PIL import Image, ImageDraw, ImageFont

# Configuration
APP_DIR = r"D:\pali-dhatu-app"
PUBLIC_DIR = os.path.join(APP_DIR, "public")
LOGO_COLOR = (39, 174, 96) # #27ae60
LOGO_COLOR_2 = (46, 204, 113) # #2ecc71
TEXT_COLOR = (255, 255, 255)

def create_icon(size):
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Draw rounded rectangle (simulated gradient)
    # Since complex gradients are hard, we'll use a solid fill with the primary color
    # or we can try a simple vertical gradient manually, but solid is safer and cleaner.
    
    # Rounded corners
    radius = size // 5
    draw.rounded_rectangle([(0, 0), (size, size)], radius=radius, fill=LOGO_COLOR)

    # Draw Root Symbol "√"
    # Manual path for better control than font
    # Proportions based on size
    w = size
    h = size
    
    # Points for Root symbol
    # 1. Start (left mid)
    p1 = (w * 0.15, h * 0.55)
    # 2. Bottom of V
    p2 = (w * 0.35, h * 0.75)
    # 3. Top of V
    p3 = (w * 0.55, h * 0.25)
    # 4. End of Bar (right top)
    p4 = (w * 0.85, h * 0.25)

    # Line width
    stroke = int(size * 0.08)

    # Join type is not directly supported in simple line, so we draw multiple lines with round endings
    draw.line([p1, p2], fill=TEXT_COLOR, width=stroke, joint='curve')
    draw.line([p2, p3], fill=TEXT_COLOR, width=stroke, joint='curve')
    draw.line([p3, p4], fill=TEXT_COLOR, width=stroke, joint='curve')
    
    # Make it look joined properly
    draw.ellipse((p2[0]-stroke/2, p2[1]-stroke/2, p2[0]+stroke/2, p2[1]+stroke/2), fill=TEXT_COLOR)
    draw.ellipse((p3[0]-stroke/2, p3[1]-stroke/2, p3[0]+stroke/2, p3[1]+stroke/2), fill=TEXT_COLOR)

    # Add text "Pali" below? No, keep it simple symbol.

    return img

def main():
    print("Generating icons...")
    
    # 1. Generate logo512.png
    icon512 = create_icon(512)
    icon512.save(os.path.join(PUBLIC_DIR, "logo512.png"))
    print("Saved logo512.png")

    # 2. Generate logo192.png
    icon192 = icon512.resize((192, 192), Image.Resampling.LANCZOS)
    icon192.save(os.path.join(PUBLIC_DIR, "logo192.png"))
    print("Saved logo192.png")

    # 3. Generate favicon.ico (include multiple sizes)
    icon64 = icon512.resize((64, 64), Image.Resampling.LANCZOS)
    icon32 = icon512.resize((32, 32), Image.Resampling.LANCZOS)
    icon16 = icon512.resize((16, 16), Image.Resampling.LANCZOS)
    icon512.save(
        os.path.join(PUBLIC_DIR, "favicon.ico"),
        format='ICO',
        sizes=[(64, 64), (32, 32), (16, 16)]
    )
    print("Saved favicon.ico")

    # 4. Update index.html
    index_path = os.path.join(PUBLIC_DIR, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace Title
    content = content.replace("<title>React App</title>", "<title>คลังธาตุบาลี (Pali Roots)</title>")
    
    # Replace Meta Description
    content = content.replace(
        'content="Web site created using create-react-app"', 
        'content="คลังธาตุบาลี (Pali Roots) - รวบรวมธาตุจากคัมภีร์ธาตวัตถสังคหะและธาตุปฺปทีปิกา พร้อมระบบค้นหาและบัตรคำทบทวน"'
    )

    # Replace Theme Color
    content = content.replace('content="#000000"', 'content="#27ae60"')

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated index.html")

if __name__ == "__main__":
    main()
