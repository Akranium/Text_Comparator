console.log("TextComparator JavaScript loaded!");

const originalInput = document.getElementById("original");
const modifiedInput = document.getElementById("modified");
const compareButton = document.getElementById("compare-button");
const swapButton = document.getElementById("swap-button");
const clearButton = document.getElementById("clear-button");
const ignoreExtraSpacesCheckbox = document.getElementById("ignore-extra-spaces");
const resultsSection = document.getElementById("results");
const originalResult = document.getElementById("original-result");
const modifiedResult = document.getElementById("modified-result");
const addedCount = document.getElementById("added-count");
const removedCount = document.getElementById("removed-count");
const similarity = document.getElementById("similarity");

originalInput.addEventListener("input", validateInputs);
modifiedInput.addEventListener("input", validateInputs);
validateInputs();

compareButton.addEventListener("click", async () => {
    const originalText = originalInput.value;
    const modifiedText = modifiedInput.value;

    if (!originalInput.value.trim() || !modifiedInput.value.trim()) {
        return;
    }

    try {
        const response = await fetch("/api/compare", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                original: originalText,
                modified: modifiedText,
                ignore_extra_spaces: ignoreExtraSpacesCheckbox.checked
            })
        });

        if (!response.ok) {
            throw new Error("Comparison request failed");
        }

      const result = await response.json();

      addedCount.textContent = result.added;
      removedCount.textContent = result.removed;
      similarity.textContent = `${result.similarity}%`;

        renderComparison(result.changes);

        console.log(result);

    } catch (error) {
        console.error("Error:", error);
    }
});
swapButton.addEventListener("click", swapInputs)
clearButton.addEventListener("click", clearInputs)

function appendHighlighted(container, text, className) {
    const span = document.createElement("span");

    span.className = className;
    span.textContent = text;

    container.append(span);
}

function renderComparison(changes) {
    originalResult.replaceChildren();
    modifiedResult.replaceChildren();

    for (const change of changes) {
        const originalText = change.original.join("");
        const modifiedText = change.modified.join("");

        if (change.type === "equal") {
            originalResult.append(document.createTextNode(originalText));
            modifiedResult.append(document.createTextNode(modifiedText));
        }

        else if (change.type === "delete") {
            appendHighlighted(originalResult, originalText, "diff-removed");
        }

        else if (change.type === "insert") {
            appendHighlighted(modifiedResult, modifiedText, "diff-added");
        }

        else if (change.type === "replace") {
            appendHighlighted(originalResult, originalText, "diff-removed");
            appendHighlighted(modifiedResult, modifiedText, "diff-added");
        }
    }

    resultsSection.hidden = false;
}

function validateInputs() {
    const hasOriginal = originalInput.value.trim().length > 0;
    const hasModified = modifiedInput.value.trim().length > 0;

    compareButton.disabled = !hasOriginal || !hasModified;
}

function swapInputs() {
  console.log("Swapping Inputs")
  const originalValue = originalInput.value
  const modifiedValue = modifiedInput.value

  originalInput.value = modifiedValue
  modifiedInput.value = originalValue
}

function clearInputs() {
  console.log("Clearing Inputs")
  originalInput.value = ""
  modifiedInput.value = ""
}
