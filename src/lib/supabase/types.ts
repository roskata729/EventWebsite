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
          user_id: string | null;
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
          user_id?: string | null;
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
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "contact_requests_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      app_settings: {
        Row: {
          created_at: string;
          key: string;
          updated_at: string;
          value: string;
        };
        Insert: {
          created_at?: string;
          key: string;
          updated_at?: string;
          value: string;
        };
        Update: {
          created_at?: string;
          key?: string;
          updated_at?: string;
          value?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          created_at: string;
          id: string;
          is_read: boolean;
          message: string;
          metadata: Record<string, unknown>;
          target_url: string | null;
          title: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_read?: boolean;
          message: string;
          metadata?: Record<string, unknown>;
          target_url?: string | null;
          title: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_read?: boolean;
          message?: string;
          metadata?: Record<string, unknown>;
          target_url?: string | null;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          full_name: string | null;
          id: string;
          role: "admin" | "user";
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          full_name?: string | null;
          id: string;
          role?: "admin" | "user";
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          full_name?: string | null;
          id?: string;
          role?: "admin" | "user";
          updated_at?: string;
        };
        Relationships: [];
      };
      password_reset_requests: {
        Row: {
          email: string;
          id: string;
          requested_at: string;
        };
        Insert: {
          email: string;
          id?: string;
          requested_at?: string;
        };
        Update: {
          email?: string;
          id?: string;
          requested_at?: string;
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
          user_id: string | null;
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
          user_id?: string | null;
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
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "quote_requests_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quote_requests_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
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
    Enums: {
      app_role: "admin" | "user";
    };
    CompositeTypes: Record<string, never>;
  };
};
