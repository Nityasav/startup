export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string;
          project_type: 'new' | 'existing';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
      };
      conversations: {
        Row: {
          id: string;
          project_id: string;
          messages: {
            role: 'user' | 'assistant';
            content: string;
            timestamp: string;
          }[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['conversations']['Row'], 'id' | 'created_at' | 'updated_at'>;
      };
    };
  };
} 