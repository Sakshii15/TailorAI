# **App Name**: Tailored AI Designs

## Core Features:

- Fabric Analysis: Analyze uploaded fabric images to determine material composition and provide a confidence score using Google's Gemini Pro Vision model.
- AI Design Generation: Generate three distinct women's suit designs based on the analyzed fabric characteristics. Includes a creative design name, a detailed description of the cut, style, and key properties, and a high-quality visual rendering. The AI model acts as a tool to incorporate fabric characteristics into the designs.
- Design Display: Display generated suit designs in a clear, responsive grid layout, including design name, description, key properties, and visual rendering.
- Image Processing Pipeline: Accept fabric image URLs as input, process them using a two-stage AI pipeline (material analysis and design generation), and provide automatic fallback to placeholder images if generation fails. Handle any errors and display an appropriate message to the user.
- Frontend Implementation: Implement a clean and responsive user interface using React/TypeScript and Tailwind CSS, with state management for loading and error handling. Zod validation should be implemented.

## Style Guidelines:

- Primary color: Use a neutral, sophisticated color like charcoal gray (#333333) to provide a professional and elegant backdrop.
- Secondary color: Implement a clean white (#FFFFFF) for backgrounds and text to ensure readability and contrast.
- Accent: Use a vibrant teal (#008080) as an accent color for interactive elements and highlights to draw attention and create a modern feel.
- Ensure a responsive design that adapts to different screen sizes, providing a seamless experience on desktops, tablets, and mobile devices.
- Use a set of minimalist icons for navigation and key features, maintaining a clean and modern aesthetic.
- Incorporate subtle transitions and animations to enhance user experience and provide visual feedback during interactions.

## Original User Request:
TailorAI2.0 is an intelligent web application that helps fashion designers, tailors, and enthusiasts generate professional women's suit designs by analyzing fabric patterns and textures. The application combines computer vision with generative AI to provide material analysis and design suggestions.

Core Features
Fabric Analysis Engine

Automatically identifies fabric material composition (e.g., "Silk Blend")

Provides confidence scores for material detection (e.g., "85.00% confidence")

Uses Google's Gemini Pro Vision model for accurate texture recognition

AI Design Generator

Suggests 3 complete suit designs based on fabric characteristics

Each suggestion includes:

Creative design name (e.g., "Executive Power Suit")

Detailed description of cut, style, and features

Key properties (e.g., ["single-breasted", "wide lapels", "pinstripe"])

Generates high-quality visual renderings of each design

Image Processing Pipeline

Accepts fabric image URLs as input

Two-stage AI processing:

Material analysis with confidence scoring

Design generation with visual outputs

Automatic fallback to placeholder images if generation fails

Technical Architecture
Frontend (React/TypeScript):

Clean, responsive interface with Tailwind CSS

State management for loading/error handling

Image grid display for design suggestions

Backend (Next.js Server Actions):

Secure server-side AI processing

Zod validation for all inputs/outputs

Google Gemini Pro/Gemini Pro Vision integration

Type-safe API responses
  