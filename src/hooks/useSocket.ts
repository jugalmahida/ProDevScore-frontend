import { useEffect } from "react";
import { useReviewStore } from "@/store/reviewStore";
import { socketService } from "@/services/socketService";

export const useSocket = () => {
  const {
    setSocket,
    setSocketId,
    setIsReviewing,
    setReviewProgress,
    setFinalResults,
  } = useReviewStore();

  useEffect(() => {
    const socket = socketService.connect({
      onConnect: (socketId) => {
        setSocketId(socketId);
        setSocket(socket);
      },
      onReviewStarted: () => {
        setIsReviewing(true);
      },
      onReviewProgress: (data) => {
        setReviewProgress(data);
      },
      onReviewError: (data) => {
        console.error("Review error:", data);
      },
      onReviewDone: (data) => {
        setFinalResults(data);
        setIsReviewing(false);
        setReviewProgress(null);
      },
      onDisconnect: () => {
        console.log("Socket disconnected");
      },
      onConnectError: (error) => {
        console.error("Socket connection error:", error);
      },
    });

    return () => {
      socketService.disconnect();
    };
  }, [
    setSocket,
    setSocketId,
    setIsReviewing,
    setReviewProgress,
    setFinalResults,
  ]);
};
