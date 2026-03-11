/**
 * Image URLs for cities (Unsplash). Fallback used in UI if city not in map.
 */
export const CITY_IMAGES: Record<string, string> = {
  Київ:
    'https://images.unsplash.com/photo-1596574202463-44e7f5cceb31?w=600',
  Львів:
    'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600',
  Одеса:
    'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600',
  Харків:
    'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=600',
  Дніпро:
    'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=600',
};

export function getCityImage(city: string): string {
  return CITY_IMAGES[city] ?? 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600';
}
