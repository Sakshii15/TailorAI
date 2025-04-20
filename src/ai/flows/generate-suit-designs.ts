'use server';

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateSuitDesignsInputSchema = z.object({
  fabricDescription: z.string().describe('Description of the fabric characteristics.'),
  fabricImageURL: z.string().url().describe('URL of the fabric image.'),
});

export type GenerateSuitDesignsInput = z.infer<typeof GenerateSuitDesignsInputSchema>;

const SuitDesignSchema = z.object({
  designName: z.string().describe('Creative name for the suit design.'),
  description: z.string().describe('Detailed description of the suit design.'),
  keyProperties: z.array(z.string()).describe('Key properties of the suit design.'),
});

const GenerateSuitDesignsOutputSchema = z.object({
  designs: z.array(SuitDesignSchema).describe('Unique women\'s suit designs.'),
  errors: z.array(z.string()).optional().describe('Any errors that occurred during generation.'),
});

export type GenerateSuitDesignsOutput = z.infer<typeof GenerateSuitDesignsOutputSchema>;

export async function generateSuitDesigns(input: GenerateSuitDesignsInput): Promise<GenerateSuitDesignsOutput> {
  try {
    // Validate input
    const validatedInput = GenerateSuitDesignsInputSchema.parse(input);
    return await generateSuitDesignsFlow(validatedInput);
  } catch (error) {
    console.error('Input validation failed:', error);
    return {
      designs: [],
      errors: ['Invalid input provided']
    };
  }
}

const generateSuitDesignPrompt = ai.definePrompt({
  name: 'generateSuitDesignPrompt',
  input: {
    schema: GenerateSuitDesignsInputSchema,
  },
  output: {
    schema: z.object({
      designs: z.array(SuitDesignSchema),
    }),
  },
  prompt: `You are a professional fashion designer. Generate women's suit designs based on:
  
  Fabric Description: {{fabricDescription}}
  Fabric Image: {{fabricImageURL}}
  
  For each design provide:
  1. Creative name
  2. Detailed description (cut, style, features) - make sure it's easy to understand for an average user
  3. 3-5 key properties
  
  Output must be valid JSON matching the schema.`,
});

const generateSuitDesignsFlow = ai.defineFlow({
  name: 'generateSuitDesignsFlow',
  inputSchema: GenerateSuitDesignsInputSchema,
  outputSchema: GenerateSuitDesignsOutputSchema,
}, async (input) => {
  const errors: string[] = [];
  
  // Step 1: Generate design concepts
  const { output } = await generateSuitDesignPrompt(input);
  if (!output?.designs?.length) {
    throw new Error('No designs were generated');
  }

  return {
    designs: output.designs,
    ...(errors.length ? { errors } : {}),
  };
});
