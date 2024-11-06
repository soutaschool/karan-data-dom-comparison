function displayResult(method: string, time: number) {
	const resultDiv = document.getElementById("results");
	if (!resultDiv) {
		console.error("Results element not found");
		return;
	}

	const result = document.createElement("div");
	result.className = "mb-2";

	result.innerHTML = `
    <h2 class="text-xl font-semibold">${method}</h2>
    <p>Time taken: ${time.toFixed(2)} milliseconds</p>
    <div class="w-full bg-gray-300 dark:bg-gray-600 rounded">
      <div class="bg-blue-500 text-xs leading-none py-1 text-center text-white" style="width: ${calculateWidth(time)}%"></div>
    </div>
  `;

	resultDiv.appendChild(result);
}

function calculateWidth(time: number): number {
	// Assuming the max time is 2000 ms for calculation purposes
	const maxTime = 2000;
	return Math.min((time / maxTime) * 100, 100);
}

document.addEventListener("DOMContentLoaded", () => {
	const normalBtn = document.getElementById("normalBtn");
	const advancedBtn = document.getElementById("advancedBtn");
	const container = document.getElementById("container");
	const results = document.getElementById("results");

	if (!normalBtn || !advancedBtn || !container || !results) {
		console.error("One or more required elements not found");
		return;
	}

	normalBtn.addEventListener("click", () => {
		// Clear previous results and elements
		results.innerHTML = "";
		container.innerHTML = "";

		const startTime = performance.now();

		for (let i = 0; i < 10000; i++) {
			const div = document.createElement("div");
			div.textContent = `Item ${i}`;
			div.className = "p-2 bg-gray-200 dark:bg-gray-700 rounded";
			container.appendChild(div);
		}

		const endTime = performance.now();
		const timeTaken = endTime - startTime;

		displayResult("Normal DOM Manipulation", timeTaken);
	});

	advancedBtn.addEventListener("click", () => {
		// Clear previous results and elements
		results.innerHTML = "";
		container.innerHTML = "";

		const startTime = performance.now();

		const fragment = document.createDocumentFragment();

		for (let i = 0; i < 10000; i++) {
			const div = document.createElement("div");
			div.textContent = `Item ${i}`;
			div.className = "p-2 bg-gray-200 dark:bg-gray-700 rounded";
			fragment.appendChild(div);
		}

		container.appendChild(fragment);

		const endTime = performance.now();
		const timeTaken = endTime - startTime;

		displayResult("Advanced DOM Manipulation", timeTaken);
	});
});
