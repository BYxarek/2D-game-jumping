            let score = 0;
            document.getElementById("score").innerText = "Счет: " + score;

            const game = document.getElementById("game");
            const player = document.getElementById("player");
            let isJumping = false;
            let gravity = 0.9;
            let obstacles = [];
            let gamePaused = true;

            function jump() {
                if (isJumping || gamePaused) return;
                isJumping = true;
                let jumpCount = 0;
                const jumpInterval = setInterval(() => {
                    if (jumpCount > 35) {
                        clearInterval(jumpInterval);
                        const fallInterval = setInterval(() => {
                            if (jumpCount === 0) {
                                clearInterval(fallInterval);
                                isJumping = false;
                            }
                            let newBottom = parseInt(player.style.bottom) - 5;
                            if (newBottom < 0) newBottom = 0;
                            player.style.bottom = `${newBottom}px`;
                            jumpCount--;
                        }, 20);
                    }
                    player.style.bottom = `${parseInt(player.style.bottom) + 5}px`;
                    jumpCount++;
                }, 20);
            }

            function createObstacle() {
                if (gamePaused) return;
                const obstacle = document.createElement("div");
                obstacle.classList.add("obstacle");
                obstacle.style.left = "1500vw";
                game.appendChild(obstacle);
                obstacles.push(obstacle);

                const moveObstacle = setInterval(() => {
                    if (gamePaused) {
                        clearInterval(moveObstacle);
                        return;
                    }
                    if (parseInt(obstacle.style.left) < -20) {
                        clearInterval(moveObstacle);
                        game.removeChild(obstacle);
                        obstacles.shift();
                        score++;
                        document.getElementById("score").innerText = "Счет: " + score;
                    }
                    obstacle.style.left = `${parseInt(obstacle.style.left) - 5}px`;

                    if (parseInt(obstacle.style.left) < 75 && parseInt(obstacle.style.left) > 0 && parseInt(player.style.bottom) < 50) {
                        document.getElementById("finalScore").textContent = score;
                        document.getElementById("myModal").style.display = "block";
                        gamePaused = true;
                    }
                }, 20);
            }

            setInterval(createObstacle, 3000); // Изменряется в милисекундах

            document.addEventListener("keydown", function (event) {
                if (event.code === "Space") {
                    jump();
                }
            });

            game.addEventListener("click", function () {
                jump();
            });

            document.getElementById("replayBtn").onclick = function () {
                location.reload();
            };

            document.getElementById("startBtn").onclick = function () {
                document.getElementById("startModal").style.display = "none";
                gamePaused = false;
            };

            let lastFrameTime = performance.now();
            let frameCount = 0;
            let fps = 0;

            function updateFPS() {
                const now = performance.now();
                frameCount++;
                if (now - lastFrameTime >= 1000) {
                    fps = frameCount;
                    frameCount = 0;
                    lastFrameTime = now;
                    document.getElementById("fps").innerText = `FPS: ${fps}`;
                }
                requestAnimationFrame(updateFPS);
            }

            updateFPS();
            setInterval(updatePING, 1000);