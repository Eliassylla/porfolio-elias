import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { businessInfo } from '@/data/business';

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Indiquez votre nom.' })
    .max(100, { message: 'Le nom doit faire moins de 100 caractères.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Indiquez une adresse email valide.' })
    .max(255, { message: 'L’email doit faire moins de 255 caractères.' }),
  company: z
    .string()
    .trim()
    .max(120, { message: 'Le nom de la structure ou activité doit faire moins de 120 caractères.' })
    .optional()
    .or(z.literal('')),
  need: z
    .string()
    .trim()
    .min(20, { message: 'Décrivez votre besoin en quelques phrases.' })
    .max(1200, { message: 'Le message doit faire moins de 1200 caractères.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      need: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const subject = encodeURIComponent(`Demande d'audit - ${data.company || data.name}`);
      const body = encodeURIComponent(
        [
          `Nom : ${data.name}`,
          `Email : ${data.email}`,
          `Structure / activité : ${data.company || 'Non renseignée'}`,
          '',
          'Besoin principal :',
          data.need,
        ].join('\n'),
      );

      window.location.href = `mailto:${businessInfo.email}?subject=${subject}&body=${body}`;

      setIsSuccess(true);
      form.reset();

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      form.setError('root', {
        message: 'Le message n’a pas pu être préparé. Écrivez-moi directement par email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        className="space-y-4 rounded-xl border border-border bg-card p-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle2 className="mx-auto size-14 text-green-600 dark:text-green-400" />
        </motion.div>
        <h3 className="text-2xl font-semibold tracking-tight text-card-foreground">
          Demande envoyée
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Merci. Je vous réponds avec une première lecture de votre besoin.
        </p>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input
                  placeholder="Votre nom"
                  autoComplete="name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="vous@email.fr"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Structure / activité</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nom de votre activité ou structure"
                  autoComplete="organization"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="need"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Besoin principal</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Exemple : nous perdons du temps sur les relances clients, le suivi des devis ou la préparation des dossiers."
                  className="min-h-36 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {form.formState.errors.root.message}
          </div>
        )}

        <Button
          type="submit"
          className="h-12 w-full rounded-lg font-semibold dark:bg-[#5e6ad2] dark:text-white dark:hover:bg-[#828fff]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-5 animate-spin" />
              Envoi en cours
            </>
          ) : (
            'Envoyer ma demande'
          )}
        </Button>
      </form>
    </Form>
  );
}
