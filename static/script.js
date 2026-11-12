console.log("TextComparator JavaScript loaded!");

const originalInput = document.getElementById("original");
const modifiedInput = document.getElementById("modified");
const compareButton = document.getElementById("compare-button");
const ignoreExtraSpacesCheckbox = document.getElementById("ignore-extra-spaces");
const resultsSection = document.getElementById("results");
const originalResult = document.getElementById("original-result");
const modifiedResult = document.getElementById("modified-result");
const addedCount = document.getElementById("added-count");
const removedCount = document.getElementById("removed-count");
const similarity = document.getElementById("similarity");

compareButton.addEventListener("click", async () => {
    const originalText = originalInput.value;
    const modifiedText = modifiedInput.value;

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
