document.addEventListener("DOMContentLoaded", () => {
	/**
	 * Displays the result of the update operation.
	 * @param method - The name of the update method used.
	 * @param time - The time taken to perform the update operation in milliseconds.
	 * @param color - The color of the progress bar (default is "purple").
	 */
	function displayResultForUpdate(
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

		// Use inline styles for dynamic styling
		const progressBarStyle = `width: ${calculateWidthForUpdate(time)}%; background-color: ${color};`;

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
	function calculateWidthForUpdate(time: number): number {
		// Assuming the max time is 2000 ms for calculation purposes
		const maxTime = 2000;
		return Math.min((time / maxTime) * 100, 100);
	}

	// Retrieve necessary DOM elements
	const populateBtn = document.getElementById(
		"populateBtn",
	) as HTMLButtonElement | null;
	const normalUpdateBtn = document.getElementById(
		"normalUpdateBtn",
	) as HTMLButtonElement | null;
	const advancedUpdateBtn = document.getElementById(
		"advancedUpdateBtn",
	) as HTMLButtonElement | null;
	const container = document.getElementById("container") as HTMLElement | null;
	const results = document.getElementById("results") as HTMLElement | null;

	// Check if all required elements are present
	if (
		!populateBtn ||
		!normalUpdateBtn ||
		!advancedUpdateBtn ||
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
	 * Performs a normal DOM update by iterating through each element and updating its textContent.
	 */
	normalUpdateBtn.addEventListener("click", () => {
		if (!container.hasChildNodes()) {
			alert("Please populate elements first.");
			return;
		}

		results.innerHTML = "";

		const startTime = performance.now();

		const items = container.querySelectorAll<HTMLDivElement>("div");

		items.forEach((item, index) => {
			// Update textContent by appending " - Updated"
			item.textContent = `Item ${index} - Updated`;
		});

		const endTime = performance.now();
		const timeTaken = endTime - startTime;

		displayResultForUpdate("Normal Update", timeTaken, "red");

		console.log("Update Completed.");
	});

	/**
	 * Performs an advanced DOM update by using DocumentFragment to batch updates.
	 */
	advancedUpdateBtn.addEventListener("click", () => {
		if (!container.hasChildNodes()) {
			alert("Please populate elements first.");
			return;
		}

		results.innerHTML = "";

		const startTime = performance.now();

		// Convert HTMLCollection to a static array to avoid live NodeList issues
		const items = Array.from(container.children) as HTMLDivElement[];

		// Create a DocumentFragment to batch updates
		const fragment = document.createDocumentFragment();

		items.forEach((item, index) => {
			// Update textContent by appending " - Updated"
			item.textContent = `Item ${index} - Updated`;
			fragment.appendChild(item);
		});

		// Append the fragment back to the container in a single operation
		container.innerHTML = ""; // Clear existing elements
		container.appendChild(fragment);

		const endTime = performance.now();
		const timeTaken = endTime - startTime;

		displayResultForUpdate("Advanced Update", timeTaken, "green");

		console.log("Update Completed.");
	});
});
