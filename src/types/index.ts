export type DiscordProfile = {
  username: string;
  email: string;
  id: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string | null;
  accent_color: number | null;
  banner_color: string | null;
  mfa_enabled: boolean;
  locale: string;
  premium_type: number;
  verified: boolean;
}