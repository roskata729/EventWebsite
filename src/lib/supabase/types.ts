export type Database = {
  public: {
    Tables: {
      contact_requests: {
        Row: {
          company: string | null;
          created_at: string;
          email: string;
          event_date: string | null;
          id: string;
          message: string;
          name: string;
          phone: string | null;
          status: string;
          subject: string | null;
        };
        Insert: {
          company?: string | null;
          created_at?: string;
          email: string;
          event_date?: string | null;
          id?: string;
          message: string;
          name: string;
          phone?: string | null;
          status?: string;
          subject?: string | null;
        };
        Update: {
          company?: string | null;
          created_at?: string;
          email?: string;
          event_date?: string | null;
          id?: string;
          message?: string;
          name?: string;
          phone?: string | null;
          status?: string;
          subject?: string | null;
        };
        Relationships: [];
      };
      quote_requests: {
        Row: {
          budget: number | null;
          created_at: string;
          email: string;
          event_date: string | null;
          event_location: string | null;
          event_type: string;
          guest_count: number | null;
          id: string;
          message: string | null;
          name: string;
          phone: string | null;
          service_id: string | null;
          status: string;
        };
        Insert: {
          budget?: number | null;
          created_at?: string;
          email: string;
          event_date?: string | null;
          event_location?: string | null;
          event_type: string;
          guest_count?: number | null;
          id?: string;
          message?: string | null;
          name: string;
          phone?: string | null;
          service_id?: string | null;
          status?: string;
        };
        Update: {
          budget?: number | null;
          created_at?: string;
          email?: string;
          event_date?: string | null;
          event_location?: string | null;
          event_type?: string;
          guest_count?: number | null;
          id?: string;
          message?: string | null;
          name?: string;
          phone?: string | null;
          service_id?: string | null;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quote_requests_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
      services: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          is_active: boolean;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          category: string | null;
          cover_image_url: string;
          created_at: string;
          description: string | null;
          event_date: string | null;
          id: string;
          is_published: boolean;
          location: string | null;
          slug: string;
          title: string;
        };
        Insert: {
          category?: string | null;
          cover_image_url: string;
          created_at?: string;
          description?: string | null;
          event_date?: string | null;
          id?: string;
          is_published?: boolean;
          location?: string | null;
          slug: string;
          title: string;
        };
        Update: {
          category?: string | null;
          cover_image_url?: string;
          created_at?: string;
          description?: string | null;
          event_date?: string | null;
          id?: string;
          is_published?: boolean;
          location?: string | null;
          slug?: string;
          title?: string;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          client_name: string;
          company: string | null;
          created_at: string;
          event_type: string | null;
          id: string;
          is_featured: boolean;
          quote: string;
          rating: number | null;
        };
        Insert: {
          client_name: string;
          company?: string | null;
          created_at?: string;
          event_type?: string | null;
          id?: string;
          is_featured?: boolean;
          quote: string;
          rating?: number | null;
        };
        Update: {
          client_name?: string;
          company?: string | null;
          created_at?: string;
          event_type?: string | null;
          id?: string;
          is_featured?: boolean;
          quote?: string;
          rating?: number | null;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          content: string;
          created_at: string;
          excerpt: string | null;
          id: string;
          is_published: boolean;
          published_at: string | null;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          is_published?: boolean;
          published_at?: string | null;
          slug: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          is_published?: boolean;
          published_at?: string | null;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
