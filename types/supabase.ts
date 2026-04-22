export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          surname: string
          email: string | null
          phone: string | null
          address: string | null
          enrollment_date: string
          enrollment_program: string
          group_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          surname: string
          email?: string | null
          phone?: string | null
          address?: string | null
          enrollment_date: string
          enrollment_program: string
          group_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          surname?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          enrollment_date?: string
          enrollment_program?: string
          group_id?: string
        }
      }
      groups: {
        Row: {
          id: string
          created_at: string
          name: string
          level: string
          total_students: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          level: string
          total_students?: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          level?: string
          total_students?: number
        }
      }
      attendance_records: {
        Row: {
          id: string
          created_at: string
          student_id: string
          date: string
          status: "present" | "absent" | "excused"
          subject: string
          learning_outcome: string | null
          hours: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          student_id: string
          date: string
          status: "present" | "absent" | "excused"
          subject: string
          learning_outcome?: string | null
          hours?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          student_id?: string
          date?: string
          status?: "present" | "absent" | "excused"
          subject?: string
          learning_outcome?: string | null
          hours?: number | null
        }
      }
      incidents: {
        Row: {
          id: string
          created_at: string
          student_id: string
          title: string
          description: string
          severity: "low" | "medium" | "high"
          date: string
          notified_parents: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          student_id: string
          title: string
          description: string
          severity: "low" | "medium" | "high"
          date: string
          notified_parents?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          student_id?: string
          title?: string
          description?: string
          severity?: "low" | "medium" | "high"
          date?: string
          notified_parents?: boolean
        }
      }
      comments: {
        Row: {
          id: string
          created_at: string
          student_id: string
          author: string
          role: "tutor" | "counselor" | "teacher"
          content: string
        }
        Insert: {
          id?: string
          created_at?: string
          student_id: string
          author: string
          role: "tutor" | "counselor" | "teacher"
          content: string
        }
        Update: {
          id?: string
          created_at?: string
          student_id?: string
          author?: string
          role?: "tutor" | "counselor" | "teacher"
          content?: string
        }
      }
      grades: {
        Row: {
          id: string
          created_at: string
          student_id: string
          subject: string
          grade: number
          status: "approved" | "failed"
        }
        Insert: {
          id?: string
          created_at?: string
          student_id: string
          subject: string
          grade: number
          status: "approved" | "failed"
        }
        Update: {
          id?: string
          created_at?: string
          student_id?: string
          subject?: string
          grade?: number
          status?: "approved" | "failed"
        }
      }
      communications: {
        Row: {
          id: string
          created_at: string
          student_id: string
          type: "individual" | "group"
          subject: string
          message: string
          status: "sent" | "draft"
          recipients: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          student_id: string
          type: "individual" | "group"
          subject: string
          message: string
          status: "sent" | "draft"
          recipients: string[]
        }
        Update: {
          id?: string
          created_at?: string
          student_id?: string
          type?: "individual" | "group"
          subject?: string
          message?: string
          status?: "sent" | "draft"
          recipients?: string[]
        }
      }
      payment_plans: {
        Row: {
          id: string
          created_at: string
          student_id: string
          plan_type: "single" | "3installments" | "5installments"
          amount: number
          due_date: string
          paid: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          student_id: string
          plan_type: "single" | "3installments" | "5installments"
          amount: number
          due_date: string
          paid?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          student_id?: string
          plan_type?: "single" | "3installments" | "5installments"
          amount?: number
          due_date?: string
          paid?: boolean
        }
      }
      notification_settings: {
        Row: {
          id: string
          created_at: string
          student_id: string
          notify_below_90: boolean
          notify_below_80: boolean
          notify_below_70: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          student_id: string
          notify_below_90?: boolean
          notify_below_80?: boolean
          notify_below_70?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          student_id?: string
          notify_below_90?: boolean
          notify_below_80?: boolean
          notify_below_70?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
