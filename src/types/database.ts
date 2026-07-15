export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          phone: string | null;
          display_name: string | null;
          avatar_url: string | null;
          onboarding_status: "not_started" | "in_progress" | "completed";
          last_login_at: string | null;
          role: "parent" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          phone?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          onboarding_status?: "not_started" | "in_progress" | "completed";
          last_login_at?: string | null;
          role?: "parent" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string | null;
          phone?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          onboarding_status?: "not_started" | "in_progress" | "completed";
          last_login_at?: string | null;
          role?: "parent" | "admin";
          updated_at?: string;
        };
        Relationships: [];
      };
      student_profiles: {
        Row: {
          id: string;
          parent_id: string;
          student_name: string;
          grade: string;
          board: string | null;
          city: string;
          service_area: string;
          allowed_subjects: string[];
          onboarding_status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          parent_id: string;
          student_name: string;
          grade: string;
          board?: string | null;
          city?: string;
          service_area?: string;
          allowed_subjects?: string[];
          onboarding_status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          parent_id?: string;
          student_name?: string;
          grade?: string;
          board?: string | null;
          city?: string;
          service_area?: string;
          allowed_subjects?: string[];
          onboarding_status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      tutors: {
        Row: {
          id: string;
          full_name: string;
          phone: string | null;
          email: string | null;
          subjects: string[] | null;
          grades: string[] | null;
          service_area: string | null;
          status: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          phone?: string | null;
          email?: string | null;
          subjects?: string[] | null;
          grades?: string[] | null;
          service_area?: string | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string;
          phone?: string | null;
          email?: string | null;
          subjects?: string[] | null;
          grades?: string[] | null;
          service_area?: string | null;
          status?: string;
          notes?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      tuitions: {
        Row: {
          id: string;
          student_id: string;
          parent_id: string;
          subject: string;
          grade_snapshot: string;
          service_area: string;
          tutor_id: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          parent_id: string;
          subject: string;
          grade_snapshot: string;
          service_area?: string;
          tutor_id?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          student_id?: string;
          parent_id?: string;
          subject?: string;
          grade_snapshot?: string;
          service_area?: string;
          tutor_id?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      topics: {
        Row: {
          id: string;
          grade: string;
          subject: string;
          topic_name: string;
          description: string | null;
          sequence_order: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          grade: string;
          subject: string;
          topic_name: string;
          description?: string | null;
          sequence_order?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          grade?: string;
          subject?: string;
          topic_name?: string;
          description?: string | null;
          sequence_order?: number | null;
          is_active?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      classes: {
        Row: {
          id: string;
          tuition_id: string;
          student_id: string;
          parent_id: string;
          tutor_id: string | null;
          subject_snapshot: string;
          grade_snapshot: string;
          topic_id: string | null;
          topic_text: string | null;
          scheduled_start_at: string | null;
          scheduled_end_at: string | null;
          status: string;
          payment_status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tuition_id: string;
          student_id: string;
          parent_id: string;
          tutor_id?: string | null;
          subject_snapshot: string;
          grade_snapshot: string;
          topic_id?: string | null;
          topic_text?: string | null;
          scheduled_start_at?: string | null;
          scheduled_end_at?: string | null;
          status?: string;
          payment_status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          tuition_id?: string;
          student_id?: string;
          parent_id?: string;
          tutor_id?: string | null;
          subject_snapshot?: string;
          grade_snapshot?: string;
          topic_id?: string | null;
          topic_text?: string | null;
          scheduled_start_at?: string | null;
          scheduled_end_at?: string | null;
          status?: string;
          payment_status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      class_content: {
        Row: {
          id: string;
          class_id: string;
          pre_class_notes: string | null;
          in_class_activities: string | null;
          homework: string | null;
          post_class_summary: string | null;
          parent_visible: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          class_id: string;
          pre_class_notes?: string | null;
          in_class_activities?: string | null;
          homework?: string | null;
          post_class_summary?: string | null;
          parent_visible?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          class_id?: string;
          pre_class_notes?: string | null;
          in_class_activities?: string | null;
          homework?: string | null;
          post_class_summary?: string | null;
          parent_visible?: boolean;
          created_by?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          id: string;
          parent_id: string;
          student_id: string | null;
          tuition_id: string | null;
          class_id: string | null;
          amount_in_paise: number;
          currency: string;
          status: string;
          provider: string | null;
          provider_order_id: string | null;
          provider_payment_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          parent_id: string;
          student_id?: string | null;
          tuition_id?: string | null;
          class_id?: string | null;
          amount_in_paise: number;
          currency?: string;
          status?: string;
          provider?: string | null;
          provider_order_id?: string | null;
          provider_payment_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          parent_id?: string;
          student_id?: string | null;
          tuition_id?: string | null;
          class_id?: string | null;
          amount_in_paise?: number;
          currency?: string;
          status?: string;
          provider?: string | null;
          provider_order_id?: string | null;
          provider_payment_id?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          user_id: string | null;
          anonymous_id: string | null;
          event_name: string;
          properties: Json;
          page_path: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          anonymous_id?: string | null;
          event_name: string;
          properties?: Json;
          page_path?: string | null;
          created_at?: string;
        };
        Update: {
          user_id?: string | null;
          anonymous_id?: string | null;
          event_name?: string;
          properties?: Json;
          page_path?: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      is_admin: {
        Args: { user_id: string };
        Returns: boolean;
      };
    };
  };
};
