# Text_Comparator

A simple web application that compares two pieces of text and highlights their differences.

Text_Comparator uses word-level comparison to identify and highlight additions and removals.

**Use the application:** [Text_Comparator](https://text-comparator-sage.vercel.app/)

## Technologies

- **Backend:** Python, FastAPI
- **Frontend:** HTML, CSS, JavaScript
- **Comparison algorithm:** Python's `difflib.SequenceMatcher`
- **Project and dependency management:** uv

## How to Use

1. Open [Text_Comparator](https://text-comparator-sage.vercel.app/).
2. Paste your original text into the first text box.
3. Paste the modified text into the second text box.
4. Choose whether to enable **Ignore extra spaces**.
5. Click **Compare**.

## Development

Want to run Text_Comparator locally or contribute to its development?

### Prerequisites

- Python
- [uv](https://docs.astral.sh/uv/)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Akranium/Text_Comparator.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Text_Comparator
   ```

3. Install dependencies:

   ```bash
   uv sync
   ```

4. Start the development server:

   ```bash
   uv run uvicorn main:app --reload
   ```

5. Open the application in your browser:

   http://127.0.0.1:8000/

### API

The application provides a comparison endpoint:

`POST /api/compare`

#### Request body

```json
{
    "original": "The original text.",
    "modified": "The modified text.",
    "ignore_extra_spaces": true
}
```

#### Response

The endpoint returns the comparison results, including the detected changes and comparison statistics.

FastAPI's interactive API documentation is available at:

http://127.0.0.1:8000/docs

## License

This project is open source, but licensed under GNU General Public License v3.0. See LICENSE.md for more details.
