export interface Upgrade {
    id: number;
    name: string;
    description: string;
    cost: number;
    effect: string;
    action: () => void;  // Función que aplica el efecto de la mejora
  }