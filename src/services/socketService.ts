import { io, Socket } from "socket.io-client";
import AppConstants from "@/constants/appconstants";
import {
  ReviewProgress,
  FinalResults,
  ReviewStartedData,
  ReviewErrorData,
} from "@/lib/types/review";

export class SocketService {
  private socket: Socket | null = null;
  private callbacks: {
    onConnect?: (socketId: string) => void;
    onReviewStarted?: (data: ReviewStartedData) => void;
    onReviewProgress?: (data: ReviewProgress) => void;
    onReviewError?: (data: ReviewErrorData) => void;
    onReviewDone?: (data: FinalResults) => void;
    onDisconnect?: () => void;
    onConnectError?: (error: Error) => void;
  } = {};

  connect(callbacks: typeof this.callbacks) {
    this.callbacks = callbacks;
    // AppConstants.apiHome
    this.socket = io(AppConstants.apiHome, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.setupListeners();
    return this.socket;
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      // console.log("Connected to socket server:", this.socket?.id);
      if (this.socket?.id && this.callbacks.onConnect) {
        this.callbacks.onConnect(this.socket.id);
      }
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error.message);
      this.callbacks.onConnectError?.(error);
    });

    this.socket.on("reviewStarted", (data) => {
      // console.log("Review started:", data);
      this.callbacks.onReviewStarted?.(data);
    });

    this.socket.on("reviewProgress", (data: ReviewProgress) => {
      // console.log("Review progress:", data);
      this.callbacks.onReviewProgress?.(data);
    });

    this.socket.on("reviewError", (data) => {
      console.error("Review error:", data);
      this.callbacks.onReviewError?.(data);
    });

    this.socket.on("reviewDone", (data: FinalResults) => {
      // console.log("Review completed:", data);
      this.callbacks.onReviewDone?.(data);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Disconnected from socket server:", reason);
      this.callbacks.onDisconnect?.();
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }
}

export const socketService = new SocketService();
