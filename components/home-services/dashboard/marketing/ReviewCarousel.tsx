
import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon } from "lucide-react";
import { Review } from "./ReviewMarketingSection";
import Image from "next/image";

interface ReviewCarouselProps {
  reviews: Review[];
  caption: string;
  /* eslint-disable no-unused-vars */
  onCaptionChange: (caption: string) => void;
  onSelectReview: (review: Review) => void;
  /* eslint-enable no-unused-vars */

}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({
  reviews,
  caption,
  onSelectReview
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewCardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const nextReview = () => {
    const newIndex = (currentIndex + 1) % reviews.length;
    setCurrentIndex(newIndex);
    onSelectReview(reviews[newIndex]);
  };

  const prevReview = () => {
    const newIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    setCurrentIndex(newIndex);
    onSelectReview(reviews[newIndex]);
  };

  const downloadReviewAsImage = async () => {
    if (!reviewCardRef.current) return;

    setIsDownloading(true);
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Could not get canvas context');
      }

      // Get the review card element
      const cardElement = reviewCardRef.current;

      // Set canvas dimensions
      canvas.width = cardElement.offsetWidth;
      canvas.height = cardElement.offsetHeight;

      // Draw background
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the card background
      context.fillStyle = '#f8fafc';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw border
      context.strokeStyle = '#e2e8f0';
      context.lineWidth = 1;
      context.strokeRect(0, 0, canvas.width, canvas.height);

      // Draw content based on review type
      const padding = 24;
      let yPosition = padding;

      // Draw profile section
      const currentReview = reviews[currentIndex];

      // Draw profile image circle
      context.beginPath();
      context.arc(padding + 25, padding + 25, 25, 0, 2 * Math.PI);
      context.strokeStyle = '#e2e8f0';
      context.lineWidth = 2;
      context.stroke();
      context.fillStyle = '#f1f5f9';
      context.fill();

      // Draw initial inside circle
      context.fillStyle = '#64748b';
      context.font = 'bold 16px system-ui';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(
        currentReview.profile.firstName[0] + currentReview.profile.lastName[0],
        padding + 25,
        padding + 25
      );

      // Draw profile name and email
      context.fillStyle = '#1e293b';
      context.font = 'bold 18px system-ui';
      context.textAlign = 'left';
      context.fillText(
        `${currentReview.profile.firstName} ${currentReview.profile.lastName}`,
        padding + 60,
        padding + 15
      );

      context.fillStyle = '#64748b';
      context.font = '14px system-ui';
      context.fillText(
        currentReview.profile.email,
        padding + 60,
        padding + 35
      );

      yPosition += 60;

      // Draw stars
      context.fillStyle = '#fbbf24';
      for (let i = 0; i < 5; i++) {
        context.beginPath();
        context.moveTo(padding + i * 20, yPosition);
        context.lineTo(padding + 8 + i * 20, yPosition + 8);
        context.lineTo(padding + 16 + i * 20, yPosition);
        context.lineTo(padding + 12 + i * 20, yPosition + 12);
        context.lineTo(padding + 18 + i * 20, yPosition + 20);
        context.lineTo(padding + 8 + i * 20, yPosition + 16);
        context.lineTo(padding - 2 + i * 20, yPosition + 20);
        context.lineTo(padding + 4 + i * 20, yPosition + 12);
        context.lineTo(padding + i * 20, yPosition);
        context.fill();
      }

      // Draw rating text
      context.fillStyle = '#64748b';
      context.font = '14px system-ui';
      context.fillText('5.0', padding + 105, yPosition + 12);

      yPosition += 35;

      // Draw review content
      context.fillStyle = '#334155';
      context.font = '16px system-ui';

      // Simple text wrapping
      const words = currentReview.content.split(' ');
      let line = '';
      const lineHeight = 24;
      const maxWidth = canvas.width - (padding * 2);

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
          context.fillText(line, padding, yPosition);
          line = words[i] + ' ';
          yPosition += lineHeight;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, padding, yPosition);
      yPosition += lineHeight + 16;

      // Draw tags
      context.font = '12px system-ui';
      let xTagPosition = padding;

      currentReview.tags.forEach(tag => {
        const tagText = `#${tag}`;
        const tagWidth = context.measureText(tagText).width + 16;

        if (xTagPosition + tagWidth > maxWidth + padding) {
          xTagPosition = padding;
          yPosition += 30;
        }

        // Draw tag background
        context.fillStyle = '#dbeafe';
        context.beginPath();
        context.roundRect(xTagPosition, yPosition, tagWidth, 24, 12);
        context.fill();

        // Draw tag text
        context.fillStyle = '#1e40af';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(tagText, xTagPosition + (tagWidth / 2), yPosition + 12);

        xTagPosition += tagWidth + 8;
      });

      yPosition += 40;

      // Draw caption if available
      if (caption) {
        context.textAlign = 'left';
        context.fillStyle = '#64748b';
        context.font = 'italic 14px system-ui';

        const captionLines = caption.split('\n');
        captionLines.forEach(line => {
          context.fillText(line, padding, yPosition);
          yPosition += 20;
        });
      }

      // Convert canvas to image and download
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = `customer-review-${currentReview.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading review image:", error);
      alert("Failed to download image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No reviews available</p>
        </CardContent>
      </Card>
    );
  }

  const currentReview = reviews[currentIndex];

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={prevReview} disabled={reviews.length <= 1}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>

        <div className="flex-1 mx-4" ref={reviewCardRef}>
            <CardContent className="p-0">
              {currentReview.type === 'video' && currentReview.media ? (
                <div className="relative">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
                    <video
                      src={currentReview.media.url}
                      controls
                      className="w-full h-full object-contain"
                      poster={currentReview.media.thumbnail}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      {currentReview.profile.photo ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
                          <Image
                            src={currentReview.profile.photo}
                            alt={`${currentReview.profile.firstName} ${currentReview.profile.lastName}`}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0077B6] to-[#0077B6] flex items-center justify-center flex-shrink-0 border-2 border-white shadow-md">
                          <span className="text-white font-semibold text-lg">
                            {currentReview.profile.firstName[0]}{currentReview.profile.lastName[0]}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-gray-900 text-lg">
                          {currentReview.profile.firstName} {currentReview.profile.lastName}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">{currentReview.profile.email}</p>
                        <div className="flex items-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-gray-500 text-sm ml-2">5.0</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-4 leading-relaxed text-base">{currentReview.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {currentReview.tags.map(tag => (
                        <span key={tag} className="text-xs bg-[#0077B6] text-white px-3 py-1.5 rounded-full font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-6">
                    {currentReview.profile.photo ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
                        <Image
                          src={currentReview.profile.photo}
                          alt={`${currentReview.profile.firstName} ${currentReview.profile.lastName}`}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0077B6] to-[#0077B6] flex items-center justify-center flex-shrink-0 border-2 border-white shadow-md">
                        <span className="text-white font-semibold text-lg">
                          {currentReview.profile.firstName[0]}{currentReview.profile.lastName[0]}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        {currentReview.profile.firstName} {currentReview.profile.lastName}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">{currentReview.profile.email}</p>
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-gray-500 text-sm ml-2">5.0</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-4 leading-relaxed text-base">{currentReview.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentReview.tags.map(tag => (
                      <span key={tag} className="text-xs bg-[#0077B6] text-[#ffffff] px-3 py-1.5 rounded-full font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>
              )}
              {caption && (
                <div className="mt-6 pt-4 border-t border-gray-100 px-6 pb-6">
                  <p className="text-gray-600 text-sm italic">{caption}</p>
                </div>
              )}
            </CardContent>
        </div>

        <Button variant="outline" size="icon" onClick={nextReview} disabled={reviews.length <= 1}>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <div className="flex justify-center space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                onSelectReview(reviews[index]);
              }}
              className={`h-3 w-3 rounded-full transition-all ${index === currentIndex ? 'bg-[#0077B6] scale-125' : 'bg-gray-300'
                }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        <Button
          onClick={downloadReviewAsImage}
          disabled={isDownloading}
          className="flex items-center gap-2"
          variant="outline"
          size="sm"
        >
          <DownloadIcon className="h-4 w-4" />
          {isDownloading ? "Downloading..." : "Download to Share"}
        </Button>
      </div>


    </div>
  );
};

export default ReviewCarousel;