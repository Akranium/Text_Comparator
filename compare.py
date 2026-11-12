import re
from difflib import SequenceMatcher

def tokenize(text, ignore_extra_spaces=True):
    if ignore_extra_spaces:
        text = re.sub(r" {2,}", " ", text)

    return re.findall(r"\s+|\S+", text)


def compare_texts(original: str, modified: str, ignore_extra_spaces: bool = True):
    original_tokens = tokenize(original, ignore_extra_spaces)
    modified_tokens = tokenize(modified, ignore_extra_spaces)

    matcher = SequenceMatcher(
        None,
        original_tokens,
        modified_tokens,
        autojunk=False
    )

    changes = [] # Changes

    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        changes.append({
            "type": tag,
            "original": original_tokens[i1:i2],
            "modified": modified_tokens[j1:j2]
        })

    similarity = round(matcher.ratio() * 100, 1) # Similatity ratio

    added = 0 # Added words
    removed = 0 # Removed words

    for change in changes:
        if change["type"] == "insert":
            added += len(change["modified"])

        elif change["type"] == "delete":
            removed += len(change["original"])

        elif change["type"] == "replace":
            added += len(change["modified"])
            removed += len(change["original"])

    return {
        "changes": changes,
        "added": added,
        "removed": removed,
        "similarity": similarity
    }
