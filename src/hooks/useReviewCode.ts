import { useEffect, useMemo, useState } from "react";
import { Socket } from "socket.io-client";

import {
  getContributorDataAction,
  getContributorsAction,
  startReviewAction,
} from "@/actions/codereview.action";

import {
  GetContributorDataPayload,
  GetContributorsPayload,
  StartReviewPayload,
} from "@/lib/types/auth";
import {
  FinalResults,
  ReviewProgress,
  Contributor,
  ContributorData,
} from "@/lib/types/review";
import { socketService } from "@/services/socketService";

export const useReviewCode = () => {
  // local states
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // contributors states
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [contributor, setContributor] = useState<ContributorData | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedContributor, setSelectedContributor] =
    useState<Contributor | null>();

  // code review states
  const [socketId, setSocketId] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [reviewProgress, setReviewProgress] = useState<ReviewProgress | null>();
  const [finalResults, setFinalResults] = useState<FinalResults | null>();

  // socket useEffect
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
  }, []);

  const getContributors = async (payload: GetContributorsPayload) => {
    setError(null);
    setLoading(true);
    const response = await getContributorsAction(payload);
    if (!response.success) {
      setError(response.message);
      setContributors([]);
      setLoading(false);
      return null;
    }
    setContributors(response.data);
    setLoading(false);
  };

  const getContributorData = async (payload: GetContributorDataPayload) => {
    setError(null);
    setLoading(true);
    const response = await getContributorDataAction(payload);
    if (!response.success) {
      setError(response.message);
      setContributor(undefined);
      setLoading(false);
      return null;
    }
    setContributor(response.data);
    setLoading(false);
    return response.data;
  };

  const startCodeReview = async (payload: StartReviewPayload) => {
    if (!selectedContributor || !socketId) return;

    setError(null);
    setLoading(true);
    setIsReviewing(true);
    setReviewProgress(null);
    setFinalResults(null);

    const result = await startReviewAction(payload);
    if (!result.success) {
      setError(result.message);
      setLoading(false);
      setIsReviewing(false);
      setReviewProgress(null);
      setFinalResults(null);
      return;
    }
    setLoading(false);
    setIsReviewing(false);
  };

  const filteredContributors = useMemo(() => {
    if (!searchTerm.trim()) return contributors;
    return contributors.filter((contributor: Contributor) =>
      contributor?.login.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, contributors]);

  return {
    contributors,
    loading,
    error,
    getContributors,
    getContributorData,
    contributor,
    filteredContributors,
    searchTerm,
    setSearchTerm,
    selectedContributor,
    setSelectedContributor,
    startCodeReview,
    socket,
    socketId,
    isReviewing,
    reviewProgress,
    finalResults,
    setFinalResults,
  };
};
