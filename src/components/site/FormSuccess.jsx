import { Check } from "lucide-react";

export default function FormSuccess({ title = "Thank you for reaching out.", message = "I'll be in touch with you shortly." }) {
  return (
    <div className="border border-primary/30 px-8 py-14 text-center">
      <div className="mx-auto w-14 h-14 border border-primary rounded-full flex items-center justify-center text-primary mb-6">
        <Check size={24} />
      </div>
      <h3 className="font-heading text-2xl md:text-3xl">{title}</h3>
      <p className="text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">{message}</p>
    </div>
  );
}