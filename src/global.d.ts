// Extend the Window interface for FB Pixel
interface Window {
  fbq: (type: string, name: string, parameters?: Record<string, any>) => void;
  _fbq: any;
}
