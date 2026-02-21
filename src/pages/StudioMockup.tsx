import { useState, useRef } from "react";
import { ImageIcon, Check, X, Settings, Sparkles, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CreatePostModal } from "@/components/CreatePostModal";
import { SamplePromptModal } from "@/components/SamplePromptModal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Demo generated images for mockup
import trenchCoat1 from "@/assets/trench-coat-1.jpg";
import trenchCoat2 from "@/assets/trench-coat-2.jpg";
import trenchCoat3 from "@/assets/trench-coat-3.jpg";
import trenchCoat4 from "@/assets/trench-coat-4.jpg";

export const StudioMockup = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showSamplePromptModal, setShowSamplePromptModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const referenceInputRef = useRef<HTMLInputElement>(null);

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

  const handleReferenceSelect = () => {
    referenceInputRef.current?.click();
  };

  const handleReferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setReferenceImage(ev.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSamplePrompt = () => {
    setShowSamplePromptModal(true);
  };

  const handleSelectSamplePrompt = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  const handleOptimizePrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }

    setIsOptimizing(true);
    try {
      const { data, error } = await supabase.functions.invoke("optimize-prompt", {
        body: {
          prompt,
          hasReferenceImage: !!referenceImage,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.optimizedPrompt) {
        setPrompt(data.optimizedPrompt);
        toast.success("Prompt optimized!");
      }
    } catch (error) {
      console.error("Error optimizing prompt:", error);
      toast.error("Failed to optimize prompt. Please try again.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation with demo images
    setTimeout(() => {
      setGeneratedImages([trenchCoat1, trenchCoat2, trenchCoat3, trenchCoat4]);
      setIsGenerating(false);
    }, 1500);
  };

  const toggleImageSelection = (index: number) => {
    setSelectedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const hasImages = uploadedImages.length > 0;
  const hasGeneratedImages = generatedImages.length > 0;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Stunning Fashion Mockups for Your Collection
          </h1>
          <p className="text-muted-foreground">
            Upload your product images to generate editorial-quality mockups for your fashion brand.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
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

        {/* Part 2: Instructions Prompt - Only show when images are uploaded */}
        {hasImages && (
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono text-sm tracking-widest text-foreground">
                2. INSTRUCTIONS PROMPT
              </h2>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${prompt ? 'bg-primary' : 'bg-muted'}`}>
                <Check className={`w-4 h-4 ${prompt ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
              </div>
            </div>

            {/* Settings Bar */}
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-muted px-3 py-1.5 rounded-md text-sm text-muted-foreground font-mono">
                gemini-3-pro-image-preview | 4:5 | 1080p | 2 images/gen
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                Setting
              </Button>
            </div>

            {/* Reference Image and Prompt */}
            <div className="flex gap-4">
              {/* Reference Image Picker */}
              <div className="w-48 shrink-0">
                <div 
                  onClick={handleReferenceSelect}
                  className="aspect-[4/5] bg-muted/50 rounded-lg border border-border flex items-center justify-center cursor-pointer hover:bg-muted transition-colors overflow-hidden"
                >
                  {referenceImage ? (
                    <img src={referenceImage} alt="Reference" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={handleReferenceSelect}
                >
                  Choose a Reference Image
                </Button>
                <input
                  ref={referenceInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleReferenceChange}
                  className="hidden"
                />
              </div>

              {/* Prompt Area */}
              <div className="flex-1 flex flex-col">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe how you want the mockup to look..."
                  className="flex-1 min-h-[160px] resize-none bg-muted/30 border-border"
                />
                
                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleOptimizePrompt}
                    disabled={isOptimizing || !prompt.trim()}
                    className="gap-2"
                  >
                    {isOptimizing && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isOptimizing ? "Optimizing..." : "Optimize Prompt"}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2" onClick={handleSamplePrompt}>
                    <FileText className="w-4 h-4" />
                    Sample Prompt
                  </Button>
                  <Button 
                    size="sm" 
                    className="ml-auto gap-2 bg-foreground text-background hover:bg-foreground/90"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    <Sparkles className="w-4 h-4" />
                    {isGenerating ? "Generating..." : "Generate"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Part 3: Generated Output - Only show after generation */}
        {hasGeneratedImages && (
          <div className="bg-card rounded-xl border border-border p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono text-sm tracking-widest text-foreground">
                3. GENERATED OUTPUT
              </h2>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedImages.size > 0 ? 'bg-primary' : 'bg-muted'}`}>
                <Check className={`w-4 h-4 ${selectedImages.size > 0 ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Select the images you want to use for your post
            </p>

            {/* Generated Images Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {generatedImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImages.has(index) 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-border hover:border-muted-foreground/50'
                  }`}
                  onClick={() => toggleImageSelection(index)}
                >
                  <img 
                    src={img} 
                    alt={`Generated ${index + 1}`}
                    className="w-full aspect-[4/5] object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Checkbox 
                      checked={selectedImages.has(index)}
                      onCheckedChange={() => toggleImageSelection(index)}
                      className="bg-background/80 backdrop-blur-sm"
                    />
                  </div>
                  {selectedImages.has(index) && (
                    <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                  )}
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="flex justify-end">
              <Button 
                disabled={selectedImages.size === 0}
                className="gap-2"
                onClick={() => setShowCreatePostModal(true)}
              >
                Create Post from Selection ({selectedImages.size})
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showCreatePostModal && (
        <CreatePostModal
          media={Array.from(selectedImages).map(i => generatedImages[i])}
          onClose={() => setShowCreatePostModal(false)}
        />
      )}

      {/* Sample Prompt Modal */}
      {showSamplePromptModal && (
        <SamplePromptModal
          onClose={() => setShowSamplePromptModal(false)}
          onSelect={handleSelectSamplePrompt}
        />
      )}
    </div>
  );
};
