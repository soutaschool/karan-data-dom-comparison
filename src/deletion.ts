function displayResultForDeletion(method: string, time: number) {
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
      <div class="bg-red-500 text-xs leading-none py-1 text-center text-white" style="width: ${calculateWidthForDeletion(time)}%"></div>
    </div>
  `;

	resultDiv.appendChild(result);
}

function calculateWidthForDeletion(time: number): number {
	// Assuming the max time is 2000 ms for calculation purposes
	const maxTime = 2000;
	return Math.min((time / maxTime) * 100, 100);
}

document.addEventListener("DOMContentLoaded", () => {
	const populateBtn = document.getElementById("populateBtn");
	const removeIndividuallyBtn = document.getElementById(
		"removeIndividuallyBtn",
	);
	const removeInnerHTMLBtn = document.getElementById("removeInnerHTMLBtn");
	const removeLoopBtn = document.getElementById("removeLoopBtn");
	const removeReplaceChildrenBtn = document.getElementById(
		"removeReplaceChildrenBtn",
	);
	const container = document.getElementById("container");
	const results = document.getElementById("results");

	if (
		!populateBtn ||
		!removeIndividuallyBtn ||
		!removeInnerHTMLBtn ||
		!removeLoopBtn ||
		!removeReplaceChildrenBtn ||
		!container ||
		!results
	) {
		console.error("One or more required elements not found");
		return;
	}

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

	removeIndividuallyBtn.addEventListener("click", () => {
		if (!container.hasChildNodes()) {
			alert("Please populate elements first.");
			return;
		}

		results.innerHTML = "";

		const startTime = performance.now();

		const items = container.querySelectorAll("div");
		// biome-ignore lint/complexity/noForEach: <explanation>
		items.forEach((item) => item.remove());

		const endTime = performance.now();
		const timeTaken = endTime - startTime;

		displayResultForDeletion("Remove Individually", timeTaken);
	});

	removeInnerHTMLBtn.addEventListener("click", () => {
		if (!container.hasChildNodes()) {
			alert("Please populate elements first.");
			return;
		}

		results.innerHTML = "";

		const startTime = performance.now();

		container.innerHTML = "";

		const endTime = performance.now();
		const timeTaken = endTime - startTime;

		displayResultForDeletion("Remove with innerHTML", timeTaken);
	});

	removeLoopBtn.addEventListener("click", () => {
		if (!container.hasChildNodes()) {
			alert("Please populate elements first.");
			return;
		}

		results.innerHTML = "";

		const startTime = performance.now();

		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}

		const endTime = performance.now();
		const timeTaken = endTime - startTime;

		displayResultForDeletion("Remove with Loop", timeTaken);
	});

	removeReplaceChildrenBtn.addEventListener("click", () => {
		if (!container.hasChildNodes()) {
			alert("Please populate elements first.");
			return;
		}

		results.innerHTML = "";

		const startTime = performance.now();

		(container as HTMLElement).replaceChildren();

		const endTime = performance.now();
		const timeTaken = endTime - startTime;

		displayResultForDeletion("Remove with replaceChildren", timeTaken);
	});
});
