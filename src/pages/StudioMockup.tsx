import { useState, useRef } from "react";
import { ImageIcon, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StudioMockup = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImages(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const hasImages = uploadedImages.length > 0;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Realistic Merchandise Mockups for Your Product
          </h1>
          <p className="text-muted-foreground">
            Upload your product images to generate realistic mockups for your brand.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-mono text-sm tracking-widest text-foreground">
              1. UPLOAD PRODUCT IMAGE
            </h2>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${hasImages ? 'bg-primary' : 'bg-muted'}`}>
              <Check className={`w-4 h-4 ${hasImages ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
            </div>
          </div>

          <div className="text-sm text-muted-foreground mb-4 space-y-1">
            <p>*You need at least one product image to start</p>
            <p>*For the best results, try to stick to one specific product type and include photos from as many angles as possible</p>
          </div>

          {/* Uploaded Images Preview */}
          {hasImages && (
            <div className="flex gap-3 mb-4 flex-wrap">
              {uploadedImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={img} 
                    alt={`Uploaded ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg border border-border"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-destructive-foreground" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 transition-colors ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-muted-foreground/50'
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Upload Actions */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="text-sm text-muted-foreground">Drag and drop to upload or</span>
            <Button 
              variant="outline" 
              onClick={handleFileSelect}
              className="font-medium"
            >
              Select from Asset
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};
