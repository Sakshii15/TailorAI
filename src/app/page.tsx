'use client';

import {useState} from 'react';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Grid} from '@/components/ui/grid';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {analyzeFabric} from '@/ai/flows/analyze-fabric';
import {generateSuitDesigns} from '@/ai/flows/generate-suit-designs';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Info} from 'lucide-react';

const formSchema = z.object({
  fabricImageUrl: z.string().url({message: 'Please enter a valid URL'}),
});

type SuitDesign = {
  designName: string;
  description: string;
  keyProperties: string[];
};

export default function Home() {
  const [designs, setDesigns] = useState<SuitDesign[] | null>(null);
  const [materialComposition, setMaterialComposition] = useState<string | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fabricImageUrl: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setDesigns(null);
    setMaterialComposition(null);
    setConfidenceScore(null);

    try {
      const fabricAnalysis = await analyzeFabric({fabricImageUrl: values.fabricImageUrl});
      setMaterialComposition(fabricAnalysis.materialComposition);
      setConfidenceScore(fabricAnalysis.confidenceScore);

      const suitDesigns = await generateSuitDesigns({
        fabricDescription: `Fabric is ${fabricAnalysis.materialComposition} with ${fabricAnalysis.confidenceScore * 100}% confidence`,
        fabricImageURL: values.fabricImageUrl,
      });

      setDesigns(suitDesigns.designs);
    } catch (e: any) {
      setError(e.message || 'An error occurred while generating designs.');
    } finally {
      setIsLoading(false);
    }
  }

  const placeholderImage = 'https://picsum.photos/400/600';

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Tailored AI Designs</CardTitle>
          <CardDescription>
            Enter a fabric image URL to generate unique women's suit designs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fabricImageUrl"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Fabric Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter URL" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please enter a valid URL of the fabric image.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Designs'}
              </Button>
            </form>
          </Form>

          {error && (
            <Alert variant="destructive">
              <Info className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {materialComposition && confidenceScore !== null && (
            <div className="mt-6">
              <p>
                Material Composition: {materialComposition} (Confidence:{' '}
                {(confidenceScore * 100).toFixed(2)}%)
              </p>
            </div>
          )}

          {designs && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">AI-Generated Suit Design Concepts</h2>
              <Grid numColumns={3}>
                {designs.map((design, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{design.designName}</CardTitle>
                      <CardDescription>{design.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                      <div>
                        <p className="font-semibold">Key Properties:</p>
                        <ul>
                          {design.keyProperties.map((property, i) => (
                            <li key={i}>{property}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
