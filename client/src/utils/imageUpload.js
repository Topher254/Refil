// Image upload utility for development
// In production, this would integrate with services like Cloudinary, AWS S3, etc.

export const handleImageUpload = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('File must be an image'));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error('File size must be less than 5MB'));
      return;
    }

    // For development, create a local URL
    // In production, upload to cloud storage and return the URL
    const reader = new FileReader();
    reader.onload = () => {
      // Create a placeholder URL for development
      const imageUrl = reader.result;
      
      // Simulate upload delay
      setTimeout(() => {
        resolve({
          url: imageUrl,
          filename: file.name,
          size: file.size,
          type: file.type
        });
      }, 1000);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

export const getImagePlaceholder = (category, brand, size) => {
  // Generate placeholder images based on product details
  const baseUrl = 'https://via.placeholder.com';
  const width = 300;
  const height = 300;
  
  let text = `${category}`;
  if (brand) text += ` - ${brand}`;
  if (size) text += ` (${size})`;
  
  const encodedText = encodeURIComponent(text);
  return `${baseUrl}/${width}x${height}/f0f0f0/666666?text=${encodedText}`;
};

export const validateImage = (file) => {
  const errors = [];
  
  if (!file) {
    errors.push('Please select an image file');
    return errors;
  }
  
  if (!file.type.startsWith('image/')) {
    errors.push('File must be an image (JPEG, PNG, GIF, etc.)');
  }
  
  if (file.size > 5 * 1024 * 1024) {
    errors.push('File size must be less than 5MB');
  }
  
  return errors;
};
