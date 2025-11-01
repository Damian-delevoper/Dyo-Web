#!/usr/bin/env python3
"""
Enhance images using ImageMagick advanced techniques
While not true AI upscaling, this uses sophisticated algorithms
"""
import subprocess
from pathlib import Path

def enhance_image(filepath, target_size="2000x1333"):
    """Enhance image with ImageMagick using best techniques"""
    try:
        backup = filepath.parent / f"{filepath.name}.backup"
        if not backup.exists():
            subprocess.run(['cp', str(filepath), str(backup)], check=True)
        
        temp = filepath.parent / f"{filepath.name}.temp"
        
        # Advanced enhancement pipeline
        cmd = [
            "magick", str(filepath),
            # Upscale with Lanczos (best quality for photos)
            "-filter", "Lanczos",
            "-resize", f"{target_size}^",
            "-gravity", "center",
            "-extent", target_size,
            # Sharpen intelligently
            "-unsharp", "0x0.75+0.75+0.008",  # Light sharpening
            "-unsharp", "0x0.5+0.5+0.005",    # Very light additional pass
            # Enhance contrast subtly
            "-sigmoidal-contrast", "3,50%",
            # Reduce noise
            "-noise", "Despeckle",
            # Optimize
            "-strip",
            "-interlace", "Plane",
            "-quality", "98",
            "-colorspace", "sRGB",
            "-define", "jpeg:dct-method=float",
            str(temp)
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
        
        if result.returncode == 0 and temp.exists():
            temp.replace(filepath)
            size_mb = filepath.stat().st_size / (1024 * 1024)
            return True, f"{target_size} ({size_mb:.2f}MB)"
        else:
            if temp.exists():
                temp.unlink()
            return False, result.stderr[:100] if result.stderr else "Failed"
            
    except Exception as e:
        return False, str(e)

def main():
    assets_dir = Path('www.dyo.com.tr/Content/assets/img')
    
    # Get all slider images
    slider_images = list(assets_dir.glob('*slider*.jpg')) + \
                   list(assets_dir.glob('*slider*.jpeg'))
    
    print("="*70)
    print("Image Enhancement with ImageMagick")
    print("="*70)
    print()
    print("Techniques:")
    print("  • Lanczos upscaling (best quality)")
    print("  • Advanced sharpening")
    print("  • Contrast enhancement")
    print("  • Noise reduction")
    print("  • 98% JPEG quality")
    print()
    
    if not slider_images:
        print("No slider images found!")
        return
    
    print(f"Found {len(slider_images)} images")
    print("Target size: 2000x1333 (3:2 ratio, larger than current 1350x900)")
    print()
    
    proceed = input("Proceed with enhancement? (y/n): ")
    if proceed.lower() != 'y':
        print("Cancelled.")
        return
    
    enhanced = 0
    errors = 0
    
    for img_path in slider_images:
        print(f"\nEnhancing: {img_path.name}...", end=' ')
        success, result = enhance_image(img_path)
        
        if success:
            print(f"✓ {result}")
            enhanced += 1
        else:
            print(f"✗ {result}")
            errors += 1
    
    print()
    print("="*70)
    print(f"Summary: {enhanced} enhanced, {errors} errors")
    print("="*70)

if __name__ == "__main__":
    main()

