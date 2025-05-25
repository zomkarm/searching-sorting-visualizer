# 📊 Algorithm Visualizer

An interactive web-based **Sorting and Searching Algorithm Visualizer** built using **React** and **Tailwind CSS**. This project visually demonstrates how popular algorithms work using animated bars and step tracking — a perfect tool for learning, teaching, or portfolio presentation.

## 🚀 Features

- 🔢 Visualize **Sorting Algorithms**: Bubble Sort, Insertion Sort, Merge Sort, Quick Sort  
- 🔍 Visualize **Searching Algorithms**: Linear Search, Binary Search  
- 🎨 Smooth animations using **Framer Motion**  
- 📈 Live display of **steps** and **comparisons** for performance insight  
- 🧹 Reset functionality to revert and rerun visualizations  
- ⚙️ Algorithm dropdown selectors and array generation  
- 💻 Responsive and modern UI with Tailwind CSS

## 📸 Demo

![Demo Screenshot](./screenshot.png)  
*(Add a real screenshot or screen recording here for best presentation)*

## 🛠️ Tech Stack

- **Frontend**: React (TypeScript)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: React Hooks

## 📂 Project Structure

/src
├── components/
│ ├── Visualizer.tsx # Main visualization logic
│ ├── Controls.tsx # Dropdowns, buttons
│ └── ... (additional UI components)
├── pages/
│ └── index.tsx # Main landing and control interface
└── styles/
└── globals.css


## 🧠 Algorithms Implemented

### 🔢 Sorting
- Bubble Sort
- Insertion Sort
- Merge Sort
- Quick Sort

### 🔍 Searching
- Linear Search
- Binary Search  
*(Binary Search auto-sorts the array before searching)*

Each algorithm updates steps and comparisons, with visual highlights for comparisons and swaps.

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/algorithm-visualizer.git
cd algorithm-visualizer

# Install dependencies
npm install

# Start the development server
npm run dev


### 🧪 Usage

Select an algorithm type (Sorting or Searching).
Choose a specific algorithm from the dropdown.
Click Visualize to animate the steps.
Use Reset to return to the original array state.
Adjust the array size manually if needed.

📚 Learning Outcomes
Strengthened understanding of algorithm logic through visuals
Experience using React with TypeScript and Tailwind CSS
Gained hands-on skills with Framer Motion for animations
Improved component design and UI control logic