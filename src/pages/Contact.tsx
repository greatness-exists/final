import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { useSafeAsync } from "@/hooks/useSafeAsync";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

const heroImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/ILoveKOSA-1760668254089.JPG";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const { loading, execute } = useSafeAsync();

  const onSubmit = async (data: ContactFormData) => {
    await execute(
      async () => {
        // EmailJS integration
        const templateParams = {
          user_name: data.name,
          user_email: data.email,
          user_phone: data.phone,
          message: data.message,
        };

        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

        if (!publicKey || !serviceId || !templateId) {
          throw new Error('EmailJS configuration is missing. Please set up your environment variables.');
        }

        await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          publicKey
        );
        
        return data;
      },
      {
        errorMessage: 'Failed to send message. Please try again.',
        onSuccess: () => {
          toast.success('Message sent successfully! We\'ll get back to you soon.');
          reset();
        },
      }
    );
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 
            className="text-5xl font-bold mb-4 animate-fade-in text-transparent-bg"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            Get In Touch
          </h1>
          <p className="text-xl animate-fade-in">We're here to help plan your perfect getaway</p>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        className="py-20 px-4 bg-gradient-to-b from-background to-muted"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Send Us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    {...register("name")}
                    aria-invalid={errors.name ? "true" : "false"}
                    disabled={loading}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Phone Number (e.g., +233*********)"
                    {...register("phone")}
                    aria-invalid={errors.phone ? "true" : "false"}
                    disabled={loading}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    rows={6}
                    {...register("message")}
                    aria-invalid={errors.message ? "true" : "false"}
                    disabled={loading}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Contact Information</h2>
              
              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <MapPin className="text-primary mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">Address</h3>
                    <p className="text-muted-foreground">
                                      Beach Road No.1<br />
                                      Ampenyi<br />
                                      Elmina, Central Region<br />
                                      Ghana                   
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Phone className="text-primary mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">Phone</h3>
                    <p className="text-muted-foreground">+233 24 437 5432</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Mail className="text-primary mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">Email</h3>
                    <p className="text-muted-foreground">info@ko-sa.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Clock className="text-primary mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">Reception Hours</h3>
                    <p className="text-muted-foreground">Monday - Sunday</p>
                    <p className="text-muted-foreground">24/7 Service</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;