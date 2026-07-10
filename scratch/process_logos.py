from PIL import Image

def process_mulearn():
    img = Image.open('public/mulearn_logo.png').convert('RGBA')
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        r, g, b, a = item
        # If the pixel is close to white background (R, G, B > 240) or transparent
        if r > 240 and g > 240 and b > 240 or a == 0:
            new_data.append((0, 0, 0, 0)) # transparent
        else:
            # It's the blue text. Let's make it pure white for dark theme
            new_data.append((255, 255, 255, a))
            
    img.putdata(new_data)
    img.save('public/mulearn_logo.png', 'PNG')
    print("mulearn_logo.png processed.")

def process_efootball():
    img = Image.open('public/efootball_logo.png').convert('RGBA')
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        r, g, b, a = item
        # The eFootball circular logo is white, background is colored.
        # Let's check if the pixel is close to white. We can check if min(r, g, b) > 200
        # which means it has high intensity in all channels (white/light grey).
        if r > 200 and g > 200 and b > 200:
            # Keep as white
            new_data.append((255, 255, 255, a))
        else:
            # Key out the background
            new_data.append((0, 0, 0, 0))
            
    img.putdata(new_data)
    img.save('public/efootball_logo.png', 'PNG')
    print("efootball_logo.png processed.")

if __name__ == '__main__':
    process_mulearn()
    process_efootball()
