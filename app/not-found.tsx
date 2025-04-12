"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home, Gamepad2 } from "lucide-react";

export default function NotFound() {
    const [showGame, setShowGame] = useState(false);

    return (
        <main className="min-h-screen bg-gradient-to-b from-background to-primary/5 flex flex-col items-center justify-center p-4">
            <div className="max-w-3xl w-full text-center">
                <div className="relative w-full h-40 md:h-60 mb-8 animate-float">
                    <Image
                        src="/placeholder.svg?height=240&width=600"
                        alt="404 Not Found"
                        fill
                        className="object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-8xl md:text-9xl font-bold text-primary">
                            404
                        </h1>
                    </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in-up">
                    Oops! The Scene You're Looking For Is Missing
                </h2>

                <p
                    className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto animate-fade-in-up"
                    style={{ animationDelay: "0.2s" }}
                >
                    Looks like this scene was left on the cutting room floor.
                    The director might have decided it didn't fit the storyline,
                    or perhaps it's still in post-production.
                </p>

                <div
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up"
                    style={{ animationDelay: "0.3s" }}
                >
                    <Button asChild size="lg">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" /> Back to Homepage
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setShowGame(!showGame)}
                    >
                        <Gamepad2 className="mr-2 h-4 w-4" />{" "}
                        {showGame ? "Hide Game" : "Play a Game"}
                    </Button>
                </div>

                {showGame && <MovieCatcherGame />}

                <div
                    className="text-sm text-muted-foreground animate-fade-in-up"
                    style={{ animationDelay: "0.4s" }}
                >
                    <p>
                        If you believe this is an error, please contact our
                        support team.
                    </p>
                </div>
            </div>
        </main>
    );
}

function MovieCatcherGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        if (!canvasRef.current || !gameStarted) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas dimensions
        canvas.width = 600;
        canvas.height = 400;

        // Game variables
        let animationFrameId: number;
        let playerX = canvas.width / 2 - 50;
        const playerY = canvas.height - 50;
        const playerWidth = 100;
        const playerHeight = 20;
        const playerSpeed = 8;

        // Items falling (movie items)
        const items: {
            x: number;
            y: number;
            width: number;
            height: number;
            type: string;
            speed: number;
        }[] = [];
        const itemTypes = ["popcorn", "ticket", "movie", "award"];
        let itemInterval: NodeJS.Timeout;

        // Controls
        let rightPressed = false;
        let leftPressed = false;

        // Event listeners for keyboard
        const keyDownHandler = (e: KeyboardEvent) => {
            if (e.key === "Right" || e.key === "ArrowRight") {
                rightPressed = true;
            } else if (e.key === "Left" || e.key === "ArrowLeft") {
                leftPressed = true;
            }
        };

        const keyUpHandler = (e: KeyboardEvent) => {
            if (e.key === "Right" || e.key === "ArrowRight") {
                rightPressed = false;
            } else if (e.key === "Left" || e.key === "ArrowLeft") {
                leftPressed = false;
            }
        };

        // Touch controls
        let touchStartX = 0;

        const touchStartHandler = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
        };

        const touchMoveHandler = (e: TouchEvent) => {
            if (!touchStartX) return;

            const touchX = e.touches[0].clientX;
            const diff = touchX - touchStartX;

            if (diff > 5) {
                // Moving right
                rightPressed = true;
                leftPressed = false;
            } else if (diff < -5) {
                // Moving left
                leftPressed = true;
                rightPressed = false;
            } else {
                rightPressed = false;
                leftPressed = false;
            }

            touchStartX = touchX;
        };

        const touchEndHandler = () => {
            rightPressed = false;
            leftPressed = false;
            touchStartX = 0;
        };

        // Add event listeners
        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);
        canvas.addEventListener("touchstart", touchStartHandler);
        canvas.addEventListener("touchmove", touchMoveHandler);
        canvas.addEventListener("touchend", touchEndHandler);

        // Create falling items
        const createItem = () => {
            const type =
                itemTypes[Math.floor(Math.random() * itemTypes.length)];
            const width = 30;
            const height = 30;
            const x = Math.random() * (canvas.width - width);
            const y = -30;
            const speed = 2 + Math.random() * 3;

            items.push({ x, y, width, height, type, speed });
        };

        // Start creating items
        itemInterval = setInterval(createItem, 1000);

        // Draw player
        const drawPlayer = () => {
            if (!ctx) return;

            ctx.fillStyle = "#3b82f6";
            ctx.beginPath();
            ctx.roundRect(playerX, playerY, playerWidth, playerHeight, 5);
            ctx.fill();

            // Draw a bucket-like shape
            ctx.beginPath();
            ctx.moveTo(playerX, playerY);
            ctx.lineTo(playerX + 10, playerY - 15);
            ctx.lineTo(playerX + playerWidth - 10, playerY - 15);
            ctx.lineTo(playerX + playerWidth, playerY);
            ctx.fillStyle = "#2563eb";
            ctx.fill();
        };

        // Draw items
        const drawItems = () => {
            if (!ctx) return;

            items.forEach((item) => {
                // Draw different shapes based on item type
                ctx.fillStyle = getItemColor(item.type);

                if (item.type === "popcorn") {
                    // Draw popcorn
                    ctx.beginPath();
                    ctx.arc(
                        item.x + item.width / 2,
                        item.y + item.height / 2,
                        item.width / 2,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                } else if (item.type === "ticket") {
                    // Draw ticket
                    ctx.fillRect(item.x, item.y, item.width, item.height);
                } else if (item.type === "movie") {
                    // Draw movie reel
                    ctx.beginPath();
                    ctx.moveTo(item.x, item.y + item.height / 2);
                    ctx.lineTo(item.x + item.width / 2, item.y);
                    ctx.lineTo(item.x + item.width, item.y + item.height / 2);
                    ctx.lineTo(item.x + item.width / 2, item.y + item.height);
                    ctx.closePath();
                    ctx.fill();
                } else {
                    // Draw award
                    ctx.beginPath();
                    ctx.moveTo(item.x + item.width / 2, item.y);
                    ctx.lineTo(item.x + item.width, item.y + item.height / 2);
                    ctx.lineTo(item.x + item.width / 2, item.y + item.height);
                    ctx.lineTo(item.x, item.y + item.height / 2);
                    ctx.closePath();
                    ctx.fill();
                }
            });
        };

        // Get color based on item type
        const getItemColor = (type: string) => {
            switch (type) {
                case "popcorn":
                    return "#f59e0b";
                case "ticket":
                    return "#10b981";
                case "movie":
                    return "#ec4899";
                case "award":
                    return "#f43f5e";
                default:
                    return "#6366f1";
            }
        };

        // Get points based on item type
        const getItemPoints = (type: string) => {
            switch (type) {
                case "popcorn":
                    return 5;
                case "ticket":
                    return 10;
                case "movie":
                    return 15;
                case "award":
                    return 25;
                default:
                    return 5;
            }
        };

        // Draw score
        const drawScore = () => {
            if (!ctx) return;

            ctx.font = "20px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText(`Score: ${score}`, 20, 30);
        };

        // Update game state
        const update = () => {
            // Move player
            if (rightPressed && playerX < canvas.width - playerWidth) {
                playerX += playerSpeed;
            } else if (leftPressed && playerX > 0) {
                playerX -= playerSpeed;
            }

            // Move items and check collisions
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                item.y += item.speed;

                // Check if item is caught
                if (
                    item.y + item.height > playerY &&
                    item.y < playerY + playerHeight &&
                    item.x + item.width > playerX &&
                    item.x < playerX + playerWidth
                ) {
                    // Item caught
                    setScore(
                        (prevScore) => prevScore + getItemPoints(item.type)
                    );
                    items.splice(i, 1);
                    i--;
                }
                // Check if item is missed
                else if (item.y > canvas.height) {
                    items.splice(i, 1);
                    i--;

                    // Game over if too many items are missed
                    if (items.length > 20) {
                        setGameOver(true);
                        clearInterval(itemInterval);
                    }
                }
            }
        };

        // Main game loop
        const gameLoop = () => {
            if (gameOver) return;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update game state
            update();

            // Draw everything
            drawPlayer();
            drawItems();
            drawScore();

            // Continue the game loop
            animationFrameId = requestAnimationFrame(gameLoop);
        };

        // Start the game loop
        gameLoop();

        // Cleanup function
        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(itemInterval);
            document.removeEventListener("keydown", keyDownHandler);
            document.removeEventListener("keyup", keyUpHandler);
            canvas.removeEventListener("touchstart", touchStartHandler);
            canvas.removeEventListener("touchmove", touchMoveHandler);
            canvas.removeEventListener("touchend", touchEndHandler);
        };
    }, [gameStarted, gameOver, score]);

    const handleStartGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
    };

    const handleRestartGame = () => {
        setGameOver(false);
        setScore(0);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-card border rounded-lg p-4 mb-8 animate-fade-in-up">
            <h3 className="text-xl font-bold mb-4 text-center">
                Movie Catcher Game
            </h3>

            <div className="text-sm text-muted-foreground mb-4 text-center">
                {!gameStarted ? (
                    <p>
                        Catch falling movie items with your bucket to score
                        points!
                    </p>
                ) : gameOver ? (
                    <p>Game Over! Your final score: {score}</p>
                ) : (
                    <p>
                        Use arrow keys or touch to move. Current score: {score}
                    </p>
                )}
            </div>

            <div className="relative bg-muted rounded-lg overflow-hidden mb-4">
                {!gameStarted || gameOver ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                        <Button
                            onClick={
                                gameStarted
                                    ? handleRestartGame
                                    : handleStartGame
                            }
                            size="lg"
                            className="animate-pulse"
                        >
                            <Gamepad2 className="mr-2 h-4 w-4" />
                            {gameStarted ? "Play Again" : "Start Game"}
                        </Button>
                    </div>
                ) : null}

                <canvas ref={canvasRef} className="w-full h-[400px] bg-white" />
            </div>

            <div className="text-xs text-center text-muted-foreground">
                <p>
                    Use left and right arrow keys or touch to move the bucket
                    and catch items.
                </p>
                <p>Different items are worth different points!</p>
            </div>
        </div>
    );
}
