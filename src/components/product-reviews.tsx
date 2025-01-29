"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  ArrowRight,
  Flag,
  MessageSquare,
  MoreVertical,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Review } from "@prisma/client";

export function ProductReviews({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews?productId=${productId}`);
    const data = await res.json();
    setReviews(data);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please sign in to post a review",
      });
      return;
    }

    if (editingReview) {
      await handleEditReview(e);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(
        `/api/reviews?productId=${productId}&userEmail=${session.user?.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating,
            comment,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit review");

      await fetchReviews();
      setShowReviewDialog(false);
      setRating(0);
      setComment("");

      toast({
        title: "Success",
        description: "Review submitted successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit review",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const response = await fetch(
        `/api/reviews/${reviewId}?userEmail=${session?.user?.email}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete review");

      await fetchReviews();
      toast({
        title: "Success",
        description: "Review deleted successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete review",
      });
    }
  };

  const handleEditReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !editingReview) return;
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `/api/reviews/${editingReview.id}?productId=${productId}&userEmail=${session.user?.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating,
            comment,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update review");

      await fetchReviews();
      setShowReviewDialog(false);
      setEditingReview(null);
      setRating(0);
      setComment("");

      toast({
        title: "Success",
        description: "Review updated successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update review",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setShowReviewDialog(false);
    setEditingReview(null);
    setRating(0);
    setComment("");
  };

  return (
    <div>
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-semibold">{review.userEmail}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < review.rating
                              ? "fill-primary"
                              : "fill-muted stroke-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    {session?.user?.email === review.userEmail ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingReview(review);
                              setRating(review.rating);
                              setComment(review.comment);
                              setShowReviewDialog(true);
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Comment
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Flag className="mr-2 h-4 w-4" />
                            Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {review.comment}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center">No reviews found</div>
        )}
      </div>
      <hr className="my-4" />
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowReviewDialog(true)}
      >
        Post Review
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>

      <Dialog open={showReviewDialog} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingReview ? "Edit Review" : "Write a Review"}
            </DialogTitle>
            <DialogDescription>
              Share your thoughts about this product
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className="hover:scale-110 transition"
                    onClick={() => setRating(index + 1)}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        index < rating
                          ? "fill-primary"
                          : "fill-muted stroke-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button 
              type="submit"
              variant="default"
               disabled={isSubmitting}>
                {isSubmitting
                  ? "Submitting..."
                  : editingReview
                  ? "Update Review"
                  : "Post Review"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
