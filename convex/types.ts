export interface Message {
  text: string;
  role: 'system' | 'user' | 'assistant';
}
