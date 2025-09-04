// src/components/marketing-hub/ReviewMarketingSection.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReviewCarousel from "./ReviewCarousel";
import { Button } from "@/components/ui/button";
import { ShareIcon, DownloadIcon } from "lucide-react";

// Define types for our reviews
export interface Review {
  id: string;
  type: 'video' | 'text';
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    photo?: string;
  };
  content: string;
  tags: string[];
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  timestamp: Date;
}

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: "1",
    type: 'text',
    profile: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    content: "Amazing service! The team was professional and completed the work faster than expected. Highly recommended!",
    tags: ["Homeservices", "Satisfied", "Professional"],
    timestamp: new Date("2023-10-15")
  },
  {
    id: "2",
    type: 'video',
    profile: {
      firstName: "Sarah",
      lastName: "Smith",
      email: "sarah.smith@example.com"
    },
    content: "I've never been happier with a home service. They went above and beyond!",
    tags: ["quality", "excellent", "recommend"],
    media: {
      type: 'video',
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop"
    },
    timestamp: new Date("2023-10-10")
  },
  {
    id: "3",
    type: 'text',
    profile: {
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.johnson@example.com",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    content: "Fair pricing and excellent workmanship. Will definitely use again for future projects.",
    tags: ["fairpricing", "qualitywork", "reliable"],
    media: {
      type: 'image',
      url: "https://images.unsplash.com/photo-1585123388860-be6b28cb9c43?w=300&h=200&fit=crop"
    },
    timestamp: new Date("2023-10-05")
  }
];

const ReviewMarketingSection: React.FC = () => {
  const [caption, setCaption] = useState("Book trusted pros in minutes. #homeservices #localpros");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Simulate loading reviews from an API
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setReviews(sampleReviews);
      if (sampleReviews.length > 0) {
        setSelectedReview(sampleReviews[0]);
      }
    }, 500);
  }, []);

  const handleShareToShootak = async (review: Review) => {
    try {
      if (review.type === 'video' && review.media) {
        // For video reviews, share the video file
        console.log("Sharing video to Shootak:", review.media.url);
        // Implementation would use Shootak's SDK or API
      } else {
        // For text reviews, create and share a screenshot
        console.log("Sharing text review to Shootak");
        // Implementation would capture the review card as an image
      }

      // Show success message
      alert(`Review shared successfully to Shootak!`);
    } catch (error) {
      console.error("Failed to share to Shootak:", error);
      alert("Failed to share review. Please try again.");
    }
  };

  const handleDownload = (review: Review) => {
    if (review.type === 'video' && review.media) {
      // Download video logic
      const link = document.createElement('a');
      link.href = review.media.url;
      link.download = `review-${review.id}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // For text reviews, we'll simulate a download
      const element = document.createElement("a");
      const file = new Blob([review.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `review-${review.id}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-gradient-to-br from-primary/5 via-background to-background">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Customer Review–Based Marketing</CardTitle>
          {selectedReview && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(selectedReview)}
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                size="sm"
                onClick={() => handleShareToShootak(selectedReview)}
              >
                <ShareIcon className="h-4 w-4 mr-2" />
                Share to Shootak
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Turn your best reviews into eye-catching posts. Share them as ready-to-post images for Instagram/TikTok, or post directly to Shootak.
          </p>

          {reviews.length > 0 ? (
            <ReviewCarousel
              reviews={reviews}
              caption={caption}
              onCaptionChange={setCaption}
              onSelectReview={setSelectedReview}
            />
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">Loading reviews...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewMarketingSection;