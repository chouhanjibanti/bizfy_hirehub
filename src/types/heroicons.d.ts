declare module '@heroicons/react/outline' {
  import { ComponentType, SVGProps } from 'react';
  
  type Icon = ComponentType<SVGProps<SVGSVGElement>>;
  
  export const MenuIcon: Icon;
  export const XIcon: Icon;
  // Add other icons you're using from @heroicons/react/outline
}
