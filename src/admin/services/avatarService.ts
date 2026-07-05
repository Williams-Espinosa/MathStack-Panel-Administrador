import type { Avatar } from '../models/types';

const DICEBEAR_STYLES = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'avataaars-neutral',
  'bottts',
  'bottts-neutral',
  'croodles',
  'croodles-neutral',
  'fun-emoji',
  'icons',
  'identicon',
  'lorelei',
  'lorelei-neutral',
  'micah',
  'miniavs',
  'notionists',
  'notionists-neutral',
  'open-peeps',
  'personas',
  'pixel-art',
  'pixel-art-neutral',
  'rings',
  'shapes',
  'thumbs',
];

export class AvatarService {
  private static readonly BASE_URL = 'https://api.dicebear.com/9.x';

  static getStyles(): string[] {
    return DICEBEAR_STYLES;
  }

  static generateAvatarUrl(style: string, seed: string): string {
    return `${this.BASE_URL}/${style}/svg?seed=${encodeURIComponent(seed)}`;
  }

  static async generateAvatar(style: string, seed?: string): Promise<Avatar> {
    const actualSeed = seed || Math.random().toString(36).substring(7);
    const imageUrl = this.generateAvatarUrl(style, actualSeed);

    return {
      id: Math.random().toString(36).substr(2, 9),
      style,
      seed: actualSeed,
      imageUrl,
      previewUrl: imageUrl,
      createdAt: new Date().toISOString(),
    };
  }

  static async generateMultipleAvatars(
    style: string,
    count: number
  ): Promise<Avatar[]> {
    const avatars: Avatar[] = [];

    for (let i = 0; i < count; i++) {
      const seed = `${style}-${Date.now()}-${i}`;
      avatars.push(await this.generateAvatar(style, seed));
    }

    return avatars;
  }

  // Get avatar styles with preview
  static getStylePreviews(): { style: string; previewUrl: string }[] {
    return DICEBEAR_STYLES.map((style) => ({
      style,
      previewUrl: this.generateAvatarUrl(style, style),
    }));
  }
}
