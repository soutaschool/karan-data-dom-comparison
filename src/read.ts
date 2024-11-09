// read.ts

document.addEventListener("DOMContentLoaded", () => {
	/**
	 * Displays the result of the read operation.
	 * @param method - The name of the read method used.
	 * @param time - The time taken to perform the read operation in milliseconds.
	 * @param color - The color of the progress bar (default is "purple").
	 */
	function displayResultForRead(
		method: string,
		time: number,
		color = "purple",
	) {
		const resultDiv = document.getElementById("results");
		if (!resultDiv) {
			console.error("Results element not found");
			return;
		}

		const result = document.createElement("div");
		result.className = "mb-2";

		// Since Tailwind CSS cannot handle dynamic class names, use inline styles for the progress bar
		const progressBarStyle = `width: ${calculateWidthForRead(time)}%; background-color: ${color};`;

		result.innerHTML = `
      <h2 class="text-xl font-semibold">${method}</h2>
      <p>Time taken: ${time.toFixed(2)} milliseconds</p>
      <div class="w-full bg-gray-300 dark:bg-gray-600 rounded">
        <div class="text-xs leading-none py-1 text-center text-white" style="${progressBarStyle}"></div>
      </div>
    `;

		resultDiv.appendChild(result);
	}

	/**
	 * Calculates the width percentage for the progress bar based on the time taken.
	 * @param time - The time taken in milliseconds.
	 * @returns The width percentage (capped at 100%).
	 */
	function calculateWidthForRead(time: number): number {
		// Assuming the max time is 2000 ms for calculation purposes
		const maxTime = 2000;
		return Math.min((time / maxTime) * 100, 100);
	}

	// Retrieve necessary DOM elements
	const populateBtn = document.getElementById(
		"populateBtn",
	) as HTMLButtonElement | null;
	const normalReadBtn = document.getElementById(
		"normalReadBtn",
	) as HTMLButtonElement | null;
	const advancedReadBtn = document.getElementById(
		"advancedReadBtn",
	) as HTMLButtonElement | null;
	const container = document.getElementById("container") as HTMLElement | null;
	const results = document.getElementById("results") as HTMLElement | null;

	// Check if all required elements are present
	if (
		!populateBtn ||
		!normalReadBtn ||
		!advancedReadBtn ||
		!container ||
		!results
	) {
		console.error("One or more required elements not found");
		return;
	}

	/**
	 * Populates the container with 10,000 div elements.
	 */
	populateBtn.addEventListener("click", () => {
		// Clear previous results and elements
		results.innerHTML = "";
		container.innerHTML = "";

		const fragment = document.createDocumentFragment();

		for (let i = 0; i < 10000; i++) {
			const div = document.createElement("div");
			div.textContent = `Item ${i}`;
			div.className = "p-2 bg-gray-200 dark:bg-gray-700 rounded";
			fragment.appendChild(div);
		}

		container.appendChild(fragment);
	});

	/**
	 * Performs a normal DOM read by iterating through each element and reading its textContent.
	 */
	normalReadBtn.addEventListener("click", () => {
		if (!container.hasChildNodes()) {
			alert("Please populate elements first.");
			return;
		}

		results.innerHTML = "";

		const startTime = performance.now();

		const items = container.querySelectorAll<HTMLDivElement>("div");
		let totalLength = 0;

		// biome-ignore lint/complexity/noForEach: <explanation>
		items.forEach((item) => {
			// Directly reading textContent
			totalLength += item.textContent?.length || 0;
		});

		const endTime = performance.now();
		const timeTaken = endTime - startTime;

		displayResultForRead("Normal Read", timeTaken);

		console.log("Total Length:", totalLength);
	});

	/**
	 * Performs an advanced DOM read by batching read operations to minimize reflows.
	 */
	advancedReadBtn.addEventListener("click", () => {
		if (!container.hasChildNodes()) {
			alert("Please populate elements first.");
			return;
		}

		results.innerHTML = "";

		const startTime = performance.now();

		// Convert HTMLCollection to a static array to avoid live NodeList issues
		const items = Array.from(container.children) as HTMLDivElement[];
		let totalLength = 0;

		// Batch read operations by first mapping all textContents
		const texts = items.map((item) => item.textContent || "");
		totalLength = texts.reduce((sum, text) => sum + text.length, 0);

		const endTime = performance.now();
		const timeTaken = endTime - startTime;

		displayResultForRead("Advanced Read", timeTaken);

		console.log("Total Length:", totalLength);
	});
});
