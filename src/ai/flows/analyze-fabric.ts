'use server';

/**
 * @fileOverview Analyzes a fabric image to determine its material composition and provides a confidence score.
 *
 * - analyzeFabric - A function that handles the fabric analysis process.
 * - AnalyzeFabricInput - The input type for the analyzeFabric function.
 * - AnalyzeFabricOutput - The return type for the analyzeFabric function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeFabricInputSchema = z.object({
  fabricImageUrl: z.string().describe('The URL of the fabric image to analyze.'),
});
export type AnalyzeFabricInput = z.infer<typeof AnalyzeFabricInputSchema>;

const AnalyzeFabricOutputSchema = z.object({
  materialComposition: z.string().describe('The identified material composition of the fabric (e.g., Silk Blend).'),
  confidenceScore: z.number().describe('The confidence score (0-1) for the material detection (e.g., 0.85).'),
});
export type AnalyzeFabricOutput = z.infer<typeof AnalyzeFabricOutputSchema>;

export async function analyzeFabric(input: AnalyzeFabricInput): Promise<AnalyzeFabricOutput> {
  return analyzeFabricFlow(input);
}

const analyzeFabricPrompt = ai.definePrompt({
  name: 'analyzeFabricPrompt',
  input: {
    schema: z.object({
      fabricImageUrl: z.string().describe('The URL of the fabric image to analyze.'),
    }),
  },
  output: {
    schema: z.object({
      materialComposition: z.string().describe('The identified material composition of the fabric (e.g., Silk Blend).'),
      confidenceScore: z.number().describe('The confidence score (0-1) for the material detection (e.g., 0.85).'),
    }),
  },
  prompt: `You are an expert in fabric analysis. Analyze the provided fabric image and determine its material composition and provide a confidence score for your analysis.\n\nFabric Image: {{media url=fabricImageUrl}}\n\nMaterial Composition: {{output.schema.shape.materialComposition.description}}\nConfidence Score: {{output.schema.shape.confidenceScore.description}}`,
});

const analyzeFabricFlow = ai.defineFlow<
  typeof AnalyzeFabricInputSchema,
  typeof AnalyzeFabricOutputSchema
>({
  name: 'analyzeFabricFlow',
  inputSchema: AnalyzeFabricInputSchema,
  outputSchema: AnalyzeFabricOutputSchema,
},
async input => {
  const {output} = await analyzeFabricPrompt(input);
  return output!;
});



    