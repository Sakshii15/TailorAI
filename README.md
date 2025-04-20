# 👗 AI-Based Kurta/Suit Design Recommendation System

This project is an intelligent AI/ML-powered application that allows users to upload an image of a fabric and get **automated design recommendations** for kurta or suit stitching. The model analyzes the **texture, pattern, and fabric type** and recommends suitable **neck designs, sleeves, and tailoring styles**.

---

## 📌 Features

- Upload cloth/fabric image
- Fabric classification (e.g., cotton, silk, printed, embroidered)
- Suggest stitching designs based on the fabric (e.g., Anarkali, A-line, straight cut)
- Recommend neck designs (e.g., round neck, V-neck, collar, etc.)
- REST API support using FastAPI for easy integration with mobile or web apps
- Integration-ready for logistics APIs (e.g., Delhivery) for cloth pickup and delivery

---

## 🛠 Tech Stack

| Component      | Technology Used           |
|----------------|---------------------------|
| Frontend       | React Native / Flutter     |
| Backend        | FastAPI (Python)           |
| AI/ML Models   | TensorFlow / Keras         |
| Image Handling | OpenCV, PIL                |
| Recommendation | CNN / KNN / Vision Transformers |
| Delivery API   | Delhivery API (planned)    |
| Storage        | Firebase / AWS S3          |

---

## 🔍 How It Works

1. **User uploads a cloth image**
2. **Model analyzes fabric type** and patterns using a trained CNN
3. **Designs are recommended** based on the recognized fabric features using ML classifiers or similarity algorithms
4. Optionally, **logistics integration** handles the delivery of the cloth to a tailor and back to the customer
   
![TailorAI Screenshot](https://github.com/Sakshii15/TailorAI/blob/main/images/Screenshot%202025-04-20%20192006.png)
![TailorAI Dark](https://github.com/Sakshii15/TailorAI/blob/main/images/Screenshot%202025-04-20%20192244.png)

---


## 📂 Project Structure

```
TAILORAI2.0/
│
├── .env                         # Environment variables
├── .gitignore                   # Git ignored files
├── components.json              # UI components configuration
├── jest.config.js               # Jest testing configuration
├── next-env.d.ts                # Next.js environment types
├── next.config.ts               # Next.js configuration
├── package.json                 # NPM package descriptor
├── package-lock.json            # NPM lock file
├── postcss.config.mjs           # PostCSS configuration
├── README.md                    # Project documentation
├── tailwind.config.ts           # TailwindCSS config
├── tsconfig.json                # TypeScript config
│
├── .next/                       # Next.js build output
├── docs/                        # Documentation files
├── node_modules/                # Node dependencies
│
└── src/
    ├── ai/                      # ML/AI logic and models
    ├── app/                     # Next.js app routing
    ├── components/              # Reusable React components
    ├── hooks/                   # Custom React hooks
    └── lib/                     # Helper libraries & utilities
```
---

## ✅ Installation

```bash
git clone https://github.com/yourusername/TailorAI.git
cd TailorAI
npm install
npm run dev
```

> The application will start on `http://localhost:3000` by default.

---

## 📦 API Endpoints

- `POST /predict/` – Upload an image and get design recommendations  
- `GET /designs/` – Get available design templates (predefined)

---

## 🎯 Use Cases

- Tailors and boutiques looking for smart design suggestions based on fabric
- Fashion apps providing automated stitching recommendations
- Personal users curious about what style suits a particular cloth

---

## 🚀 Future Scope

- Add **text-to-design generation** using generative AI (e.g., input: "party wear silk suit")
- Build a full **mobile-first UI** for real-time interaction
- Integrate **Vision Transformer models** for better design prediction
- Add **Delhivery or Shiprocket API** for automatic pickup/delivery tracking
- Implement **image generation** features (e.g., generate mock-up of final stitched suit) 🎨

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

